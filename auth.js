// Authentication management
const AUTH_KEY = 'ppl_auth';

// Get current user
function getCurrentUser() {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
}

// Set current user
function setCurrentUser(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

// Logout
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'login.html';
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Check if user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Protect page (redirect to login if not authenticated)
function protectPage() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Update UI based on user role
function updateUIForRole() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Update user info in navbar
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.innerHTML = `
            <span class="user-name">${user.username}</span>
            <span class="user-role">${user.role === 'admin' ? '👑 Admin' : '👤 User'}</span>
            <button class="btn-logout" onclick="logout()">Logout</button>
        `;
    }
    
    // Show/hide admin-only elements
    const adminElements = document.querySelectorAll('.admin-only');
    adminElements.forEach(el => {
        el.style.display = isAdmin() ? 'block' : 'none';
    });
    
    // Disable edit buttons for non-admins
    if (!isAdmin()) {
        const editButtons = document.querySelectorAll('.btn-edit, .btn-delete, .admin-action');
        editButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
    }
}

// Initialize auth on page load
function initAuth() {
    // Don't protect login page
    if (window.location.pathname.includes('login.html')) {
        // Redirect to index if already logged in
        if (isLoggedIn()) {
            window.location.href = 'index.html';
        }
        return;
    }
    
    // Protect all other pages
    if (protectPage()) {
        updateUIForRole();
    }
}
