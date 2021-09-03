import domtoimage from 'dom-to-image'
import FileSaver from 'file-saver'

interface Device {
  container: HTMLElement
  iframe: HTMLElement
  iframeBody: HTMLElement
  debug: HTMLElement
  ratio: number
}

interface Devices {
  desktop: Device
  tablet: Device
  mobile: Device
}

const pxToNumber = (px: string) => +px.substring(0, px.length - 2)

const devices: Devices = {
  desktop: {
    container: undefined,
    iframe: undefined,
    iframeBody: undefined,
    debug: undefined,
    ratio: 0.56,
  },
  tablet: {
    container: undefined,
    iframe: undefined,
    iframeBody: undefined,
    debug: undefined,
    ratio: 1.33,
  },
  mobile: {
    container: undefined,
    iframe: undefined,
    iframeBody: undefined,
    debug: undefined,
    ratio: 2.17,
  },
}
const deviceKeys = Object.keys(devices)

deviceKeys.forEach((name) => {
  devices[name].container = document.getElementById(name)
  devices[name].iframe = document.querySelector(`#${name} iframe`)
  devices[name].iframeBody = document.querySelector(`#${name} iframe body`)
  devices[name].debug = document.querySelector(`.debug .${name} .info`)
})

const handleResize = () => {
  const resizeDevice = (device: Device) => {
    const container = device.container
    const iframe = device.iframe
    const containerWidth = container.offsetWidth
    const iframeWidth = pxToNumber(getComputedStyle(iframe).width)
    const scale = containerWidth / iframeWidth

    const height = Math.round(containerWidth * device.ratio)

    container.style.height = `${height}px`
    iframe.style.transform = `scale(${scale})`
    device.debug.innerHTML = `${containerWidth} x ${height} - ${
      Math.round(scale * 100) / 100
    }`
  }

  deviceKeys.forEach((screenName) => {
    resizeDevice(devices[screenName])
  })
}

const takeScreenshot = () => {
  const savedScale = devices.desktop.iframe.style.transform
  devices.desktop.iframe.style.transform = 'none'
  const iframe = devices.desktop.iframe as HTMLIFrameElement
  domtoimage
    .toBlob(iframe.contentWindow.document.body)
    .then(function (dataUrl) {
      FileSaver.saveAs(dataUrl, 'desktop.png')
      devices.desktop.iframe.style.transform = savedScale
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error)
      devices.desktop.iframe.style.transform = savedScale
    })
}

const screenshotButton = document.getElementById('screenshot')
screenshotButton.onclick = takeScreenshot

window.onresize = handleResize
handleResize()
