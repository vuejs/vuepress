export function getStubComponent (name) {
  return {
    template: `<div class="${name}"><slot></slot></div>`
  }
}
