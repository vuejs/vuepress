/**
 * Convert paths string to real-world import code.
 */

export function pathsToModuleCode (files: string[]) {
  let index = 0
  let code = ''

  code += files
    .map(filePath => `import m${index++} from ${JSON.stringify(filePath)}`)
    .join('\n')

  code += '\n\nexport default [\n'

  for (let i = 0; i < index; i++) {
    code += `  m${i}`
    code += i === index - 1 ? '\n' : ',\n'
  }

  code += ']\n'

  return code
}
