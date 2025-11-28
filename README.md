# Reed's Website

## Status: Porting from my current website code

My new website written in my new site building tool.

## Tasks

[![xc compatible](https://xcfile.dev/badge.svg)](https://xcfile.dev)

### build

```sh
rm -rf build
mkdir -p build
DEBUG=* node ~/projects/html-wiki/server/cli.mts generate -u ~/projects/reeds-website-html-wiki/entries -o build
```
