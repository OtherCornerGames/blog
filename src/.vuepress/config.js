const fs = require("fs");
const path = require("path");

module.exports = {
  base: "/blog/",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Other Corner Games Blog',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "This is a blog and resource tool for Other Corner Games",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    editLinks: false,
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Full Stack Development',
        link: '/full-stack-dev/',
      },
      {
        text: 'Game Development',
        link: '/game-dev/'
      },
      {
        text: 'Art',
        link: '/art/'
      }
    ],
    sidebar: {
      '/full-stack-dev/': [...getSideBar('full-stack-dev', 'Full Stack Development')],
      '/game-dev/': [...getSideBar('game-dev', 'Game Development')],
      '/art/': [...getSideBar('art', 'Art'), ...getSideBar('art/digital', 'Digital Art'), ...getSideBar('art/traditional', 'Traditional Art')],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}


function getSideBar(folder, title) {
  const extension = [".md"];
  const root = folder.lastIndexOf('/') === -1 ? '' : folder.slice(folder.lastIndexOf('/') + 1)
  const files = fs
    .readdirSync(path.join(`${__dirname}/../${folder}`))
    .filter(file =>
      file.toLowerCase() != "readme.md" &&
      fs.statSync(path.join(`${__dirname}/../${folder}`, file)).isFile() &&
      extension.includes(path.extname(file))
    ).map(filename => {
      if (!root) {
        return filename
      }
      return root + '/' + filename
    });
  const children = [...files]
  if (!root) {
    children.unshift('')
  }
  return [{ title: title, children }];
}