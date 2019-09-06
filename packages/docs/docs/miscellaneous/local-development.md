---
sidebar: auto
---

# Local Development

## Informations

If you here youh may be intereset of improve core vuepress.

Vuepress is using a combo with [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and [Lerna](https://github.com/lerna/lerna).

## Init packages

```bash
 yarn bootstrap // it will run and install into the root all packages subfolders
```

yarn bootstrap will use hoisting. What it mean for you ?

It will regroup all dependencies in the workspace root and link all packages.

to check the link you can run

```bash
    ls -la node_modules/@vuepress
```

You will all symlinks

:::warning
You have to take care to declare all dependencies inside subFolders package.json. When publish the lib if dependencie from a package is not declare it will just not work.
:::

:::warning
There is a special package you should have a look is @vuepress/shared-utils that are in typescript.
:::

After install everything it will run `yarn tsc`. This command will tell to @vuepress/shared-utils workspace to compile his js.

:::warning
From here if you are making change inside this package you will have to
run `yarn tsc` all the time or run in separate shell `yarn run tsc -w`. This will re run tsc at any change from shared-utils
:::

## Link

Good from here you have everything ready. You need to link vuepress to your project.

```bash
yarn register-vuepress
```

You will have something like this: `success Registered "vuepress".`

It will link the package vuepress from packages/vuepress. So you will have access to vuepress cli and vuepress packages.

they are decalre in the `packages/vuepress/package.json`

```js
{
"main": "index.js",
///
"bin": {
    "vuepress": "cli.js"
  }
  ///
}
```

Now go to your project and run `yarn link vuepress`.

You should have it `success Using linked package for "vuepress".`

## Unlink

You may want to unlink everything. For it in the workspace root folder. Run

```bash
yarn unregister-vuepress
```

Now you can run `yarn unlink vuepress` into your project folder.

If everything work properly you should have an error telling you there is no package found called vuepress, if you run `yarn link vuepress` in you project folder.

## BUGS / QA

You will maybe find some difficulty with link. If you encounter something like `There's already a package called "vuepress" registered`.
You have already vuepress registered. so:

- if you already link vuepress from [Link](#link). It's totally fine. If you make changes because it is symlink you dont have to re run something. You will have to rerun yarn tsc if you update shared-utils package. Nothing more
- if you have done nothing. You have already vuepress linked somewhere. What you have to do is to delete folder where you already run `yarn link` or run `yarn unlink` inside it.

## More

You will have interesting commands available:

- `yarn packages:list` will list you every packages present and their versions [More...](https://github.com/lerna/lerna/tree/master/commands/list#readme)
- `yarn packages:changed` will tell you which package will be affect by the next lerna publish / version [More...](https://github.com/lerna/lerna/tree/master/commands/changed#readme)
- `yarn packages:diff` will show you all diff from last release [More...](https://github.com/lerna/lerna/tree/master/commands/diff#readme)
