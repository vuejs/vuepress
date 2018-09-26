import { Md, getFragment } from './util'
import containers from '../lib/containers.js'

const mdC = Md().use(containers)

describe('containers', () => {
  const containerLabels = ['tip', 'tip-override', 'warning', 'danger', 'v-pre']
  containerLabels.forEach(label => {
    test(label, async () => {
      const input = await getFragment(`container-${label}`)
      const output = mdC.render(input)
      expect(output).toMatchSnapshot()
    })
  })
})
