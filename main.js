let items = [
    {
        id: 1,
        name: "Hoodies",
        stock: 10,
        price: 14.00,
        urlImage: "./img/featured1.png"
    },
    {
        id: 2,
        name: "Shirts",
        stock: 15,
        price: 24.00,
        urlImage: "./img/featured2.png"
    },
    {
        id: 3,
        name: "Sweatshirts",
        stock: 20,
        price: 24.00,
        urlImage: "./img/featured3.png"
    }
];

{
    const iconCart = document.querySelector(".bx-shopping-bag")
    const contentCart = document.querySelector(".content__cart")

    iconCart.addEventListener('click', function () {
        contentCart.classList.toggle("contentCar__show")
    });

}

const products = document.querySelector(".products");
const cartProducts = document.querySelector(".carProducts");
const carTotal = document.querySelector(".carTotal");

let objCart = {}

function printProductCart() {
    const arrayCart = Object.values(objCart);

    if(!arrayCart.length) {
        carTotal.innerHTML = `
        <div class="cart__container">
        <div class="cart__empty">
            <img src="./img/empty-cart.png" alt="empty cart">
            <h2>Your cart is empty</h2>
            <p>You can add items to your cart by clicking on the Buy button on the product page.</p>
        </div></div>

        <div class="cart__prices">
            <span class="cart__prices-item"><span id="items-count">0</span> items</span>
            <span class="cart__prices-total" id="cart-total">$0.00</span>
        </div>
    
        <div class="cart__checkout">
            <button class="button cart__btn" id="cart-checkout" disabled="disabled"><i class="bx bxs-check-shield"></i> Checkout</button>
        </div>
        `;
            return;
        }

        let sum = 0;

        arrayCart.forEach(function ({ amount, price }) {
            sum += amount * price
        });
        
        carTotal.innerHTML = `
            <h3>Total a pagar ${sum}</h3>
            <button class="btn btn__buy">Buy</botton>
        `;

    }





function printProductInCart() {
    let html = "";

    const arrayCart = Object.values(objCart);

    arrayCart.forEach(function({id, name, price, urlImage, amount}) {
        html += `
        <div class="product">
                        <div class="products__img">
                            <img src="${urlImage}" alt="${name}" />
                        </div>
        
                        <div class="product__info">
                            <p>${name}</p>
                            <p>${price}</p>
                            <p>Cantidad: ${amount}</p>
                        </div>
        
                    <div class="product__options" id="${id}">
                        <i class='bx bx-plus'></i>
                        <i class='bx bx-minus'></i>
                        <i class='bx bx-trash'></i>
                    </div>
                </div>
        `;
    });

    cartProducts.innerHTML = html;
}


function printProducts() {
    let html = "";

    items.forEach(function({id, name, price, stock, urlImage}) {
        html += `
        <div class="products__content">
                        <div class="products__img">
                            <img src="${urlImage}" alt="${name}" />
                        </div>
        
                        <div class="product__info">
                            <p>name: ${name}</p>
                            <p>stock: ${stock}</p>
                            <p>price: ${price}</p>
                        </div>
        
                        <div class="float__button" id="${id}">
                            <button class="btn btn__add">Buy</button>
                        </div>
                    </div>
        `;
    })

    products.innerHTML = html;
}

products.addEventListener('click', function(e) {
    if(e.target.classList.contains("btn__add")) {
        //obtenemos el id
        const id = e.target.parentElement.id

        //obtener el producto por id
        let findProduct = items.find(function (item) {
            return item.id == id
        });

        //logica para el carrito
        if(objCart[id]) {
            objCart[id].amount++
        } else {
            objCart[id] = {
                ...findProduct,
                amount: 1
            }
        }

        printProductInCart();
        printProductCart();
    }
});

cartProducts.addEventListener('click', function(e) {
    if(e.target.classList.contains('bx-plus')) {
        const id = e.target.parentElement.id

        let findProduct = items.find(function(item) {
            return item.id == id;
        });

        if(findProduct.stock === objCart[id].amount) {
            alert('No tengo mas en stock')
        } else {
            objCart[id].amount++;
        }
    
        
    }

    if(e.target.classList.contains('bx-minus')) {
        const id = e.target.parentElement.id

        if(objCart[id].amount === 1) {
            const res = confirm('seguro quieres este articulo?')
            delete objCart[id];
        } else {
            objCart[id].amount--;
        }
        
    }

    if(e.target.classList.contains('bx-trash')) {
        const id = e.target.parentElement.id

        const res = confirm('seguro quieres este articulo?')
        if(res) delete objCart[id];
    }

    printProductInCart();
    printProductCart();
});

carTotal.addEventListener('click', function (e) {
    if(e.target.classList.contains("btn__buy")) {
        alert('Quieres comprar')
    }
})

printProducts();
printProductCart();

