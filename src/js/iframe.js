const heightOutput = document.querySelector('#height')
const widthOutput = document.querySelector('#width')

function getWindowSize() {
  heightOutput.textContent = window.innerHeight
  widthOutput.textContent = window.innerWidth
}

window.onresize = getWindowSize
getWindowSize()
