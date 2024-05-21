const sanitizeCookieValue = (value) => {
  return value.replace(/[^!#$%&'()*+\-./:<=>?@[\]^_`{|}~\w\s]/g, '');
};

const sanitizeCookies = (cookieRaw) => {
  return cookieRaw
    .split(';')
    .map((cookie) => {
      const [key, value] = cookie.split('=');
      return `${key.trim()}=${sanitizeCookieValue(value.trim())}`;
    })
    .join('; ');
};

module.exports = sanitizeCookies;
