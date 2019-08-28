# Development

`"lerna:bootstrap": "npm install && lerna bootstrap --hoist --strict -- --no-package-lock"` https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme

lerna ls -l https://github.com/lerna/lerna/tree/master/commands/list

lerna run --scope my-component test https://github.com/lerna/lerna/tree/master/commands/run#readme

lerna changed [package-name]

lerna diff [package-name]

lerna add <package>[@version][--dev] [--exact] https://github.com/lerna/lerna/tree/master/commands/add#readme
