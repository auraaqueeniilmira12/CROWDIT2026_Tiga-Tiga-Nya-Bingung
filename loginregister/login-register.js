function showToast(msg, type) {
    let c = document.querySelector('.toast-area');
    if (!c) { c = document.createElement('div'); c.className = 'toast-area'; c.style.cssText = 'position:fixed;bottom:30px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:8px;'; document.body.appendChild(c); }
    const t = document.createElement('div');
    const bg = type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : '#007260';
    t.style.cssText = `background:${bg};color:white;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,0.15);`;
    t.textContent = msg; c.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function handleLogin(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('email')?.value?.trim();
    const password = document.getElementById('password')?.value;
    if (!email || !password) { showToast('Email dan password wajib diisi', 'error'); return; }
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        showToast('Login berhasil! Selamat datang, ' + user.name, 'success');
        setTimeout(() => window.location.href = '../index.html', 1000);
    } else {
        showToast('Email atau password salah', 'error');
    }
}

function handleRegister(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('name')?.value?.trim();
    const email = document.getElementById('email')?.value?.trim();
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirm-password')?.value;
    if (!name || !email || !password) { showToast('Semua field wajib diisi', 'error'); return; }
    if (password !== confirmPassword) { showToast('Password tidak cocok', 'error'); return; }
    if (password.length < 6) { showToast('Password minimal 6 karakter', 'error'); return; }
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (users.find(u => u.email === email)) { showToast('Email sudah terdaftar', 'error'); return; }
    const newUser = { name, email, password, joinedDate: new Date().toISOString(), photo: null, weight: null, height: null, age: null, gender: null, goal: null };
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showToast('Registrasi berhasil! Selamat datang, ' + name, 'success');
    setTimeout(() => window.location.href = '../index.html', 1200);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.login-form, form[id="loginForm"]')?.addEventListener('submit', handleLogin);
    document.querySelector('.register-form, form[id="registerForm"]')?.addEventListener('submit', handleRegister);
    document.getElementById('btnLogin')?.addEventListener('click', handleLogin);
    document.getElementById('btnRegister')?.addEventListener('click', handleRegister);
    document.getElementById('togglePassword')?.addEventListener('click', function() {
        const pw = document.getElementById('password');
        pw.type = pw.type === 'password' ? 'text' : 'password';
        this.querySelector('i')?.classList.toggle('fa-eye');
        this.querySelector('i')?.classList.toggle('fa-eye-slash');
    });
});
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
