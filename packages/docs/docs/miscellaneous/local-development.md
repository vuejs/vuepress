---
sidebar: auto
---

# Local Development

## Introduction

When it comes to contributing to an open-source project, the biggest obstacle people encounter is trying to get a local environment setup so they can test their changes to make sure everything works as expected. As a result, we have written this guide to help you so you can begin contributing to the VuePress ecosystem!

## Prerequisites

- [Node.js v12.x](https://nodejs.org/en/)\*
- [Yarn v1.x](https://classic.yarnpkg.com/)

\*Node.js v10 should work as well, but other versions have not been verified.

## Setup Guide

In this guide, we will be using the following names to refer to the two projects you need to be successful:

- **VuePress Project**: This refers to your fork of the [official VuePress repository](https://github.com/vuejs/vuepress/)
- **VuePress Sandbox**: This refers to a local instance of VuePress that will serve as the simulation for creating test scenarios to verify that changes in the VuePress Project work as expected

### VuePress Project Setup

1. Fork the [official VuePress repository](https://github.com/vuejs/vuepress/)
1. Clone your fork onto your machine (e.g., `git clone ...`)
1. Open your cloned project in a new terminal window
1. Run the following commands:

```bash
# Install all dependencies in the project
yarn

# Compile shared-utils TypeScript package into JavaScript
yarn tsc
```

5. Verify there is no global installation of VuePress

```bash
# Check global yarn packages
yarn global list

# If it exists, remove global VuePress package
yarn global remove vuepress
```

6. Configure local VuePress Project to be the source of truth

```bash
# Registers local VuePress project
yarn register-vuepress

# If successful, you should see a message
# like `success Registered "vuepress"`
```

And with that, we’re ready to setup our VuePress Sandbox!

### VuePress Sandbox Setup

1. In a separate terminal, create a new npm project.

```bash
# Create a new folder
mkdir vuepress-sandbox

# Change directory to VuePress Sandbox
cd vuepress-sandbox

# Initalize a new npm project
yarn init # or npm init

# You will be prompted to fill out a form
# Since this is a sandbox environment,
# feel free to just hit skip through it
# by hitting enter until it completes setup!
```

2. Create a basic VuePress Sandbox site

```bash
# Create the folder where your site will live
mkdir docs

# Initialize it with a simple markdown file
echo '# My VuePress Sandbox Site' > docs/index.md
```

3. Add a script to `package.json` to start VuePress environment

```json{7}
{
  "name": "vuepress-sandbox",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "vuepress dev docs",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {}
}
```

4. Verify that the script does not work

```bash
# Run dev command
yarn dev

# You should receive an error indicating
# that VuePress cannot be found.
# This is a good thing!
```

5. Link your VuePress Project to your VuePress Sandbox

```bash
# Link VuePress Project
yarn link vuepress

# You should see a message like
# `success Using linked package for "vuepress"`
```

6. Run your script again and it should work!

```bash
# Start local dev environment
yarn dev
```

And with that, you should have a fully functioning local VuePress development environment!

### Disable Local Development

While it’s great that you can work with a local instance of VuePress, there will be times that you want to disable it so that you can refer to the published version instead. To do this, you will need to do the following:

1. Navigate to your VuePress Project in the terminal
1. Unregister your VuePress Project

```bash
# Unregister VuePress Project
yarn unregister-vuepress
```

3. Navigate to your VuePress Sandbox in the terminal
1. Remove dependency on local VuePress Project

```bash
yarn unlink vuepress
```

And that’s it! You can go back to regular development now!

## Notes

- `yarn` will use hoisting. What does it mean for you ?
  - It will regroup all dependencies in the workspace root and link all packages.
- You have to take care to declare all dependencies inside subFolders package.json. When publish the lib if dependencies from a package is not declare it will just not work.
- There is a special package you should have a look is @vuepress/shared-utils that are in TypeScript.
  - From here if you are making change inside this package you will have to run `yarn tsc` all the time or run in separate shell `yarn run tsc -w`. This will re run tsc at any change from shared-utils
- You will have interesting commands available:
  - `yarn packages:list` will list you every packages present and their versions [More...](https://github.com/lerna/lerna/tree/master/commands/list#readme)
  - `yarn packages:changed` will tell you which package will be affect by the next lerna publish / version [More...](https://github.com/lerna/lerna/tree/master/commands/changed#readme)
  - `yarn packages:diff` will show you all diff from last release [More...](https://github.com/lerna/lerna/tree/master/commands/diff#readme)
