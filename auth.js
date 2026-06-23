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
document.addEventListener('DOMContentLoaded', function() {
  if (sessionStorage.getItem('casa_auth') === '1') {
    document.getElementById('pw-screen').style.display = 'none';
    document.getElementById('site').style.display = 'block';
  }
  const inp = document.getElementById('pw-input');
  if (inp) {
    inp.focus();
    inp.addEventListener('keydown', function(e) { if (e.key === 'Enter') checkPw(); });
  }
});
