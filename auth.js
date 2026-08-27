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
