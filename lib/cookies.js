import cookie from 'cookie'

export const parseCookies = (req, opt = {}) => {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, opt)
}

export const setCookies = (ctx, cookies, opt = {}) => {
  const options = Object.assign({ maxAge: 7 * 24 * 60 * 60 * 1000, path: '/' })

  const newCookies = []
  for (let i in cookies) {
    newCookies.push(cookie.serialize(i, cookies[i], options))
  }

  if (ctx.res) {
    ctx.req.headers.cookies = newCookies.join(';')
    ctx.res.setHeader('Set-Cookie', newCookies)
  } else {
    newCookies.forEach((co) => { document.cookie = co })
  }
}

export const removeCookies = (ctx, cookiesNames) => {
  const cookies = cookiesNames.reduce((acc, cur) => {
    acc[cur] = ''
    return acc
  }, {})
  setCookies(ctx, cookies, { maxAge: -1 })
}