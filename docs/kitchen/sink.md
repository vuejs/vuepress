---
foo: 123
bar: 234
---

# Kitchen Sink

## Relative Links

- [Go home](../README.md)
- [Setup](../setup.md)

## Syntax Highlighting

``` js
const a = 123
```

``` html{2,10-13}
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

<script>
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
</script>
```

## Interpolation

- Foo is {{ $page.frontmatter.foo }}
- Bar is {{ $page.frontmatter.bar }}

## Using Site Data

<img :src="`${$site.base}logo.png`" alt="logo">
