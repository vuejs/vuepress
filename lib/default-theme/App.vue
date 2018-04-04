<template>
  <div id="container">
    <ul>
      <li v-for="page in $site.pages">
        <router-link :to="page.path">{{ page.name }}</router-link>
      </li>
    </ul>
    <Index v-if="$page.path === '/index'" />
    <Page v-else />
  </div>
</template>

<script>
import nprogress from 'nprogress'
import Index from './Index.vue'
import Page from './Page.vue'

export default {
  components: { Index, Page },
  mounted () {
    nprogress.configure({ showSpinner: false })

    this.$router.beforeEach((to, from, next) => {
      nprogress.start()
      next()
    })

    this.$router.afterEach(() => {
      nprogress.done()
    })
  }
}
</script>

<style>
/*
  Copied from nprogress since it doens't
  allow programmatic configuration of color
*/

/* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #41b883;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #41b883, 0 0 5px #41b883;
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #41b883;
  border-left-color: #41b883;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
