import { readdir, writeFile } from 'node:fs/promises';

console.log(`Running this script from CWD "${process.cwd()}"`)

const POST_DIR_REL_PATH = './posts'
const OUTPUT_FILE_REL_PATH = "./src/generated-post-imports.mjs"

let js = '';
let usedIdentifiers = new Set();

for (const inputFileName of await readdir(POST_DIR_REL_PATH)) {
  if (!inputFileName.endsWith('.mdx'))
    continue;

  const fileNameWithoutExtension = inputFileName.replace(/\.mdx$/, '');
  // TODO: The POST_DIR_REL_PATH should really be `..` but for some reason it's
  // the project root instead. So we add this extra `.` here because the generated
  // file goes in `src`, which makes the `posts` directory one level above.
  const postPath = `.${POST_DIR_REL_PATH}/${inputFileName}`;
  const outputFileName = `${fileNameWithoutExtension}.html`

  // Import the MDX file via the :mdx: plugin
  const safeIdentifier = fileNameWithoutExtension.replaceAll(/[^A-Za-z_]/g, "_")

  if (usedIdentifiers.has(safeIdentifier)) throw new Error(`Duplicate identifier '${safeIdentifier}'`)
  usedIdentifiers.add(safeIdentifier)

  const mdxIdentifier = `mdx_${safeIdentifier}`

  js += `import ${mdxIdentifier} from ':mdx:${postPath}';\n`;
  js += `export const exported_${safeIdentifier} = [
${JSON.stringify({ inputFileName, outputFileName }, null, 2)},
${mdxIdentifier}
]
`
}


const result = `/*******************************************************************************
 * Warning! This file was automatically generated by running
 *
 *   \`npm run build:generate-post-imports\`
 *
 * Run that again to regenerate this file.
 ******************************************************************************/
${js};`
console.log(`Writing to "${OUTPUT_FILE_REL_PATH}":\n\n`, result)

await writeFile(OUTPUT_FILE_REL_PATH, result)

console.log("\n\nDone")
