document.addEventListener("DOMContentLoaded", () => {
    // Check if the user is logged in and load their data
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!user) {
        alert('Please log in first');
        window.location.href = 'login.html'; // Redirect to login if no user is logged in
        return;
    }

    // Set up the meal tracker
    const mealCost = 60; // Cost per meal
    const daysInMonth = 31; // Number of days in the month (can be dynamically adjusted based on the month)

    // Load meals data from localStorage if available
    let mealsTracker = JSON.parse(localStorage.getItem(user.username + '_mealsTracker')) || Array(daysInMonth).fill(null);

    // Generate the calendar
    generateCalendar();

    // Update summary based on meals data
    updateSummary();

    // Function to generate the calendar dynamically
    function generateCalendar() {
        const calendarContainer = document.querySelector('.calendar');
        calendarContainer.innerHTML = ''; // Clear previous calendar

        for (let i = 0; i < daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.innerText = i + 1;
            dayDiv.onclick = () => toggleMeal(i); // Toggle meal on click

            // Set initial class based on meal status
            if (mealsTracker[i] === true) {
                dayDiv.classList.add('selected'); // Meal purchased (green)
            } else if (mealsTracker[i] === false) {
                dayDiv.classList.add('unselected'); // Meal missed (red)
            } else {
                dayDiv.classList.add('default'); // Default state (white)
            }

            calendarContainer.appendChild(dayDiv);
        }
    }

    // Toggle meal status for a specific day
    function toggleMeal(day) {
        const dayDiv = document.querySelectorAll('.day')[day];

        // Toggle the meal status between: null (not updated) -> false (missed) -> true (purchased) -> null
        if (mealsTracker[day] === null) {
            // First click, mark as purchased (green)
            mealsTracker[day] = true;
            dayDiv.classList.add('selected');  // Green for purchased
            dayDiv.classList.remove('unselected', 'default'); // Remove red and white states
        } else if (mealsTracker[day] === false) {
            // Second click, mark as missed (red)
            mealsTracker[day] = true;
            dayDiv.classList.add('selected');  // Green for purchased
            dayDiv.classList.remove('unselected', 'default'); // Remove red and white states
        } else if (mealsTracker[day] === true) {
            // Third click, reset to default (white)
            mealsTracker[day] = null;
            dayDiv.classList.remove('selected', 'unselected'); // Remove green and red
            dayDiv.classList.add('default'); // White for not updated
        }

        updateSummary(); // Update the summary after toggling the meal
        saveUserData(); // Save the updated meals data to localStorage
    }

    // Update the summary (total meals and cost)
    function updateSummary() {
        const totalMeals = mealsTracker.filter(day => day === true).length; // Count meals (true values)
        const totalCost = totalMeals * mealCost;

        document.getElementById('totalMeals').textContent = totalMeals;
        document.getElementById('totalCost').textContent = totalCost;
    }

    // Save user data in localStorage (mealsTracker)
    function saveUserData() {
        localStorage.setItem(user.username + '_mealsTracker', JSON.stringify(mealsTracker)); // Save meal data to localStorage
    }

    // Reset the tracker to the beginning of the month
    document.querySelector('.reset-btn').addEventListener('click', resetTracker);

    function resetTracker() {
        mealsTracker = Array(daysInMonth).fill(null); // Reset all days to "not updated"
        const allDays = document.querySelectorAll('.day');
        allDays.forEach(dayDiv => {
            dayDiv.classList.remove('selected', 'unselected', 'default');
            dayDiv.classList.add('default'); // Add the default class (white)
        });

        updateSummary(); // Update the summary after reset
        saveUserData(); // Save reset data to localStorage
    }

    // Logout function to clear sessionStorage and redirect to login page
    function logout() {
        sessionStorage.removeItem('loggedInUser'); // Clear logged in user data from sessionStorage
        window.location.href = 'login.html'; // Redirect to login page
    }

    // Add event listener to logout button
    const logoutButton = document.querySelector('.logout-btn'); // Change class for logout button
    if (logoutButton) {
        logoutButton.addEventListener('click', logout); // Add logout functionality to the button
    }
});
