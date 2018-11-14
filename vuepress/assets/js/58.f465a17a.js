(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{255:function(t,e,a){"use strict";a.r(e);var r={props:["slot-key"],mounted:function(){this.$nextTick(function(){this.$vuepress.$emit("AsyncMarkdownContentMounted",this.slotKey)})}},s=a(5),v=Object(s.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.slotKey}},[a("h1",{attrs:{id:"术语"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#术语","aria-hidden":"true"}},[t._v("#")]),t._v(" 术语")]),t._v(" "),a("p",[t._v("你可能会在文档中碰到一些陌生的概念，本节列出了文档中常见的术语，方便查阅、学习、插件/主题开发之用。")]),t._v(" "),a("h2",{attrs:{id:"frontmatter"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter","aria-hidden":"true"}},[t._v("#")]),t._v(" frontmatter")]),t._v(" "),a("blockquote",[a("p",[t._v("Access: "),a("code",[t._v("$page.frontmatter")])])]),t._v(" "),a("p",[t._v("当前页面的 "),a("code",[t._v("markdown")]),t._v(" 文件中包裹在 "),a("code",[t._v("---")]),t._v(" 中的配置，一般用于做一些页面级别的配置。")]),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("VuePress 的动态布局系统等特性是基于 "),a("code",[t._v("frontmatter")]),t._v(" 实现的，你可以使用插件 API "),a("router-link",{attrs:{to:"./../plugin/option-api.html#extendpagedata"}},[t._v("extendPageData")]),t._v(" 在构建期间动态修改 frontmatter 的值。")],1)]),t._v(" "),a("h2",{attrs:{id:"permalink"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#permalink","aria-hidden":"true"}},[t._v("#")]),t._v(" permalink")]),t._v(" "),a("blockquote",[a("p",[t._v("Access: "),a("code",[t._v("$page.frontmatter.permalink")])])]),t._v(" "),a("p",[t._v("永久链接，参考 "),a("router-link",{attrs:{to:"./../guide/permalinks.html"}},[t._v("permalinks")]),t._v(" 了解更多。")],1),t._v(" "),a("h2",{attrs:{id:"regularpath"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#regularpath","aria-hidden":"true"}},[t._v("#")]),t._v(" regularPath")]),t._v(" "),a("blockquote",[a("p",[t._v("Access: "),a("code",[t._v("$page.regularPath")])])]),t._v(" "),a("p",[t._v("当前页面基于目录结构生成的 URL。")]),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("在构建期动态生成路由时，一个页面的 URL ("),a("code",[t._v("$page.path")]),t._v(") 将优先使用 "),a("code",[t._v("$page.frontmatter.permalink")]),t._v("，若不存在则降级到 "),a("code",[t._v("$page.regularPath")]),t._v("。")])]),t._v(" "),a("h2",{attrs:{id:"headers"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#headers","aria-hidden":"true"}},[t._v("#")]),t._v(" headers")]),t._v(" "),a("blockquote",[a("p",[t._v("Access: "),a("code",[t._v("$page.headers")])])]),t._v(" "),a("p",[t._v("即 "),a("code",[t._v("markdown")]),t._v(" 中那些以一个或多个 "),a("code",[t._v("#")]),t._v(" 定义的标题。")]),t._v(" "),a("h2",{attrs:{id:"siteconfig"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#siteconfig","aria-hidden":"true"}},[t._v("#")]),t._v(" siteConfig")]),t._v(" "),a("blockquote",[a("p",[t._v("Access: "),a("code",[t._v("$site | Context.siteConfig")])])]),t._v(" "),a("p",[t._v("即 "),a("code",[t._v(".vuepress/config.js")]),t._v("，译为"),a("code",[t._v("站点配置")]),t._v("。")]),t._v(" "),a("h2",{attrs:{id:"themeconfig"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#themeconfig","aria-hidden":"true"}},[t._v("#")]),t._v(" themeConfig")]),t._v(" "),a("blockquote",[a("p",[t._v("Access: "),a("code",[t._v("$site | Context.themeConfig")])])]),t._v(" "),a("p",[t._v("即 "),a("code",[t._v(".vuepress/config.js")]),t._v(" 中 "),a("code",[t._v("themeConfig")]),t._v(" 的值，译为"),a("code",[t._v("用户的主题配置")]),t._v("。")]),t._v(" "),a("h2",{attrs:{id:"themepath"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#themepath","aria-hidden":"true"}},[t._v("#")]),t._v(" themePath")]),t._v(" "),a("blockquote",[a("p",[t._v("Access: "),a("code",[t._v("Context.themePath")])])]),t._v(" "),a("p",[t._v("当前使用的主题的根路径（绝对路径）。")]),t._v(" "),a("h2",{attrs:{id:"themeentryfile"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#themeentryfile","aria-hidden":"true"}},[t._v("#")]),t._v(" themeEntryFile")]),t._v(" "),a("blockquote",[a("p",[t._v("Access: "),a("code",[t._v("Context.themeEntryFile")])])]),t._v(" "),a("p",[t._v("主题的配置文件 ("),a("code",[t._v("themePath/index.js")]),t._v(")。")]),t._v(" "),a("h2",{attrs:{id:"layout"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#layout","aria-hidden":"true"}},[t._v("#")]),t._v(" layout")]),t._v(" "),a("blockquote",[a("p",[t._v("Access: "),a("code",[t._v("$page.frontmatter.layout")])])]),t._v(" "),a("p",[t._v("当前页面所使用的布局组件名。")])])},[],!1,null,null,null);e.default=v.exports}}]);