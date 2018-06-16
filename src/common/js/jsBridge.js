function checkNavigator (Navigator) {
  if (/android/i.test(Navigator)) {
    return 'android'
  } else if (/(iPhone|iPad|iPod|iOS)/i.test(Navigator)) {
    return 'iOS'
  } else {
    return 'other'
  }
}

function registerWindow (name, content) { //   添加Window方法
  window[name] = content
  console.log(window)
  return name
}

export function jsBridge (param, callbackName, appFun, callbackJs, category) {
  const navigatorCategory = navigator.userAgent
  const params = JSON.stringify({
    data: param,
    callback: registerWindow(callbackName, callbackJs)
  })
  if (checkNavigator(navigatorCategory) === 'android') {
    window.android[appFun](params)
  } else if (checkNavigator(navigatorCategory) === 'iOS') {
    window.webkit.messageHandlers[appFun].postMessage(params)
  } else {
    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.imake.android'
  }
}
