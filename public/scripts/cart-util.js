const addToCartButton = document.querySelector('#product-details button');
const cartBadges = document.querySelectorAll('.nav-items .badge');

async function addToCart(){
    const productId = addToCartButton.dataset.productid;
    const csrfToken = addToCartButton.dataset.csrf;
    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                productId: productId,
                _csrf: csrfToken,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch(error){
        alert('Something went wrong!')
        return;
    }

    if (!response.ok){
        alert('Something went wrong!')
        return;
    }

    const responseData = await response.json();
    const newTotalQuantity = responseData.newTotalItems;

    for(const cartBadge of cartBadges) {
        cartBadge.textContent = newTotalQuantity;
    }
}

addToCartButton.addEventListener('click', addToCart);