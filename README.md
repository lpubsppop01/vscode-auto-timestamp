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

You can change the time stamp format and timezone with the following settings:
- The time stamp format can be changed with `luxonFormat`.
  - See: [Formatting (Luxon)](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)
  - Migrated from Moment to Luxon in version 0.0.8. `momentFormat` can also be used, but `luxonFormat` is recommended for newly setup environments and projects.
- The timezone can be set with `luxonTimezone`.
  - See: [Time zones and offsets (Luxon)](https://moment.github.io/luxon/#/zones?id=specifying-a-zone)
  - The default value is `system` which means the system's local timezone.

If you try to handle many situations with only setting values, the patterns may become complicated.
VS Code's standard features allow you to change the settings per project and per language.
Please use them together.

## Download
[vscode-auto-timestamp Latest build - GitHub Releases](https://github.com/lpubsppop01/vscode-auto-timestamp/releases/latest/download/vscode-auto-timestamp.vsix)

Depending on the situation, this extension seems not to be found in the VS Marketplace search.
In that case, please install from the above.

If you need a version specified URL, please check in [the releases page](https://github.com/lpubsppop01/vscode-auto-timestamp/releases).

## Author
[lpubsppop01](https://github.com/lpubsppop01)

## License
[zlib License](https://github.com/lpubsppop01/vscode-auto-timestamp/raw/master/LICENSE.txt)
