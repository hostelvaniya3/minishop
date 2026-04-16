/**
 * main.js - General UI Enchancements
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobMenuBtn = document.getElementById('mobile-menu-btn');
    const navigation_links = document.getElementById('nav-links');

    if (mobMenuBtn && navigation_links) {
        mobMenuBtn.addEventListener('click', () => {
            navigation_links.classList.toggle('active');

            // Toggle icon
            if (navigation_links.classList.contains('active')) {
                mobMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            } else {
                mobMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            }
        });
    }

    // 3. Category Filtering
    const catFilters = document.querySelectorAll('.filter-btn');
    const prodCardsList = document.querySelectorAll('.product-card');

    if (catFilters.length > 0 && prodCardsList.length > 0) {
        catFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                catFilters.forEach(b => b.classList.remove('active'));
                // Add active to current
                btn.classList.add('active');

                const f_val = btn.getAttribute('data-filter');

                prodCardsList.forEach(card => {
                    if (f_val === 'all') {
                        card.style.display = 'flex';
                    } else if (card.getAttribute('data-category') === f_val) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 4. Update Cart Badge globally across all pages
    refreshCartCount();
});

// Expose globally so cart.js can call it when items are added/removed
window.refreshCartCount = function () {
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        let cart = JSON.parse(localStorage.getItem('minishop_cart')) || [];
        // Calculate total quantity of items
        const numItemsTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = numItemsTotal;

        // Hide badge if 0
        cartBadge.style.display = numItemsTotal > 0 ? 'flex' : 'none';
    }
};

window.checkAuthStatusNav = function () {
    const isUserLogged = localStorage.getItem('isLoggedIn') === 'true';
    const logLnk = document.querySelector('a[href="login.html"]');
    const regLnk = document.querySelector('a[href="register.html"]');

    if (isUserLogged) {
        if (logLnk && logLnk.parentElement) logLnk.parentElement.style.display = 'none';
        if (regLnk && regLnk.parentElement) regLnk.parentElement.style.display = 'none';

        // Add logout button if it doesn't exist
        const navigation_links = document.getElementById('nav-links');
        if (navigation_links && !document.getElementById('logout-btn')) {
            const li = document.createElement('li');
            li.innerHTML = '<a href="#" id="logout-btn">Logout</a>';
            navigation_links.insertBefore(li, navigation_links.lastElementChild); // Insert before Cart

            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                window.location.reload();
            });
        }
    }
};

// Run auth check on load
document.addEventListener('DOMContentLoaded', () => {
    window.checkAuthStatusNav();
});

// Utility function to show alerts dynamically
window.showAlert = function (containerId, msgText, msgType) {
    const alertBoxContainer = document.getElementById(containerId);
    if (!alertBoxContainer) return;

    alertBoxContainer.innerHTML = `<div class="alert alert-${msgType}">${msgText}</div>`;

    // Auto clear after 5 seconds
    setTimeout(() => {
        alertBoxContainer.innerHTML = '';
    }, 5000);
};
