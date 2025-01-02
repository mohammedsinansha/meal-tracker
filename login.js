document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = localStorage.getItem(username);

    if (userData) {
        const user = JSON.parse(userData);

        if (user.password === password) {
            // Store user session data
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'main.html'; // Redirect to meal tracker page
        } else {
            alert('Incorrect password');
        }
    } else {
        alert('Username not found');
    }
});
