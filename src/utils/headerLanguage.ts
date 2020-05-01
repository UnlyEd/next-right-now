export default function headerLookup(req) {
  let found;

  if (typeof req !== 'undefined') {
    const { headers } = req;
    if (!headers) return found;

    const locales = [];
    const acceptLanguage = headers['accept-language'];

    if (acceptLanguage) {
      const lngs = [];
      let i;
      let m;
      const rgx = /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi;

      do {
        m = rgx.exec(acceptLanguage);
        if (m) {
          const lng = m[1];
          const weight = m[5] || '1';
          const q = Number(weight);
          if (lng && !isNaN(q)) {
            lngs.push({ lng, q });
          }
        }
      } while (m);

      lngs.sort((a, b) => b.q - a.q);

      for (i = 0; i < lngs.length; i++) {
        locales.push(lngs[i].lng);
      }

      if (locales.length) found = locales;
    }
  }

  return found;
}
