import { useState, useEffect, useCallback } from 'react'

// useGetClient 自定义hooks, 获取window width height
export const useGetClient = () => {
  // 获取window width, height
  const getClient = () => ({
    windowWidth: window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth,
    windowHeight: window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight
  })

  const [client, setClient] = useState({ ...getClient() })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onResize = useCallback(() => {
    setClient({ ...getClient() })
  })

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return client
}

// getClient 兼容的获取window width height
export const getClient = () => ({
  width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
})

// getScrollTop 兼容的获取scrolltop
export const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop
