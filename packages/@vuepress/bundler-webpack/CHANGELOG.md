# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.2](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2020-12-01)


### Features

* **bundler-webpack:** use esbuild for compilation and minification ([4351f99](https://github.com/vuepress/vuepress-next/commit/4351f997ffee41d560a257abd28880aa98ee29a4))





# 2.0.0-alpha.1 (2020-12-01)


### Bug Fixes

* **bundler-webpack:** add assets hash to avoid name conflicts ([550584a](https://github.com/vuepress/vuepress-next/commit/550584a8ebbdc90662550f65c5e644cabde9ca41))
* **bundler-webpack:** allow stylus to import css by default ([6664b65](https://github.com/vuepress/vuepress-next/commit/6664b65783c0f215b113ce72102630c709a0a7ac))
* **bundler-webpack:** always watch .vuepress dir ([c2c2fed](https://github.com/vuepress/vuepress-next/commit/c2c2fed1745e0ddd46d6d71b9f06036678aaf1b1))
* **bundler-webpack:** do not enable devtool in prod mode ([b1d821a](https://github.com/vuepress/vuepress-next/commit/b1d821a78e90f1e377b9158431ff01f375319abc))
* **bundler-webpack:** remove server dest temp directory ([91ed5bb](https://github.com/vuepress/vuepress-next/commit/91ed5bbfed6d0488d5b2709cbc6956c2f99c7455))
* **bundler-webpack:** use loader options type ([f5f2b79](https://github.com/vuepress/vuepress-next/commit/f5f2b79f766d078379c762161aaf5e4b2947c1d3))
* **cli:** disable noInfo option ([e01cb12](https://github.com/vuepress/vuepress-next/commit/e01cb12c195a198b57ec149070110706ba913cd4))


### Features

* **bundler-webpack:** add __SSR__ constant ([6fe1ad6](https://github.com/vuepress/vuepress-next/commit/6fe1ad6e02d7cb0a45b484edf652071ba245851a))
* **bundler-webpack:** add [@source](https://github.com/source) alias ([9d8cc38](https://github.com/vuepress/vuepress-next/commit/9d8cc3871c53c83ae5e1074c4be49c3c506df77f))
* **bundler-webpack:** add style pre-processors config ([7502682](https://github.com/vuepress/vuepress-next/commit/7502682ed6943300a0f8b7ac8a0ee897767264c7))
* **bundler-webpack:** allow disable prefetch and preload links ([2e5eb77](https://github.com/vuepress/vuepress-next/commit/2e5eb77f744daf81d080588ca8059bea086b1b75))
* **bundler-webpack:** copy files from public dir to dest dir ([10848fe](https://github.com/vuepress/vuepress-next/commit/10848fe55fdf985d51cde30c684f1f364cafd5b8))
* **bundler-webpack:** disable __VUE_OPTIONS_API__ by default ([ce5945b](https://github.com/vuepress/vuepress-next/commit/ce5945b7f3fac7ded56f75adffdb5da4e13f5d69))
* **bundler-webpack:** extract all css files together ([ce0783b](https://github.com/vuepress/vuepress-next/commit/ce0783b7b896b5cc593c31d335627d88737094a1))
* **bundler-webpack:** migrate to postcss 8 ([5694346](https://github.com/vuepress/vuepress-next/commit/56943460fed831cc58ab7f643d8d76c906b0e1c7))
* **bundler-webpack:** migrate webpack related hooks ([f5eb159](https://github.com/vuepress/vuepress-next/commit/f5eb159294afbf7b5c799ba8ad7c5c8836299c1c))
* **bundler-webpack:** render locale data ([2ae31c1](https://github.com/vuepress/vuepress-next/commit/2ae31c1f31204fc8e4dbd88d8b4c6b90bfe492cc))
* **bundler-webpack:** sync client changes and optimize ssr ([9b4a2cd](https://github.com/vuepress/vuepress-next/commit/9b4a2cd3bc5af63085ee4850215948268f5b8f92))
* **bundler-webpack:** use webpack plugin to optimize dev logs ([70c1d64](https://github.com/vuepress/vuepress-next/commit/70c1d649bd723ea6523e34cfe512bfa2e5121a7b))


### Performance Improvements

* **bundler-webpack:** split vendor chunk and enable runtime chunk ([0d1fbfd](https://github.com/vuepress/vuepress-next/commit/0d1fbfd7b3f6c36d027edd5fbafb1aed02210a4d))
* **bundler-webpack:** use postcss-csso to minify styles ([2cb23cc](https://github.com/vuepress/vuepress-next/commit/2cb23cc1dc6b26245d07e87d2c72628881f4ba93))
