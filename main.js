const container = document.getElementById('Ecomerce');
const img = document.querySelectorAll('img');
const cartItem = document.querySelector('.cart-items');

console.log('123', container);
console.log('456', img);

container.addEventListener('mousemove', (e) => {
    //console.log('Jatin')
    for (let i = 0; i < img.length; i++) {
        // console.log('In the loop')
        if (e.target == img[i]) {
            // console.log('789',img[i]);
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            img[i].style.transformOrigin = `${x}px ${y}px`;
            img[i].style.transform = 'scale(1.1)';
        }
        if (e.target != img[i]) {
            img[i].style.transformOrigin = "center center";
            img[i].style.transform = "scale(1)";
        }

    }
});


container.addEventListener('click', (e) => {
    if (e.target.classList == 'shop-item-button') {
        console.log('button has been clicked');
        const firstParent = e.target.parentElement;
        const ParentOfParent = firstParent.parentElement.id;
        console.log('THis is first parent sibiling elemtnt', ParentOfParent);
        console.log('456', document.querySelector(`#${ParentOfParent} h3`));
        const title = document.querySelector(`#${ParentOfParent} h3`).innerText;
        console.log('789', title);
        const src = document.querySelector(`#${ParentOfParent} div`).firstElementChild.src;
        console.log('9027261589', src);
        const price = e.target.parentElement.firstElementChild.firstElementChild.innerText;
        console.log('789', price);
        console.log('123', cartItem);
        let total_cart_price = document.querySelector('#total-value').innerText;
        
        if (document.querySelector(`#in-cart-${ParentOfParent}`)) {
            alert('This item is already added to the cart');
            return
        }
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        total_cart_price = total_cart_price.toFixed(2)
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        const item = document.createElement('div');
        item.setAttribute('id', `in-cart-${ParentOfParent}`);
        item.innerHTML = `<span class='cart-item cart-column'>
        <img class='cart-img' src="${src}" alt="">
            <span>${title}</span>
    </span>
    <span class='cart-price cart-column'>${price}</span>
    <span class='cart-quantity cart-column'>
        <input type="text" value="1">
        <button>REMOVE</button>
    </span>`;
        cartItem.appendChild(item);
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>Your Product : <span>${title}</span> is added to the cart<h4>`;
        console.log('Kumar', notification);
        container.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 2500)
    }
    if (e.target.className == 'cart-button'|| e.target.className=='cart-holder') {
        console.log('123', e.target.classList);
        document.querySelector('#cart').style = "display:block;"
    }
    if (e.target.className == 'cancle') {
        console.log('456', e.target.className);
        document.querySelector('#cart').style = "display:none;"
    }

    if (e.target.className=='purchase-button'){
        if (parseInt(document.querySelector('.cart-number').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        alert('Thanks for the purchase')
        cartItem.innerHTML = ""
        document.querySelector('.cart-number').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }
    if (e.target.innerText=='REMOVE'){
        let total_cart_price = document.querySelector('#total-value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
})

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/shop').then((data)=>{
        console.log('123',data.data);
        for(let i=0;i<data.data.length;i++)
        {
            showOnScreen(data.data[i]);
        }
    })
})

function showOnScreen(data){
    const parent=document.getElementById('music-content');
    const child=`<div id="album-${data.id}">
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
console.log('456',child)

parent.innerHTML+=child;

}

