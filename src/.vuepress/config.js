module.exports = {
  title: '☀️W-Qing',

  description: 'W-Qing\'s homepage',

  head: [
    ['link', { rel: 'shortcut icon', href: '/img/favicon-32.ico' }],
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },

  theme: 'vuepress-theme-meteorlxy',

  themeConfig: {
    lang: Object.assign(require('vuepress-theme-meteorlxy/lib/langs/zh-CN'), {
      home: `Welcome to My Homepage`,
      posts: 'My Posts'
    }),

    personalInfo: {
      nickname: 'W-Qing',
      description: 'I may be lonely,<br/>but l\'m not stupid,<br/>l try to live with my mistake.',
      email: 'sunburst.wang@qq.com',
      location: 'Shanghai City, China',
      organization: 'Ludong University',

      avatar: '/img/avatar.png',

      sns: {
        github: {
          account: 'W-Qing',
          link: 'https://github.com/W-Qing',
        }
      },
    },
    // 喜欢的语录
    quotations: [
      '人有所执，方有所成',
      '不如意才是人生',
      '成熟不是世故'
    ],

    headerBackground: {
      // url: '/assets/img/bg.jpg',
      useGeo: true,
    },

    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Posts', link: '/posts/', exact: false  },
      { text: 'About', link: '/about/', exact: false  }
    ],

    comments: {
      platform: 'github',
      owner: 'W-Qing',
      repo: 'W-Qing.github.io',
      clientId: 'c15792009a34a7feb3eb',
      clientSecret: '9b782f67039b4cb41deedb85907852ec9e6a8a2b',
      prefix: '[Post Comments] ',
      labels: ['comments'],
    },
  },

  markdown: {
    toc: {
      includeLevel: [2, 3, 4]
    }
  },

  plugins: [
    ['@vuepress/google-analytics', {
      'ga': 'UA-132770851-1',
    }],
  ], 

  chainWebpack: (config, isServer) => {
    if (isServer === false) {
      config.optimization.splitChunks({
        maxInitialRequests: 5,
        cacheGroups: {
          2: {
            test: /[\\/]node_modules[\\/](@vssue|@vuepress|vssue|nprogress|geopattern)[\\/]/,
            name: 'vendor.2',
            chunks: 'all',
          },
          1: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vue-i18n|vue-class-component)[\\/]/,
            name: 'vendor.1',
            chunks: 'all',
          },
          0: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'vendor.0',
            chunks: 'all',
          },
        },
      })
    }
  }
}
