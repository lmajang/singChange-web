// const progressBar = document.getElementsByClassName('progress-bar')[0]
const progressBar = document.getElementById('changeProgressBar').children[0];
setInterval(() => {
  const computedStyle = getComputedStyle(progressBar)
  let width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
  if (width>99) width = 99
  progressBar.style.setProperty('--width', width + 1)

}, 1000)

console.log('================================')