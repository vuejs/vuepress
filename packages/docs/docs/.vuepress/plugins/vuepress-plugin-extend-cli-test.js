module.exports = {
  name: 'vuepress-plugin-extend-cli-test',

  extendCli (cli) {
    cli
      .command('view-info [targetDir]', '')
      .allowUnknownOptions()
      .option('--debug', 'display info in debug mode')
      .action((dir = '.') => {
        console.log('Display info of your website')
      })
  }
}
