const BASE_URL = "https://ecommercebackend.fundamentos-29.repl.co/";

async function getProducts() {
    try {
        const data = await fetch(BASE_URL)
        const response = await data.json();
        localStorage.setItem("products", JSON.stringify(response));
        return response;
    } catch (error) {
        console.log("Error: ", error);
    }
    
}

function printProducts(store) {
    let html = "";

    store.products.forEach(function({ id, image, name, price, quantity }) {
        html += `
            <div class="product">
                <div class="product__img">
                <img src="${ image }" alt="${name}">
                </div>
                <h3>${name}</h3>
                <p><strong>$${price}.00</strong> ${quantity} unidades </p>
                <button class="product__btn" id="${id}"> Agregar </button>
            </div>
        `
        
    });

    html += "";

    document.querySelector(".products").innerHTML = html;
    
}

function handShowCart() {

    const iconCart = document.querySelector(".icon__cart");
    const cart = document.querySelector(".cart");

    iconCart.addEventListener('click', function () {
    cart.classList.toggle("cart__show");
    
})
    
}

function printProductsInCart(store) {

    
    let html = "";

    for (const key in store.cart) {
        const {amount, id, image, name, price} = store.cart[key];
        html += `
                    <div class="cart__product">
                        <div className="cart__product__img">
                            <img src="${image}" alt"${name}" />
                        </div>

                        <div class="cart__product__body">
                            <p>
                                <b>${name}</b>
                            
                            </p>
                            <p>
                            <small> price: $${price} | amount: ${amount}</small>
                            </p>
                            <p>
                                <b>
                                    Total <small>$${amount * price}</small>
                                </b>
                            </p>

                            <div class="cart__product__opt"> 
                                <i class='bx bx-plus bx-flashing-hover' id="${id}"></i>
                                <span>${amount}</span>
                                <i class='bx bx-minus bx-flashing-hover'></i>
                                <i class='bx bxs-trash bx-flashing-hover' ></i>
                            </div>
                        </div>
                    </div>

                `;
   
        console.log(store.cart[key]);
    }

    document.querySelector(".cart__products").innerHTML = html;
    
}

function addToCartFromProducts(store) {
    const productsHTML = document.querySelector(".products");

    productsHTML.addEventListener("click", function (e) {
        if( e.target.classList.contains("product__btn")) {
            const id = Number(e.target.id);

            const productFound = store.products.find(function (product) {
                return product.id === id;

            });

            if (store.cart[productFound.id]) {
                store.cart[productFound.id].amount++;

            } else {
                store.cart[productFound.id] = {
                    ...productFound, 
                    amount: 1,

                };

            }

            localStorage.setItem('cart', JSON.stringify(store.cart));
            printProductsInCart(store);
            
        }
    });
    
}

async function main () {
    const store = {
        products: JSON.parse(localStorage.getItem("products")) || await getProducts(),
        cart: JSON.parse(localStorage.getItem("cart")) || {},
    }

    printProducts(store);
    handShowCart();
    addToCartFromProducts(store);
    printProductsInCart(store);

    document
    .querySelector(".cart__products")
    .addEventListener("click", function (e) {
        if (e.target.classList.contains("bx")) {

           if (e.target.classList.contains("bx-plus")) {
                const id = Number(e.target.parentElement.id);
                store.cart[id].amount++;
            }
            

            if (e.target.classList.contains("bx-minus")) {
                const id = Number(e.target.parentElement.id);
                store.cart[id].amount++;
            }

            if (e.target.classList.contains("bxs-trash")) {
                const id = Number(e.target.parentElement.id);
                delete store.cart[id];
            }

            printProductsInCart(store);
        }
    })
        
    
}

main();
