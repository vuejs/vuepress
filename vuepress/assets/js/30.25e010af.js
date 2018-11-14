(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{227:function(t,s,a){"use strict";a.r(s);var n={props:["slot-key"],mounted:function(){this.$nextTick(function(){this.$vuepress.$emit("AsyncMarkdownContentMounted",this.slotKey)})}},e=a(5),o=Object(e.a)(n,function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.slotKey}},[a("h1",{attrs:{id:"vuepress-plugin-last-updated"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-plugin-last-updated","aria-hidden":"true"}},[t._v("#")]),t._v(" "),a("a",{attrs:{href:"https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-last-updated",target:"_blank",rel:"noopener noreferrer"}},[t._v("@vuepress/plugin-last-updated"),a("OutboundLink")],1)]),t._v(" "),a("blockquote",[a("p",[t._v("last-updated plugin for vuepress")])]),t._v(" "),a("div",{staticClass:"warning custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("Note")]),t._v(" "),a("p",[t._v("Note that this plugin has been included in the core, you don't need to repeat the installation.")])]),t._v(" "),a("h2",{attrs:{id:"usage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#usage","aria-hidden":"true"}},[t._v("#")]),t._v(" Usage")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  plugins"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token string"}},[t._v("'@vuepress/last-updated'")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" \n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"options"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#options","aria-hidden":"true"}},[t._v("#")]),t._v(" Options")]),t._v(" "),a("h3",{attrs:{id:"transformer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#transformer","aria-hidden":"true"}},[t._v("#")]),t._v(" transformer")]),t._v(" "),a("ul",[a("li",[t._v("Type: "),a("code",[t._v("(timestamp: number, lang: string) => string")])]),t._v(" "),a("li",[t._v("Default: "),a("code",[t._v("undefined")])])]),t._v(" "),a("p",[t._v("By default, this plugin produces a 13-bit timestamp for each page, you can also pass in a transformer to convert it to any format that you want.")]),t._v(" "),a("p",[t._v("e.g.")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" moment "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'moment'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  plugins"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" \n      "),a("span",{attrs:{class:"token string"}},[t._v("'@vuepress/last-updated'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        transformer"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("timestamp"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" lang"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{attrs:{class:"token comment"}},[t._v("// Don't forget to install moment yourself")]),t._v("\n          "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" moment "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'moment'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n          moment"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("locale")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("lang"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n          "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("moment")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("timestamp"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("fromNow")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("If you are running in "),a("router-link",{attrs:{to:"./../../guide/i18n.html"}},[t._v("i18n")]),t._v(" mode, you can also use the second argument "),a("code",[t._v("lang")]),t._v(" to generate time strings for different languages.")],1),t._v(" "),a("p",[t._v("Note that in VuePres, we follow this spec: "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Language_localisation",target:"_blank",rel:"noopener noreferrer"}},[t._v("W3C > Language tags in HTML and XML"),a("OutboundLink")],1),t._v(", so "),a("code",[t._v("en-US")]),t._v(" uses hyphens ("),a("code",[t._v("-")]),t._v(") instead of underscores ("),a("code",[t._v("_")]),t._v("). Please make sure that the library you are using follows this spec, otherwise please convert it yourself.")])])])},[],!1,null,null,null);s.default=o.exports}}]);