# 小程序框架使用说明

> 作者：Mr.Hope 最后编辑于2018/09/22
>
> 这是一个由Mr.Hope独立编写的小程序界面开发框架。全部代码均由Mr.Hope编写，如有抄袭、商用，Mr.Hope保留追究其责任的权利。

## 开发框架优点

1. 将界面开发的复杂过程转换为编写简单的json文件。开发门槛低，

2. 拥有详细的开发文档说明，简单易懂，页面文件自述性高，没有开发基础的人也可以经过简单阅读后看懂页面文件大体描述内容。[查看例子点这里](#json文件案例)

3. 开发者无需着眼于界面样式或是功能的实现，只需着眼于在json文件中添加渲染界面所需参数，即可完成界面编写。开发者只需在开发过程中按照开发说明录入参数，并注意格式即可。

## 开发工具

开发工具使用vscode，具体详见[vscode说明](/doc/software/vscode/vscodeInstruction)或[vscode简单说明](/doc/software/vscode/vscodeSimple)

## 开发说明

### 简单界面编写说明

1. 新建一个或多个json文件，对文件进行合理命名，使用“文件主题+编号”格式，命名为`xxx.json`。(多个文件请命名为 `xxx0.json` , `xxx1.json` , ...)文件命名只能包含英文与数字，文件名中不得包含空格。由多个单词组成的文件名建议使用驼峰表示法(除了多单词的首字母大写外均小写)。如`厚普公益学校`可以表示为`hopeGoodSchool`。

2. 整理界面所需的图片和图标，图片和图标请使用[压缩网站](https://tinypng.com)压缩至800Kb以下(带有文字或需要查看及其详细细节的图片可以提升至不多于1.2Mb)，并按照`页面文件名称`+`编号`的形式命名，如studentOrg1.jpg。

3. 在json中创建一个array，该array的每个元素均为一个`Object`。对于数组中的每个`Object`，其内必须包含一个有效的`tag`值。该值决定了该`object`所显示的内容。([你在说什么？](simpleDebug))

    每一个`Object`最终被渲染成为了页面的一部分。

    按照[tag值参数表](tagList)对**Object**剩余参数进行填写，并将所有，编写界面内容。

4. 将json文件与其他资源打包成zip压缩包，发送至[QQ:1178522294](https://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq)。

    > 不涉及到复杂界面编写的请直接看[开发注意事项](#开发注意事项)

### 复杂界面编写说明

对文件进行合理命名，使用“文件主题+编号”格式。

1. 在指定的路径下新建xxx.js与xxx.wxml文件，并将其界面路径添加至app.json中的pages数组中。**

2. 在xxx.js中输入：

    ```js
    var P = require('');//wxpage函数库路径
    var S = require('');//setPage函数库路径
    var  a = getApp().globalData;
    P('module1', {
        data:{//页面初始数据
            page:[]//此处填写page
        },
        onNavigate(res) {  //界面预加载时执行
        S.preSet(this.$session.get(res.query.aim + 'Temp'), a, res, this)
        //其他代码
        },
        onLoad(res) {
            S.Online(a, res, this);
        },
        navigate(res) {//页面跳转函数
            this.$route(res.currentTarget.dataset.url)
        },
        onPageScroll(e) {//页面滚动函数
            S.nav(e, this)
        },
        cA(e) {//页面组件函数
            S.component(e, this)
        },
        onShareAppMessage() {//页面分享函数
            return {
                title: this.data.page[0].title,
                path: `/modules/sharePage?From=主页&step=1&share=true&aim=${this.aim}`
            }
        },
        onUnload() {//页面卸载函数
            delete this.data.page;
        }
    });
    ```

    _**Tips：**_为了方便查错以及后续更改，在复制粘贴时保留原代码换行及缩进样式。

3. 在xxx.wxml中输入：

    ```html
    <import src="/templates/template" />
    <template is="all" data="{{page,T,nm}}" />
    ```

4. 对照tag值参数表文件进行界面内容编写。

    页面的编写主要通过操纵处于界面data下名为**page**的**array**来完成。该**array**的每个**element**均为一个**Object**。对于数组中的每个**Object**，其内必须包含**拥有有效值的tag属性**，**tag的value**决定了该**object**所显示的内容。

5. 在xxx.js中添加与编写函数。

   请在**functionName**中填入pages数组中定义的变量名称。并在“other codes here”处填入其他必要代码。

    - picker函数

        - 若填写了picker函数：

        functionName：picker函数值；

        ```js
        functionName(e) {
            S.picker(e,this);
            other code here......
        },
        ```

    - switch函数

        - 若填写了switch函数：

        functionName：switch函数值；

        ```js
        functionName(e) {
            S.Switch(e,this);
            other code here......
        },

        ```

    - slider函数：

        - functionName：switch函数值；

        ```js
        functionName(e){
            S.slider(e,this);
            other code here......
        },
        ```

最后将json文件与其他资源打包成zip压缩包，发送至[QQ:1178522294](https://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq)。

## 开发注意事项

> 下面是开发中需要注意的一些问题

- **p**组件文字排版

    1. 在针对段落文字排版时，请使用连续的三个空格来代替首行缩进;
    2. 段落里表示文字标题时请不要缩进，在尾部添加中文冒号并直接换行;
    3. 在段落里表示有序列表时请使用“空格+编号+英文句点+空格“的方式来表示。

- **img**、**p**组件图片链接填写

    请在`res`中填入`https://mrhope.top/mpImage/文件名/图片文件名+编号.jpg`,src留空等待开发者填写。

- **doc**组件文档路径填写

    请在`url`中填入`https://mrhope.top/mpFile/文件名.文件类型`

- **audio**音频路径填写

    请将音频上传至微信公众号并编辑图文发送，在src中填写图文链接。(请一直保留微信推送与素材库里的文件)

- **swiper**组件图片链接填写

    请在`url`的每个element依次填入`https://mrhope.top/mpImage/文件名/图片文件名+编号.jpg`。

## json文件案例

- 东师指南界面json文件

    ```json
    [
        {
            "tag": "head",
            "title": "东师指南",
            "grey": true,
            "shareable": true
        },
        {
            "tag": "grid",
            "content": [
                {
                    "text": "新生报到",
                    "icon": "/icon/check.svg",
                    "aim": "check0"
                },
                {
                    "text": "学习",
                    "icon": "/icon/study.svg",
                    "aim": "study0"
                },
                {
                    "text": "食堂",
                    "icon": "/icon/dining.svg",
                    "aim": "dining0"
                },
                {
                    "text": "生活",
                    "icon": "/icon/life.svg",
                    "aim": "life0"
                },
                {
                    "text": "寝室",
                    "icon": "/icon/dorm.svg",
                    "aim": "dorm0"
                },
                {
                    "text": "校园网",
                    "icon": "/icon/network.svg",
                    "aim": "network0"
                },
                {
                    "text": "校园卡",
                    "icon": "/icon/card.svg",
                    "aim": "card0"
                },
                {
                    "text": "吃喝玩乐",
                    "icon": "/icon/nearby.svg",
                    "aim": "nearby0"
                },
                {
                    "text": "交通",
                    "icon": "/icon/traffic.svg",
                    "aim": "traffic0"
                },
                {
                    "text": "学生组织",
                    "icon": "/icon/studentOrg.svg",
                    "aim": "studentOrg0"
                },
                {
                    "text": "资助",
                    "icon": "/icon/subsidize.svg",
                    "aim": "subsidize0"
                },
                {
                    "text": "SIM卡",
                    "icon": "/icon/sim.svg",
                    "aim": "sim0"
                }
            ]
        }
    ]
    ```

- 校学生会界面json文件

    ```json
    [
        {
            "tag": "head",
            "title": "学生会",
            "shareable": true,
            "contact": true
        },
        {
            "tag": "p",
            "head": " ",
            "text": "   东北师范大学学生会是中华全国学生联合会(简称全国学联)的团体会员单位，是吉林省学生联合会主席单位，是学校党委领导、校团委具体指导，自主开展工作的学生群众性组织，是同学与学校之间的联系纽带。"
        },
        {
            "tag": "p",
            "head": " ",
            "text": "   东北师范大学学生会实行主席团负责制，下设“一室八部一中心”。本部和净月两校区各设校区学生会，由主席(副主席)、办公室、学研部、宣传部、生活部、权益部、文艺部、体育部、民族部、女生部、大学生新媒体中心组成。各学院(部)学生会是东北师范大学学生会在各学院的直属学生组织，他们在同级党委领导、团委指导下开展工作，接受校学生会的领导和指导，并协助校学生会开展工作。"
        },
        {
            "tag": "p",
            "head": " ",
            "text": "   一直以来，学生会团结依靠全校同学，以“全心全意为同学服务”为工作宗旨，以“人格的魅力，学习的楷模，工作的典范”为培养目标，以“引导、组织、维护、服务”为主要工作职能，努力营造良好校园文化氛围，着力打造精品校园文化活动，切实维护学生基本利益，服务学生合理需求，获得了全校师生的一致认可和广泛支持。"
        },
        {
            "tag": "p",
            "head": " ",
            "text": "   在多年的发展与探索中，学生会开展的很多活动已成为东北师范大学校园文化建设中的品牌项目：已成功举办二十四届的“大学生教师技能大赛”是最受同学们关注和欢迎的比赛，夯实教师基本功，提高职业素养，充分体现了东北师范大学“为基础教育服务”的办学宗旨；权益部、生活部下设学生学风自我建设委员会、读书文化建设委员会、寝室文化建设委员会、就餐文化建设委员会四大委员会，针对学校读书文化、就餐文化、寝室文化、学风建设等方面进行广泛调研，关注同学们学习、生活中遇到的困难，及时为学生和学校搭建沟通平台；“大学生优秀传统文化素养培育工程”系列教育活动，针对学生思想文化道德建设，开展丰富有趣、贴近生活的课程与活动；“学士杯”足球赛、“精英杯”篮球赛等活动的开展，提高了学生的身体素质，丰富了课余生活，有效促进了各学院同学之间的交流；“激情年华”大学生风采展示系列活动、“炫亮东师”原创艺术比赛等格调高雅、体系健全的文艺活动，提高了学生的鉴赏能力和审美情趣；一年一度的“女生文化节”和“民族文化节”更成为了一道道青春靓丽的风景；大学生新媒体中心管理运营的“东师青年”微信平台已成为我校规模最大、用户活跃度最高的网络互动平台，在全国高校微信影响力排行榜中，多次排名第一，引领了学生主流价值观，弘扬了青春正能量。"
        },
        {
            "tag": "p",
            "head": " ",
            "text": "   东北师范大学学生会是东北师范大学学生自己的组织，是师大学子自治自律、服务同学的园地，更是我们大家心灵的归属和共同的家园。我们为年轻和梦想搭建一个绚亮的舞台，我们期待，能有越来越多的同学可以在这个舞台上翩然起舞！"
        },
        {
            "tag": "foot"
        }
    ]
    ```

- 食堂首页界面json文件

    ```json
    [
        {
            "tag": "head",
            "title": "食堂",
            "grey": true,
            "shareable": true,
            "contact": true
        },
        {
            "tag": "p",
            "head": "本部校区",
            "text": "  本部校区有北苑餐厅和南苑餐厅两个食堂。北苑餐厅共两层，南苑餐厅共三层。地理位置如图：",
            "src": "https://pic.kuaizhan.com/g1/M01/6C/9E/CgpQU1l8LBKAAIbWAAD7j-z-b3M8245036/imageView/v1/thumbnail/640x0"
        },
        {
            "tag": "list",
            "head": false,
            "content": [
                {
                    "text": "北苑餐厅",
                    "aim": "dining1"
                },
                {
                    "text": "南苑餐厅",
                    "aim": "dining2"
                }
            ]
        },
        {
            "tag": "list",
            "head": "净月校区",
            "content": [
                {
                    "text": "净月校区有两个食堂，分别为一食堂和二食堂，一食堂有三层、二食堂有两层。一食堂共三层楼，每一层楼有自己的特色。"
                },
                {
                    "text": "一食堂",
                    "aim": "dining4"
                },
                {
                    "text": "二食堂",
                    "aim": "dining5"
                }
            ]
        },
        {
            "tag": "list",
            "head": "美食节",
            "foot": "学校食堂每年都会举行美食节",
            "content": [
                {
                    "text": "再加点介绍"
                },
                {
                    "text": "本部美食节",
                    "aim": "dining3"
                },
                {
                    "text": "净月美食节",
                    "aim": "dining6"
                }
            ]
        },
        {
            "tag": "foot",
            "author": "Mr.Hope",
            "time": "2018/08/22"
        }
    ]
    ```