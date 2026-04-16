/**
 * auth.js - Client-Side Form Validation for Login and Register
 */

document.addEventListener('DOMContentLoaded', () => {

    // Login Form Validation
    const logFormEl = document.getElementById('login-form');
    if (logFormEl) {
        logFormEl.addEventListener('submit', (e) => {
            e.preventDefault();

            let formOk = true;

            // Validate Email
            const emlField = document.getElementById('email');
            if (!isValidEmail(emlField.value)) {
                markEmailErr(emlField, true);
                formOk = false;
            } else {
                markEmailErr(emlField, false);
            }

            // Validate Password
            const passField = document.getElementById('password');
            if (passField.value.trim() === '') {
                passField.classList.add('is-invalid');
                formOk = false;
            } else {
                passField.classList.remove('is-invalid');
            }

            if (formOk) {
                // Mock successful login
                localStorage.setItem('isLoggedIn', 'true');
                window.showAlert('login-alert', 'Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                window.showAlert('login-alert', 'Please fix the errors in the form.', 'error');
            }
        });
    }

    // Registration Form Validation
    const regFormEl = document.getElementById('register-form');
    if (regFormEl) {
        regFormEl.addEventListener('submit', (e) => {
            e.preventDefault();

            let formOk = true;

            // Validate Name
            const nmField = document.getElementById('name');
            if (nmField.value.trim() === '') {
                nmField.classList.add('is-invalid');
                formOk = false;
            } else {
                nmField.classList.remove('is-invalid');
            }

            // Validate Email
            const emlFieldReg = document.getElementById('reg-email');
            if (!isValidEmail(emlFieldReg.value)) {
                markEmailErr(emlFieldReg, true);
                formOk = false;
            } else {
                markEmailErr(emlFieldReg, false);
            }

            // Validate Password
            const passFieldReg = document.getElementById('reg-password');
            if (passFieldReg.value.trim().length < 6) {
                passFieldReg.classList.add('is-invalid');
                formOk = false;
            } else {
                passFieldReg.classList.remove('is-invalid');
            }

            // Validate Confirm Password
            const confPassField = document.getElementById('confirm-password');
            if (confPassField.value !== passFieldReg.value || confPassField.value.trim() === '') {
                confPassField.classList.add('is-invalid');
                formOk = false;
            } else {
                confPassField.classList.remove('is-invalid');
            }

            if (formOk) {
                // Mock successful registration
                window.showAlert('register-alert', 'Account created successfully! Redirecting to login...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                window.showAlert('register-alert', 'Please fix the errors in the form.', 'error');
            }
        });
    }
});

// Helper Function for Email Validation
function isValidEmail(emailStr) {
    const rx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return rx.test(String(emailStr).toLowerCase());
}

function markEmailErr(inputNode, isBad) {
    if (isBad) {
        inputNode.classList.add('is-invalid');
    } else {
        inputNode.classList.remove('is-invalid');
    }
}
