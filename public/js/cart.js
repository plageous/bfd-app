async function loadCart() {
    const res = await fetch('/api/cart');
    const data = await res.json();
    renderCart(data.cart);
}

async function addToCart(btn) {
    const productId = Number(btn.dataset.id);
    const productName = btn.dataset.name;
    const producePrice = Number(btn.dataset.price);
    const image_url = btn.dataset.image;

    const res = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, productName, producePrice, image_url })
    });
    const data = await res.json();
    renderCart(data.cart);
}

async function removeFromCart(productId) {
    const res = await fetch(`/api/cart/items/${productId}`, { method: 'DELETE' });
    const data = await res.json();
    renderCart(data.cart);
}

async function clearCart() {
    const res = await fetch('/api/cart/clear', { method: 'POST' });
    const data = await res.json();
    renderCart(data.cart);
}

function renderCart(cart) {
    const panel = document.getElementById('cart-panel');
    if (!panel) return;

    if (cart.length === 0) {
        panel.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.producePrice * item.quantity, 0);

    panel.innerHTML = `
        <ul class="cart-list">
            ${cart.map(item => `
                <li class="cart-item">
                    <span class="cart-name">${escapeHtml(item.productName)}</span>
                    <span class="cart-qty">x${item.quantity}</span>
                    <span class="cart-price">$${(item.producePrice * item.quantity).toFixed(2)}</span>
                    <button class="button secondary small" onclick="removeFromCart(${item.productId})">Remove</button>
                </li>
            `).join('')}
        </ul>
        <p class="cart-total"><strong>Total: $${total.toFixed(2)}</strong></p>
        <button class="button secondary" onclick="clearCart()">Clear Cart</button>
    `;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', loadCart);