// Login form handler
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        await initAPI();
        const result = await DataAPI.login(username, password);
        
        if (result.success) {
            setCurrentUser(result.user);
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password');
        }
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
});
