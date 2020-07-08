# rename

## Description

This script is born out of frustration not to find a good tool for batch file renaming.
It allows you to rename any file/folder on a folder base on regex.
I have added all the useful options I could think of.
If your missing one don't hesitate to open an issue.

## Requirements

This script is written in NodeJS, so you'll need to have it installed on your machine.


## Installation

1. download or clone the repository on your machine.
2. Open a terminal, go to the project folder
3. run `npm install` to install dependencies

## Usage

On your terminal in the project folder run:

```shell
./rename.js \
  --dirname='/full/path/to/the/folder' \
  --pattern='([^.])+\.txt' \
  --replacment='prefix-$1.txt'
```

***Note:** if it doesn't work with `./rename.js` try `node ./rename.js`*

### Optional arguments

- --debug will log error with the stacktrace
- --counter will manage `${counter}` in the replacement starting at 1
- --reverse will sort files descendingly (used with counter)
- --counter-base will change the counter start (default: 1, used with counter)
- --counter-step will change the counter steps (default: 1, used with counter)

### Examples

Considering you have these files:

- some/path/image.jpg
- some/path/test1.txt
- some/path/test2.txt
- some/path/test3.txt

**This command:**

```shell
./rename.js \
  --dirname='/full/path/to/the/folder' \
  --pattern='([^.])+\.txt' \
  --replacment='$1.md'
```

will result in:

- some/path/image.jpg
- some/path/test1.md
- some/path/test2.md
- some/path/test3.md


**This command:**

```shell
./rename.js \
  --dirname='/full/path/to/the/folder' \
  --pattern='([^.])+\.(.+)' \
  --counter \
  --counter-base=100 \
  --counter-step=10 \
  --reverse \
  --replacment='${counter}-$1.$2'
```

will result in:

- some/path/100-test3.md
- some/path/110-test2.md
- some/path/120-test1.md
- some/path/130-image.jpg



