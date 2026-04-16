/**
 * cart.js - Shopping Cart Logic using LocalStorage
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Add to Cart functionality (Products Page)
    const addBtnsList = document.querySelectorAll('.add-to-cart-btn');

    addBtnsList.forEach(btnNode => {
        btnNode.addEventListener('click', (e) => {
            const prodId = btnNode.getAttribute('data-id');
            const prodTitle = btnNode.getAttribute('data-title');
            const prodPrice = parseFloat(btnNode.getAttribute('data-price'));
            const prodImg = btnNode.getAttribute('data-img');

            insertToCart({ id: prodId, title: prodTitle, price: prodPrice, image: prodImg, quantity: 1 });

            // Quick visual feedback
            const oldTxt = btnNode.innerHTML;
            btnNode.innerHTML = '✓ Added';
            btnNode.classList.replace('btn-primary', 'btn-secondary');

            if (window.showAlert) {
                window.showAlert('product-alerts', `${prodTitle} added to cart!`, 'success');
            }

            setTimeout(() => {
                btnNode.innerHTML = oldTxt;
                btnNode.classList.replace('btn-secondary', 'btn-primary');
            }, 2000);
        });
    });

    // 2. Render Cart (Cart Page)
    if (document.getElementById('cart-items-list')) {
        drawCartView();

        // Setup checkout button mock
        const chkBtnEl = document.getElementById('checkout-btn');
        if (chkBtnEl) {
            chkBtnEl.addEventListener('click', () => {
                window.showAlert('cart-alert', 'Proceeding to checkout... (Backend integration required)', 'success');
            });
        }
    }
});

function fetchUserCart() {
    return JSON.parse(localStorage.getItem('minishop_cart')) || [];
}

function storeUserCart(cartData) {
    localStorage.setItem('minishop_cart', JSON.stringify(cartData));
    if (window.refreshCartCount) {
        window.refreshCartCount();
    }
}

function insertToCart(productObj) {
    let cList = fetchUserCart();

    // Check if exists
    const matchIdx = cList.findIndex(itm => itm.id === productObj.id);

    if (matchIdx > -1) {
        // Increase quantity
        cList[matchIdx].quantity += 1;
    } else {
        // Add new
        cList.push(productObj);
    }

    storeUserCart(cList);
}

function changeItemQty(itemId, newAmt) {
    let cList = fetchUserCart();
    const matchIdx = cList.findIndex(itm => itm.id === itemId);

    if (matchIdx > -1) {
        if (newAmt <= 0) {
            cList.splice(matchIdx, 1); // remove if 0
        } else {
            cList[matchIdx].quantity = parseInt(newAmt);
        }
        storeUserCart(cList);
        drawCartView();
    }
}

function deleteItemCart(itemId) {
    let cList = fetchUserCart();
    cList = cList.filter(itm => itm.id !== itemId);
    storeUserCart(cList);
    drawCartView();
}

function drawCartView() {
    const listWrapper = document.getElementById('cart-items-list');
    const sumBox = document.getElementById('cart-summary');
    const noItemsTxt = document.getElementById('empty-cart-msg');

    if (!listWrapper) return;

    let cList = fetchUserCart();

    if (cList.length === 0) {
        listWrapper.innerHTML = '';
        if (noItemsTxt) {
            listWrapper.appendChild(noItemsTxt.cloneNode(true));
        }
        sumBox.style.display = 'none';
        return;
    }

    // Show summary
    sumBox.style.display = 'block';

    let renderHtml = '';
    let currSub = 0;

    cList.forEach(itm => {
        const lineTot = itm.price * itm.quantity;
        currSub += lineTot;

        renderHtml += `
            <div class="cart-item">
                <img src="${itm.image}" alt="${itm.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${itm.title}</h4>
                    <p class="cart-item-price">$${itm.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-actions">
                    <input type="number" class="qty-input" value="${itm.quantity}" min="1" onchange="changeItemQty('${itm.id}', this.value)">
                    <button class="btn btn-danger" onclick="deleteItemCart('${itm.id}')">Remove</button>
                    <p style="font-weight:600; min-width:80px; text-align:right;">$${lineTot.toFixed(2)}</p>
                </div>
            </div>
        `;
    });

    listWrapper.innerHTML = renderHtml;

    // Update summary values
    const tRate = 0.10; // 10% tax
    const tAmt = currSub * tRate;
    const finalTot = currSub + tAmt;

    document.getElementById('cart-subtotal').textContent = `$${currSub.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tAmt.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${finalTot.toFixed(2)}`;
}
