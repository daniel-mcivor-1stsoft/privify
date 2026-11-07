// First-party sign-up attribution, with nothing stored on the visitor's device.
//
// On arrival from another site we note only that site's name (e.g. "google")
// and the page they landed on, then add them to this page's own links as
// ?src=&lp=. They travel with the visitor through the site in the URL and reach
// the app only if they click through to sign up. No cookies, no localStorage,
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

    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var raw = a.getAttribute('href');
      if (!raw || raw.charAt(0) === '#' || /^(mailto|tel|javascript):/i.test(raw)) continue;
      var u;
      try { u = new URL(raw, location.href); } catch (e) { continue; }
      if (u.hostname !== HOST && u.hostname !== 'app.' + HOST) continue;
      for (var j = 0; j < keys.length; j++) {
        if (!u.searchParams.has(keys[j])) u.searchParams.set(keys[j], carry[keys[j]]);
      }
      a.setAttribute('href', u.toString());
    }
  } catch (e) { /* never break the page */ }
})();
