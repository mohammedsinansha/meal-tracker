document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    if (localStorage.getItem(username)) {
        alert('Username already exists.');
    } else {
        // Store the user data
        const user = { username, password, meals: 0, totalCost: 0 };
        localStorage.setItem(username, JSON.stringify(user));
        alert('Registration successful! Please login.');
        window.location.href = 'index.html'; // Redirect to login page
    }
});
