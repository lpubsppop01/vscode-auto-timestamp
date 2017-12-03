# vscode-auto-timestamp

A Visual Studio Code extension that update timestamp field when saving document.

## Features

- Update last modified time field when saving document
- Fill birth time field if it is empty
- Each of the fields are detected by condition of settings

## Extension Settings

This extension contributes the following settings:

- `lpubsppop01.autoTimestamp.lineLimit`
- `lpubsppop01.autoTimestamp.birthTimeStart`
- `lpubsppop01.autoTimestamp.birthTimeEnd`
- `lpubsppop01.autoTimestamp.modifiedTimeStart`
- `lpubsppop01.autoTimestamp.modifiedTimeEnd`
- `lpubsppop01.autoTimestamp.momentFormat`

## Installation

Clone this repo to local extensions folder, and build it.

Example on Windows:
```
PS> cd $env:USERPROFILE\.vscode\extensions
PS> git clone https://github.com/lpubsppop01/vscode-auto-timestamp.git
PS> cd vscode-auto-timestamp
PS> npm install
PS> npm run compile
```

## Author
[lpubsppop01](https://github.com/lpubsppop01)

## License
[zlib License](https://github.com/lpubsppop01/vscode-auto-timestamp/raw/master/LICENSE.txt)
