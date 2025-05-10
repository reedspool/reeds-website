# Grayscale

Animation experiments in grayscale. Main focus is to have something fun to play with and develop on my e-ink device.

## Structure

This is a Vite application. In order to make it work in my static (Netlify) deployment, I've inverted the directory structure. Usually the main directory of a Vite project is the development environment, and you make a "build" in a `build` directory within the development directory. Instead, this root directory of the project has a `development` directory within it which contains all the development code. That directory contains the `package.json` file, so `npm run dev` and `npm run build` must be run from the `development`. `npm run build` will change the files in this root directory.

Vite produces these warnings upon `npm run build`, which make sense, but nevertheless works correctly:

> `(!) build.outDir must not be the same directory of root or a parent directory of root as this could cause Vite to overwriting source files with build outputs.`
>
> `(!) outDir is not inside project root and will not be emptied.
Use --emptyOutDir to override.`
>
> `(!) The public directory feature may not work correctly. outDir and publicDir are not separate folders.`

Yup, thank you Vite, please do not empty out that directory with all my code!
