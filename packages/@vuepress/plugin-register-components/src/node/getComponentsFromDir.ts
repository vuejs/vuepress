import { globby, path } from '@vuepress/utils'
import type { RegisterComponentsPluginOptions } from './registerComponentsPlugin'

export const getComponentsFromDir = async ({
  componentsDir,
  componentsPatterns,
  getComponentName,
}: Omit<RegisterComponentsPluginOptions, 'components'>): Promise<
  Record<string, string>
> => {
  if (!componentsDir) {
    return {}
  }

  // get all matched component files
  const componentsDirFiles = await globby(componentsPatterns, {
    cwd: componentsDir,
  })

  // transform files to name => filepath map
  return Object.fromEntries(
    componentsDirFiles.map((filename) => [
      getComponentName(filename),
      path.resolve(componentsDir, filename),
    ])
  )
}
