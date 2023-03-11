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

If this extension does not work, please check the followings:
- The Line Limit setting is `5` lines from the beginning of the file by default, so it may be too small for your file.
- There is also the setting of the target file name (Filename Pattern), and `.vscode/settings.json` is ignored by default.
  - The default value changed in version 0.0.5. If you have been using 0.0.4 or earlier and have changed this setting, please check it.
- This extension does not work if your VS Code Auto Save setting is `afterDelay`.

## Download
[vscode-auto-timestamp-0.0.5.vsix - GitHub Releases](https://github.com/lpubsppop01/vscode-auto-timestamp/releases/download/0.0.5/vscode-auto-timestamp-0.0.5.vsix)

Depending on the situation, this extension seems not to be found in the VS Marketplace search.
In that case, please install from the above.

## Author
[lpubsppop01](https://github.com/lpubsppop01)

## License
[zlib License](https://github.com/lpubsppop01/vscode-auto-timestamp/raw/master/LICENSE.txt)
