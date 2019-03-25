# VSCode推荐配置

> 作者：Mr.Hope 最后编辑于：2019/3/23

这是Mr.Hope个人使用的VsCode设置，部分设置是[这里](vscodeExtension)的插件配置

将下面内容拷贝至setting.json以更改VS Code设置

```json
/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: VSCode配置文件
 * @Date: 2018-11-25 21:20:07
 * @LastEditTime: 2019-03-23 13:12:35
 */
{
  // 编辑器配置
  "editor.cursorSmoothCaretAnimation": true,
  "editor.detectIndentation": false,
  "editor.fontFamily": "'Fira Code' ,Consolas, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.formatOnPaste": true,
  "editor.mouseWheelZoom": true,
  "editor.quickSuggestions": {
    "strings": true
  },
  "editor.renderControlCharacters": true,
  "editor.renderWhitespace": "boundary",
  "editor.smoothScrolling": true,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  // emmet包含wxml视为html
  "emmet.includeLanguages": {
    "wxml": "html" //为wxml开启HTML emmet支持
  },
  // 文件相关
  "files.associations": {
    "*.cjson": "jsonc", //将.cjson设为jsonc
    "*.wxss": "css", //将wxss视为css
    "*.wxs": "javascript" //将wxs视为JavaScript
  },
  "files.autoSave": "off",
  "files.eol": "\n",
  "files.maxMemoryForLargeFilesMB": 4096,
  "files.useExperimentalFileWatcher": true,
  // 编辑器窗口设置
  "window.closeWhenEmpty": true,
  "window.zoomLevel": 0,
  "workbench.colorTheme": "One Dark Pro Vivid",
  "workbench.commandPalette.preserveInput": true,
  "workbench.iconTheme": "material-icon-theme",
  "workbench.statusBar.feedback.visible": false,
  // 终端设置
  "terminal.integrated.confirmOnExit": true,
  "terminal.integrated.copyOnSelection": true,
  "terminal.integrated.enableBell": true,
  "terminal.integrated.shell.windows": "C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe",
  // git设置
  "git.autofetch": true,
  "git.confirmSync": false,
  "merge-conflict.autoNavigateNextConflict.enabled": true,
  // css颜色提示配置
  "colorInfo.fields": [
    "hex",
    "rgb",
    "alpha",
    "css-color-name",
    "preview"
  ],
  "colorInfo.languages": [
    {
      "selector": "vue",
      "colors": "css"
    }
  ],
  // css peek设置
  "css_peek.activeLanguages": [
    "html",
    "ejs",
    "erb",
    "php",
    "javascriptreact",
    "typescriptreact",
    "typescript",
    "javascript",
    "vue"
  ],
  // gitLens设置
  "gitlens.settings.mode": "advanced",
  "gitlens.advanced.messages": {
    "suppressSupportGitLensNotification": true
  },
  // markdown设置
  "markdown.extension.orderedList.marker": "one",
  "markdown.extension.print.imgToBase64": true,
  "markdown.extension.toc.githubCompatibility": true,
  // minify设置
  "minify.minifyExistingOnSave": true,
  // php设置
  "php.validate.enable": true,
  "php.validate.executablePath": "u:/PHP/php.exe",
  "php.validate.run": "onType",
  //php intellisense配置
  "php.executablePath": "u:/PHP/php.exe",
  // typescript配置
  "typescript.locale": "zh-CN",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.suggest.completeFunctionCalls": true,
  "typescript.referencesCodeLens.enabled": true,
  "typescript.preferences.quoteStyle": "single",
  "javascript.suggest.completeFunctionCalls": true,
  "javascript.referencesCodeLens.enabled": true,
  "javascript.preferences.quoteStyle": "single",
  "javascript.implicitProjectConfig.checkJs": true,
  // tslint设置
  "tslint.jsEnable": true,
  // vutur设置
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "auto"
    },
    "prettyhtml": {
      "printWidth": 100,
      "singleQuote": false,
      "wrapAttributes": false,
      "sortAttributes": true
    },
    "prettier": {
      "printWidth": 120,
      "singleQuote": true
    }
  },
  "vetur.format.defaultFormatter.html": "prettyhtml",
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.useWorkspaceDependencies": true,
  // XML工具设置
  "xmlTools.enforcePrettySelfClosingTagOnFormat": true,
  "xmlTools.removeCommentsOnMinify": true,
  // 微信小程序
  "minapp-vscode.disableAutoConfig": true,
  // node intellisense
  "node-module-intellisense.autoStripExtensions": [
    ".js",
    ".jsx",
    ".ts",
    ".d.ts",
    ".tsx",
    ".vue"
  ],
  // liveshare设置
  "liveshare.audio.joinCallBehavior": "accept",
  // 设置同步
  "sync.gist": "898786a676d944120a9a1cba2bfc48c4",
  // todoHightlight配置
  "todohighlight.keywords": [],
  "fileheader.customMade": {
    "Author": "Mr.Hope",
    "Date": "Do not edit",
    "LastEditors": "Mr.Hope",
    "LastEditTime": "Do not edit",
    "Description": ""
  },
  "php-cs-fixer.executablePath": "${extensionPath}\\php-cs-fixer.phar",
  "php-cs-fixer.lastDownload": 1552317805384,
  // eslint设置
  "eslint.enable": true,
  "leetcode.defaultLanguage": "javascript",
  "leetcode.endpoint": "leetcode"
}
```

用鼠标在对应属性支上悬停时，Vscode会自动给出属性的说明。