# Development

When i started to dev on vuepress i faced some issues about linking package etc... Principally due to tsc and yarn workspaces.

So i decided to propose to you npm instead of yarn with the new lerna version.

It's a proposal and need some adjustements / configurations. As i change a lot of files... It could be great if we can have discussions on it.

My first goal here was to simplify the development process with vuepress:

- i changed the naming of scripts convention on package.json to understand when we are using lerna / docs or vuepress:links instead of register-vuepress. It seem's to me more relevant like this.

- As with lerna we could use hoisting and strict (check after to have more infos) it will be more stable to add principals dependencies in the root and each one can have some specific packages.

  - in my root vuepress you will have all internal packages. It let us not require them everywhere
  - in each of them you will have some specific packages. What is cool here is the hoisting and the strict. Hoisting will let us have their dependencies at the root package and strict will tell to us if we are using the same package with different version and will send an error.

- i make the choice of deleting tsc because of the dev you had to re run all time tsc for work with vuepress.

- Since then i have 2 bugs with `npm run test` with import. Pretty weird if you cqn help on this.

Then to work with vuepress now it is as easy as it:

- clone vuepress
- `cd vuepress` `npm run lerna:bootstrap`
- you can use the repo test `npm run dev`
- or if you prefer link it to your project `npm run vuepress:link`

some really important commands with lerna you must know.

`"lerna:bootstrap": "npm install && lerna bootstrap --hoist --strict -- --no-package-lock"` https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme

lerna ls -l https://github.com/lerna/lerna/tree/master/commands/list

lerna run --scope my-component test https://github.com/lerna/lerna/tree/master/commands/run#readme

lerna changed [package-name]

lerna diff [package-name]

lerna add <package>[@version][--dev] [--exact] https://github.com/lerna/lerna/tree/master/commands/add#readme
