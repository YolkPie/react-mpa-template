// 全局cid ++
let cid = 1

// build params to queryString
function buildParams (params) {
  const result = []

  Object.keys(params).forEach(item => {
    result.push(`${encodeURIComponent(item)}=${encodeURIComponent(params[item])}`)
  })

  return result.join('&')
}

const jsonpAdapter = (config) => new Promise((resolve, reject) => {
  let script = document.createElement('script')
  let src = config.url

  if (config.params) {
    const params = buildParams(config.params)

    if (params) {
      src += (src.indexOf('?') >= 0 ? '&' : '?') + params
    }
  }

  script.async = true

  // eslint-disable-next-line no-plusplus
  const jsonp = `axiosJsonpCallback${cid++}`
  const old = window[jsonp]
  let isAbort = false

  window[jsonp] = (responseData) => {
    window[jsonp] = old

    if (isAbort) {
      return
    }

    resolve({ data: responseData, status: 200 })
  }

  const additionalParams = {
    _: new Date().getTime()
  }

  additionalParams[config.callbackParamName || 'callback'] = jsonp

  src += (src.indexOf('?') >= 0 ? '&' : '?') + buildParams(additionalParams)

  script.onreadystatechange = () => {
    if (!script.readyState || /loaded|complete/.test(script.readyState)) {
      script.onload = null
      script.onreadystatechange = null

      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }

      script = null
    }
  }
  script.onload = script.onreadystatechange

  script.onerror = (err) => {
    script.onerror = null

    if (script.parentNode) {
      script.parentNode.removeChild(script)
    }

    reject(err)
  }

  if (config.cancelToken) {
    config.cancelToken.promise.then(cancel => {
      if (!script) {
        return
      }

      isAbort = true
      reject(cancel)
    })
  }

  script.src = src

  document.head.appendChild(script)
})

export default jsonpAdapter
