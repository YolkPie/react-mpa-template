(function resetRem (doc, win) {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

  function recalc () {
    const designWidth = 750
    const clientWidth = docEl.clientWidth || window.screen.width
    if (!clientWidth) return
    docEl.style.fontSize = `${(100 * clientWidth) / designWidth}px`
  }

  if (!doc.addEventListener) return
  recalc()
  win.addEventListener(resizeEvt, recalc, false)
}(document, window))
