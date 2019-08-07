---
title: modal
metaTitle: Modal Plugin | VuePress
---

# [@vuepress/plugin-modal](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-modal)


> Modal plugin

## Install

```bash
yarn add -D @vuepress/plugin-modal
# OR npm install -D @vuepress/plugin-modal
```

## Usage

```javascript
module.exports = {
  // .vuepress/config.js or themePath/index.js
  plugins: ['@vuepress/modal']
}
```

```vue
  <template>
    <div>
      <h1>Hello Vue.Js</h1>
      <Modal>
        <template slot="modalaction"> Open Dialog !</template>
        <template slot="title"> Helloo !</template>
        <template slot="description">Hello from , VuePress!</template>
        <template slot="footer">Thank you for using VuePress!</template>
      </Modal>
    </div>
  </template>

  <script>
    import Modal from '@Modal'

    export default {
      components: { Modal }
    }
  </script>

```