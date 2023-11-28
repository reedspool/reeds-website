import * as posts from "./generated-post-imports.mjs";
import { Link, HashTarget, GitHubLink } from "../components/Link.jsx";
import { Future } from "../components/Future.jsx";
import { CommonNakedJSXPage } from "./CommonNakedJSXPage.jsx";
import { GenericPageBody } from "../components/GenericPageBody.jsx";

for (const [{ inputFileName, outputFileName }, Post] of Object.values(posts)) {
  await CommonNakedJSXPage({
    outputFileName,
    Body: () => (
      <GenericPageBody>
        <Post
          originFilename={inputFileName}
          components={{ Link, HashTarget, GitHubLink, Future }}
        />
        <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
      </GenericPageBody>
    ),
  });
}
