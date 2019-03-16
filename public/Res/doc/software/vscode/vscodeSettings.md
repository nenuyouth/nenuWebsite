# VSCode推荐配置

这是Mr.Hope个人使用的VsCode设置，部分设置是[这里](vscodeExtension)的插件配置

将下面内容拷贝至setting.json以更改VS Code设置

```json
{
    "editor.mouseWheelZoom": true,
    "editor.renderControlCharacters": true,
    "editor.renderWhitespace": "boundary",
    "editor.smoothScrolling": true,
    "editor.tabSize": 2,
    "editor.wordWrap": "on",
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "files.associations": {
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript"
    },
    "files.autoSave": "onWindowChange",
    "git.autofetch": true,
    "git.confirmSync": false,
    "gitlens.settings.mode": "advanced",
    "gitProjectManager.baseProjectsFolders": [
        "E:/git"
    ],
    "markdown.extension.orderedList.marker": "one",
    "markdown.extension.print.imgToBase64": true,
    "markdown.extension.toc.githubCompatibility": true,
    "minify.minifyExistingOnSave": true,
    "php.executablePath": "e:\\PHP\\php.exe",
    "php.validate.executablePath": "e:\\PHP\\php.exe",
    "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    "workbench.colorTheme": "One Dark Pro Vivid",
    "workbench.commandPalette.preserveInput": true,
    "workbench.iconTheme": "material-icon-theme",
    "workbench.statusBar.feedback.visible": false,
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "auto"
        },
        "prettyhtml": {
            "printWidth": 120,
            "singleQuote": false,
            "wrapAttributes": false,
            "sortAttributes": true
        }
    },
    "vetur.format.defaultFormatter.html": "prettyhtml",
    "minapp-vscode.disableAutoConfig": true
}
```

以下是具体设置项解释

```json
{
    "editor.mouseWheelZoom": true,//开启鼠标滚轮缩放
    "editor.renderWhitespace": "boundary",//除了单个空格，在空白字符上显示符号
    "editor.renderControlCharacters": true,//控制编辑器是否显示控制字符
    "editor.smoothScrolling": true,//平滑滚动开启
    "editor.tabSize": 2,//编辑器缩进两空格
    "editor.wordWrap": "on",//在视区宽度拆行
    "emmet.includeLanguages": {
        "wxml": "html"//为wxml开启HTML emmet支持
    },
    "files.associations": {//设置文件关联
        "*.cjson": "jsonc",//将.cjson设为jsonc
        "*.wxss": "css",//将wxss视为css
        "*.wxs": "javascript"//将wxs视为JavaScript
    },
    "files.autoSave": "onWindowChange",//在窗口失去焦点时自动保存
    "git.autofetch": true,//Git自动拉取
    "git.confirmSync": false,//Git同步确认
    "gitlens.settings.mode": "advanced",//gitlens显示所有设置
    "gitProjectManager.baseProjectsFolders": ["E:/git"],//gitProjectManager设置项，设置在何处寻找repo
    "markdown.extension.orderedList.marker": "one",//使用数字作为有序标记
    "markdown.extension.print.imgToBase64": true,//转换html时图片使用base64转码
    "markdown.extension.toc.githubCompatibility": true,//开启Github格式预览
    "minify.minifyExistingOnSave": true,//在保存时更新已经存在的min文件
    "php.executablePath": "e:\\PHP\\php.exe",//php的路径(来自扩展)
    "php.validate.executablePath": "e:\\PHP\\php.exe",//php的路径(来自扩展)
    "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    "workbench.colorTheme": "One Dark Pro Vivid",//颜色主题
    "workbench.commandPalette.preserveInput": true,//打开命令面板时恢复上次输入内容
    "workbench.iconTheme": "material-icon-theme",//图标主题
    "workbench.statusBar.feedback.visible": false,//隐藏界面反馈
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "auto"
        },
        "prettyhtml": {
            "printWidth": 120,
            "singleQuote": false,
            "wrapAttributes": false,
            "sortAttributes": true
        }
    },
    "vetur.format.defaultFormatter.html": "prettyhtml",
    "minapp-vscode.disableAutoConfig": true,
}
```