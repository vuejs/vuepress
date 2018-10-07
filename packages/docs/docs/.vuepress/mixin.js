const notification = {
  '/': `
  <div>
    <div>Note that this is the document of <b>1.x</b>, since it's still in <b>alpha</b> stage and things may change or break until we reach <b>beta</b> phase, for now we recommend that you use the <b>0.x</b> in the production environment.</div>
    <br>
    <ul>
      <li>0.x docs: <a style="color: #fff;" href="https://v0.vuepress.vuejs.org/"><code>v0.vuepress.vuejs.org</code></a>
      </li>
      <li>Install 0.x: <code>yarn add vuepress</code></li>
      <li>Install 1.x alpha: <code>yarn add vuepress@next</code></li>
    </ul>
  </div>
`,
  '/zh/': `
  <div>
    <div>请注意这是 <b>1.x</b> 的文档，由于目前 1.x 仍处于 <b>alpha</b> 阶段，在我们到达 <b>beta</b> 阶段之前，有些 API 可能会变化、应用也可能不够稳定，所以目前我们推荐你在生产环境中使用 <b>0.x</b> .</div>
    <br>
    <ul>
      <li>0.x 的文档: <a style="color: #fff;" href="https://v0.vuepress.vuejs.org/"><code>v0.vuepress.vuejs.org</code></a>
      </li>
      <li>安装 0.x: <code>yarn add vuepress</code></li>
      <li>安装 1.x alpha: <code>yarn add vuepress@next</code></li>
    </ul>
  </div>
`
}

const gotIt = {
  '/': 'Got it',
  '/zh/': '知道了',
}

export default {
  methods: {
    notice () {
      setTimeout(() => {
        this.$notification = this.$toasted.show(notification[this.$localePath], {
          containerClass: 'compatibility-notification',
          closeOnSwipe: false,
          // you can pass a single action as below
          action: {
            text: gotIt[this.$localePath],
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
      }, 500)
    }
  },
  watch: {
    '$localePath' () {
      this.$notification.goAway(0)
      this.notice()
    }
  },
  mounted () {
    this.notice()
  }
}
