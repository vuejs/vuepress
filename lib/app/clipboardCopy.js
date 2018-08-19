
import { copyToClipboard } from './util'

const generateCopyButton = (parent) => {
  if (parent.classList.contains('codecopy-enabled')) return

  const copyElement = document.createElement('span')
  copyElement.className = 'code-copy'
  copyElement.title = 'Click to copy to clipboard'
  copyElement.addEventListener('click', () => {
    copyToClipboard(parent.innerText)
  })
  parent.appendChild(copyElement)
  parent.classList.add('codecopy-enabled')
}

export function enableCbCopy () {
  const codeBlocks = document.querySelectorAll('div[class*="language-"] pre')
  codeBlocks.forEach(generateCopyButton)
}
