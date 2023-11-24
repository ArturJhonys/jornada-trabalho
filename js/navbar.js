const getCookie = (name) => {
    let key = name + "="
    let value = ''
    decodeURIComponent(document.cookie)
    .split(';')
    .forEach(c => {
      while (c.charAt(0) == ' ')
        c = c.substring(1)
  
      if (c.indexOf(key) == 0)
        value = c.substring(key.length, c.length)
    })
    return value
  }
  
  const cookieTheme = getCookie("theme")
  const theme = cookieTheme !== '' ? cookieTheme : 'light'
  
  document.addEventListener("DOMContentLoaded", () => { 
    ToggleDarkMode(theme)
  })
  
  const ToggleDarkMode = (theme) => {
    document.body.className = ''
    document.body.classList.add(theme)
    setCookie("theme", theme, 365)
  }
  
  const setCookie = (name, value, expiration) => {
    const d = new Date()
    d.setTime(d.getTime() + (expiration * 24 * 60 * 60 * 1000))
    let expires = "expires=" + d.toUTCString()
    document.cookie = name + "=" + value + ";" + expires + ";path=/"
  }