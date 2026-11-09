// First-party sign-up attribution, with nothing stored on the visitor's device.
//
// On arrival from another site we note only that site's name (e.g. "google")
// and the page they landed on. When a visitor follows one of our links they're
// added to it as ?src=&lp=, then removed from the address bar on the next page,
// so they reach the app only if the visitor clicks through to sign up. No cookies, no localStorage,
// no third parties, nothing sent anywhere by this script.
(function () {
  try {
    var HOST = 'privify.co.uk';
    var here = new URLSearchParams(location.search);
    var carry = {};

    ['src', 'lp', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach(function (k) {
      var v = here.get(k);
      if (v) carry[k] = v.slice(0, 120);
    });

    if (!carry.src && !carry.utm_source && !carry.gclid) {
      var ref = '';
      try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) {}
      ref = ref.replace(/^www\./, '').toLowerCase();
      if (ref === HOST || ref.slice(-HOST.length - 1) === '.' + HOST) return; // moving within our own site
      // Site name only: "google.co.uk" -> "google", "old.reddit.com" -> "reddit"
      var parts = ref.split('.');
      var name = ref ? (parts.length > 2 && /^(co|com|org|net|ac|gov)$/.test(parts[parts.length - 2])
        ? parts[parts.length - 3] : parts[parts.length - 2]) : 'direct';
      carry.src = (name || 'direct').replace(/[^a-z0-9-]/g, '').slice(0, 40) || 'direct';
      carry.lp = location.pathname.slice(0, 120);
    }

    var keys = Object.keys(carry);
    if (!keys.length) return;

    // Tidy the address bar: the values now live in this page's memory only,
    // so the visible URL stays clean and anything copied or shared is plain.
    if (keys.some(function (k) { return here.has(k); })) {
      keys.forEach(function (k) { here.delete(k); });
      var qs = here.toString();
      try { history.replaceState(history.state, '', location.pathname + (qs ? '?' + qs : '') + location.hash); } catch (e) {}
    }

    // Add the values to a link only at the moment it's followed, so search
    // engines and the page source only ever see clean URLs.
    function decorate(ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
      if (!a) return;
      var raw = a.getAttribute('href');
      if (!raw || raw.charAt(0) === '#' || /^(mailto|tel|javascript):/i.test(raw)) return;
      var u;
      try { u = new URL(raw, location.href); } catch (e) { return; }
      if (u.hostname !== HOST && u.hostname !== 'app.' + HOST) return;
      if (u.pathname === location.pathname && u.hostname === location.hostname && u.hash) return; // same-page anchor
      for (var j = 0; j < keys.length; j++) {
        if (!u.searchParams.has(keys[j])) u.searchParams.set(keys[j], carry[keys[j]]);
      }
      a.setAttribute('href', u.toString());
    }
    document.addEventListener('click', decorate, true);
    document.addEventListener('auxclick', decorate, true);
  } catch (e) { /* never break the page */ }
})();
