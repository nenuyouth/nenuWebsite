interface Aside {
  text: string;
  level: string;
}

// 初始化目录
const catalogGernarate = (ctx: any) => {
  const aside: Aside[] = [];
  const title = $('h1').text();

  // 设置目录
  const headings = document.querySelectorAll('h2,h3,h4');

  // 设置网页标题
  ctx.$emit('title', title);
  ctx.docTitle = title;

  Object.keys(headings).forEach(key => {
    const index = Number(key);

    if (
      !Number.isNaN(index) &&
      headings[index].children[0] &&
      headings[index].children[0].tagName.toLowerCase() === 'svg'
    ) {
      const { id } = headings[index];

      if (id && id.indexOf('href') === -1) {
        const text = headings[index].textContent;
        const level = headings[index].tagName[1];

        if (text) aside.push({ level, text });
      }
    }
  });

  ctx.noneCatalog = aside.length === 0;

  ctx.aside = aside;
};

// 注册页面内部链接点击时的滚动动画效果
const registScrollAnimation = () => {
  $('a.md-a').on('click', event => {
    const id = $(event.currentTarget).attr('href');

    if (id) {
      const offset = $(id).offset();

      if (offset)
        $('html, body').animate(
          { scrollTop: `${offset.top - 50}px` },
          { duration: 500, easing: 'swing' }
        );
    }

    event.preventDefault();
  });
};

// 注册页面标题悬停时的动画效果
const registHeadingHover = (ctx: any) => {
  if (!ctx.$store.state.systemInfo.iOS) {
    $('.markdown-body :header').on('mouseover', event => {
      $(event.currentTarget)
        .children('svg')
        .css({ display: 'inline-block' });
    });
    $('.markdown-body :header').on('mouseout', event => {
      $(event.currentTarget)
        .children('svg')
        .css({ display: 'none' });
    });
  }
};

// 注册页面标题点击时的滚动置顶动画效果
const registScrollTopAnimation = () => {
  $('.markdown-body :header').on('click', event => {
    // 如果当前标题只有一个childNode，且node的标签不是a，进行滚动动画
    if ($(event.currentTarget).children()[0].tagName !== 'A') {
      const offset = $(event.currentTarget).offset();

      if (offset) {
        // 滚动动画效果
        $('html, body').animate(
          { scrollTop: `${offset.top - 4}px` },
          { duration: 500, easing: 'swing' }
        );

        // 链接图标的动画效果
        $(event.currentTarget)
          .children('svg')
          .css({ display: 'inline-block' });
        setTimeout(() => {
          $(event.currentTarget)
            .children('svg')
            .css({ display: 'none' });
        }, 1500);
      }
    }
  });
};

// 注册文档间跳转逻辑
const registRoute = (ctx: any) => {
  const route = ctx.$route;
  const router = ctx.$router;

  $('a.md-link').on('click', event => {
    const url = $(event.currentTarget).attr('href');

    if (url)
      if (url && url[0] === '/')
        // 内部绝对路径
        router.push(url);
      else if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)
        // 外部链接
        window.open(url);
      else {
        // 内部相对路径
        const base = route.path.slice(0, route.path.lastIndexOf('/'));

        router.push(`${base}/${url}`);
      }
    else
      ctx.$confirm({
        title: '地址错误',
        content: '链接地址有误，请汇报给Mr.Hope!',
        autoFocusButton: 'cancel',
        cancelText: '确定',
        okText: '汇报',
        okType: 'danger',
        onOk: () => {
          router.back();
          window.open(
            'http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes'
          );
        },
        onCancel: () => {
          router.back();
        }
      });

    event.preventDefault();
  });
};

// 注册页面内动作
const actionRegister = (ctx: any) => {
  catalogGernarate(ctx);
  registScrollAnimation();
  registHeadingHover(ctx);
  registScrollTopAnimation();
  registRoute(ctx);
};

export default actionRegister;
