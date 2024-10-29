"use strict";

document.getElementById("regForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Clear previous error messages
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passError").textContent = "";
    document.getElementById("conPassError").textContent = "";
    document.getElementById("termsError").textContent = "";

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    let valid = true;

    // Validate name
    if (!name) {
        document.getElementById("nameError").textContent = "Name is required.";
        valid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById("emailError").textContent = "Email is required.";
        valid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        valid = false;
    }

    // Validate password
    if (password.length < 6) {
        document.getElementById("passError").textContent = "Password must be at least 6 characters long.";
        valid = false;
    }

    // Confirm password
    if (password !== confirmPassword) {
        document.getElementById("conPassError").textContent = "Passwords do not match.";
        valid = false;
    }

    // Validate terms and conditions checkbox
    if (!terms) {
        document.getElementById("termsError").textContent = "You must agree to the Terms and Conditions.";
        valid = false;
    }

    if (valid) {
        // Get existing users from local storage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check for duplicate email
        if (users.some(user => user.email === email)) {
            document.getElementById("emailError").textContent = "Email is already registered.";
            document.getElementById("emailError").style.color = "red";
            return; // Stop the function here if the email already exists
        }

        // Create new user object
        const newUser = {
            name: name,
            email: email,
            password: password // Note: In production, hash the password before storing
        };

        // Add new user to the array
        users.push(newUser);

        // Store updated users array in local storage
        localStorage.setItem("users", JSON.stringify(users));

        // Optionally show a success message or redirect
        alert("Registration successful!");
        window.location.href = './login.html'; // Redirect to login page after successful registration
    }
});

// Apply red color to error messages via CSS
const errorSpans = document.querySelectorAll("span[id$='Error']");
errorSpans.forEach(span => {
    span.style.color = "red";
});
