# Reed's Website

## Status: Porting from my current website code

My new website written in my new site building tool.

## Tasks

[![xc compatible](https://xcfile.dev/badge.svg)](https://xcfile.dev)

### build

interactive: true

```sh
rm -rf build
mkdir -p build
DEBUG=* node ~/projects/html-wiki/server/cli.mts generate -u ~/projects/reeds-website-html-wiki/entries -o build
```

### build-watch

Ideally I'd be confident that `server` similar enough to `build` to use that for file-watching behavior. I'm not confident of that right now, and I really want to be sure about the exact build behavior.

interactive: true

```sh
rm -rf build
mkdir -p build
DEBUG=* node ~/projects/html-wiki/server/cli.mts generate -u ~/projects/reeds-website-html-wiki/entries -o build --watch
```

### serve-build

interactive: true

Ya, confusing name given the above. Run this separate to the above for a simple HTTP server in the build directory

```sh
cd build
python -m http.server
```

### server

interactive: true

```sh
DEBUG=* node ~/projects/html-wiki/server/cli.mts server -u ~/projects/reeds-website-html-wiki/entries --port 55431
```
