const PASSWORD = "auenbeach";

function checkPw() {
  const val = document.getElementById('pw-input').value.trim().toLowerCase();
  if (val === PASSWORD) {
    sessionStorage.setItem('casa_auth', '1');
    document.getElementById('pw-screen').style.display = 'none';
    document.getElementById('site').style.display = 'block';
  } else {
    document.getElementById('pw-error').style.display = 'block';
    document.getElementById('pw-input').value = '';
    document.getElementById('pw-input').focus();
  }
}

document.getElementById('pw-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') checkPw();
});

function unlockSite() {
  document.getElementById('pw-screen').style.display = 'none';
  document.getElementById('site').style.display = 'block';
}

// If this page was opened from the kiosk iPad (?kiosk=1), remember that
// permanently on this device so the password is never shown here again.
const params = new URLSearchParams(window.location.search);
if (params.get('kiosk') === '1') {
  localStorage.setItem('casa_kiosk_device', '1');
}

// Skip the password screen if this device has already been marked as the
// kiosk, or if the guest already unlocked the site earlier this session.
if (localStorage.getItem('casa_kiosk_device') === '1' || sessionStorage.getItem('casa_auth') === '1') {
  unlockSite();
} else {
  document.getElementById('pw-input').focus();
}

// On the kiosk iPad only: return to the kiosk landing page after 2 minutes
// of no touches/clicks/scrolling, so it doesn't sit open on a guest's page.
if (localStorage.getItem('casa_kiosk_device') === '1') {
  const IDLE_LIMIT_MS = 2 * 60 * 1000; // 2 minutes
  let idleTimer;
  function returnToKiosk() {
    window.location.href = 'kiosk.html';
  }
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(returnToKiosk, IDLE_LIMIT_MS);
  }
  ['click', 'touchstart', 'mousemove', 'keydown', 'scroll'].forEach(function (evt) {
    document.addEventListener(evt, resetIdleTimer, { passive: true });
  });
  resetIdleTimer();

  // Also return to the kiosk landing page immediately whenever the app is
  // reopened from the Home Screen after being backgrounded (Home button,
  // then tap the Casa Cara icon again). Backgrounding suspends this page
  // rather than reloading it, so without this it would just resume on
  // whatever guest guide page it was left on. visibilitychange only fires
  // this way on a genuine foreground-resume of an already-loaded page, not
  // on a normal in-site navigation (tapping a nav link loads a fresh page
  // that starts out visible, so no transition event fires).
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      returnToKiosk();
    }
  });
}
