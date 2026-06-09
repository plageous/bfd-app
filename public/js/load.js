const form           = document.querySelector('.filter-form');
const searchInput    = document.getElementById('search');
const categorySelect = document.getElementById('category');
const sortSelect     = document.getElementById('sort');
const grid           = document.querySelector('.product-grid');
const productCount   = document.querySelector('.product-count');

console.log('form:', form);         // add this
console.log('grid:', document.querySelector('.product-grid')); // add this

// Intercept the form submit — use fetch() instead of a page reload
form.addEventListener('submit', (e) => {
    e.preventDefault();
    loadProducts();
});

// Also fire on dropdown changes without needing to hit Filter
categorySelect.addEventListener('change', loadProducts);
sortSelect.addEventListener('change', loadProducts);

function buildQueryString() {
    const params = new URLSearchParams();
    const name     = searchInput.value.trim();
    const category = categorySelect.value;
    const sort     = sortSelect.value;

    if (name) params.set('name', name);
    if (category)                    params.set('category', category);
    if (sort && sort !== 'featured') params.set('sort', sort);

    return params.toString();
}

async function loadProducts() {
    const qs  = buildQueryString();
    const url = `/api/products${qs ? '?' + qs : ''}`;
    console.log(url);
    const config = {
        method: 'get'
    };

    setLoading(true);
    try {
        const response = await fetch(url, config);

        if (response.ok) {
            // Converts response body to JSON
            const data = await response.json();
            console.log(data);

            // Display the product cards
            showProducts(data.products);
        } else {
            throw new Error(`API error: ${response.status}`);
        }
    } catch (err) {
        console.error('Failed to fetch products:', err);
        grid.innerHTML = '<p>Something went wrong. Please try again.</p>';
        productCount.textContent = '';
    } finally {
        setLoading(false);
    }
}

function showProducts(products) {
    productCount.textContent = `Showing ${products.length} products`;

    if (products.length === 0) {
        grid.innerHTML = '<p>No products match your filters.</p>';
        return;
    }

    // Build all cards first, then set innerHTML once — avoids flicker
    grid.innerHTML = products.map(product => `
        <article class="product-card">
            <img
                src="/${product.image_url}"
                alt="${escapeHtml(product.productName)}"
            />
            <h3>${escapeHtml(product.productName)}</h3>
            <p class="category">${escapeHtml(product.productType)}</p>
            <p class="price">$${Number(product.producePrice).toFixed(2)}</p>
            <a class="button secondary" href="/products/${product.id}">
                View Product
            </a>
        </article>
    `).join('');
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function setLoading(loading) {
    grid.style.opacity       = loading ? '0.4' : '1';
    grid.style.pointerEvents = loading ? 'none' : '';
}