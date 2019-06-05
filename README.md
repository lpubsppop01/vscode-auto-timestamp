# Auto Time Stamp
[![Build status](https://ci.appveyor.com/api/projects/status/8jhbugo5d2ejuylh?svg=true)](https://ci.appveyor.com/project/lpubsppop01/vscode-auto-timestamp)

A Visual Studio Code extension that update time stamp in file content when saving document.

## Features
When saving document:
  - Update last modified time field
  - Fill birth time field by file time stamp if it is empty

Each of the fields will be detected with condition of settings.
By default settings, lines like the following will be detected:
```
// Created: 2018/02/04 12:24:41
// Last modified: 2018/02/09 11:41:41
```

If it does not work, please check the Line Limit setting. This setting is 5 lines from the beginning of the file by default, so it may be too small for your file.

In addition to the above, there is also the setting of the target file name (Filename Pattern), but by default all files are matched.

## Download
[vscode-auto-timestamp Latest Build - AppVeyor](https://ci.appveyor.com/api/projects/lpubsppop01/vscode-auto-timestamp/artifacts/vscode-auto-timestamp-0.0.1.vsix)

## Author
[lpubsppop01](https://github.com/lpubsppop01)

## License
[zlib License](https://github.com/lpubsppop01/vscode-auto-timestamp/raw/master/LICENSE.txt)
