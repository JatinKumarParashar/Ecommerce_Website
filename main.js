const container = document.getElementById('Ecomerce');
const img = document.querySelectorAll('img');
const cartItem = document.querySelector('.cart-items');

console.log('123', container);
console.log('456', img);

container.addEventListener('mousemove', (e) => {
   // console.log('Jatin')
    for (let i = 0; i < img.length; i++) {
        //console.log('In the loop')
        if (e.target == img[i]) { 
           // console.log('789',img[i]);
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            img[i].style.transformOrigin = `${x}px ${y}px`;
            img[i].style.transform = 'scale(1.5)';
        }
        if (e.target != img[i]) {
            img[i].style.transformOrigin = "center center";
            img[i].style.transform = "scale(1)";
        }

    }
});


container.addEventListener('click', (e) => {
    if (e.target.className=='shop-item-button'){
        const prodId = Number(e.target.parentNode.parentNode.id.split('-')[1]);
        axios.post('http://localhost:3000/cart', { productId: prodId}).then(data => {
            if(data.data.error){
                throw new Error('Unable to add product');
            }
            showNotification(data.data.message, false);
        })
        .catch(err => {
            console.log(err);
            showNotification(err, true);
        });

    }
    if (e.target.className == 'cart-button' || e.target.className == 'cart-holder') {
        console.log('123', e.target.classList);
        axios.get('http://localhost:3000/cart').then(products => {
            console.log('8015', products.data);
            cartItem.innerHTML="";
            document.querySelector('.cart-number').innerText=0;
            for (let i = 0; i < products.data.length; i++) {
                showProductInCart(products.data[i]);

            }
        })
        document.querySelector('#cart').style = "display:block;"
    }
    if (e.target.className == 'cancle') {
        console.log('456', e.target.className);
        document.querySelector('#cart').style = "display:none;"
    }

    if (e.target.className == 'purchase-button') {
        if (parseInt(document.querySelector('.cart-number').innerText) === 0) {
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        axios.post('http://localhost:3000/delete-cart')
        alert('Thanks for the purchase')
        cartItem.innerHTML = ""
        document.querySelector('.cart-number').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }
   
})

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/shop').then((data) => {
        console.log('123', data.data);
        for (let i = 0; i < data.data.length; i++) {
            showOnScreen(data.data[i]);
        }
    })
})

function showOnScreen(data) {
    const parent = document.getElementById('music-content');

    const child = `<div id="product-${data.id}">
    <h3>${data.title}</h3>
    <div class="image-container">
        <img src="${data.image}" alt="">
    </div>
    <div class="prod-details">
        <span> $
            <span>${data.price}</span>
        </span>
        <button class="shop-item-button" type="button">ADD TO CART</button>

    </div>

</div>`;
    console.log('456', child)

    parent.innerHTML += child;

}

function showProductInCart(product) {


    let total_cart_price = document.querySelector('#total-value').innerText;


    document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText) + 1
    total_cart_price = parseFloat(total_cart_price) + parseFloat(product.price)
    total_cart_price = total_cart_price.toFixed(2)
    document.querySelector('#total-value').innerText = `${total_cart_price}`;
    const item = document.createElement('div');
    item.setAttribute('id', `in-cart-${product.id}`);
    item.innerHTML = `  <span class='cart-item cart-column'>
    <img class='cart-img' src="${product.image}" alt="">
        <span>${product.title}</span>
    </span>
    <span class='cart-price cart-column'>${product.price}</span>
    <form onsubmit='deleteCartItem(event, ${product.id})' class='cart-quantity cart-column'>
        <input type="text" value="1">
        <button>REMOVE</button>
    </form>`;
    cartItem.appendChild(item);

}


function deleteCartItem(e, prodId){
    e.preventDefault();
    console.log(prodId);
    axios.post('http://localhost:3000/cart/delete-item', {productId: prodId})
        .then(() => removeElementFromCartDom(prodId))
}



function removeElementFromCartDom(prodId){
    document.getElementById(`in-cart-${prodId}`).remove();
    showNotification('Succesfuly removed product')
}


function showNotification(message, iserror){
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.style.backgroundColor = iserror ? 'red' : 'green';
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message}<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500)
}
