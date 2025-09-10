// REFERENCIAS DEL DOM
const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

// FUNCIÓN PARA MOSTRAR EL CARRITO
const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    // HEADER DEL MODAL
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    const modalClose = document.createElement("div");
    modalClose.innerText = "✖️";
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Cart";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    // BODY DEL MODAL
    if (cart.length > 0) {
        cart.forEach((product) => {
            const modalbody = document.createElement("div");
            modalbody.className = "modal-body";
            modalbody.innerHTML = `
                <div class="product">
                    <img class="product-img" src="${product.img}" />
                    <div class="product-info">
                        <h4>${product.productName}</h4>
                    </div>
                    <div class="quantity">
                        <span class="quantity-btn-decrease">-</span>
                        <span class="quantity-input">${product.quanty}</span>
                        <span class="quantity-btn-increase">+</span>
                    </div>
                    <div class="price">${product.price * product.quanty}$</div>
                    <div class="delete-product">✖️</div>
                </div>
            `;
            modalContainer.append(modalbody);

            // botones cantidad
            const decrease = modalbody.querySelector(".quantity-btn-decrease");
            decrease.addEventListener("click", () => {
                if (product.quanty !== 1) {
                    product.quanty--;
                    displayCart();
                    displayCartCounter();
                }
            });

            const increase = modalbody.querySelector(".quantity-btn-increase");
            increase.addEventListener("click", () => {
                product.quanty++;
                displayCart();
                displayCartCounter();
            });

            // eliminar producto
            const deleteProduct = modalbody.querySelector(".delete-product");
            deleteProduct.addEventListener("click", () => {
                deleteCartProduct(product.id);
            });
        });

        // Modal footer con total y checkout
        const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        modalFooter.innerHTML = `
            <div class="total-price"> Total: $${total} </div>
            <button class="btn-primary" id="go-checkout">Go to checkout</button>
            <div id="button-checkout"></div>
        `;
        modalContainer.append(modalFooter);

        // Agrega el evento click al botón "Go to checkout"
        const goCheckoutBtn = modalFooter.querySelector("#go-checkout");
        goCheckoutBtn.addEventListener("click", async () => {
            if (cart.length === 0) {
                console.error('El carrito está vacío. No se puede crear una preferencia de pago.');
                return;
            }

            goCheckoutBtn.style.display = "none";

            const preferenceResponse = await fetch('/create_preference', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart),
            });

            if (!preferenceResponse.ok) {
                console.error('Error en la petición:', preferenceResponse.status, await preferenceResponse.text());
                goCheckoutBtn.style.display = "block";
                return;
            }

            const preference = await preferenceResponse.json();
            console.log('Respuesta del servidor:', preference);

            if (preference && preference.id) {
                createCheckoutButton(preference.id);
            } else {
                console.error('Error: No se pudo crear la preferencia de pago.', preference);
                goCheckoutBtn.style.display = "block";
            }
        });

    } else {
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerText = "Your cart is empty";
        modalContainer.append(modalText);
    }
};

// FUNCION ACTUALIZADA PARA MERCADO PAGO V2 (SANDBOX)
const createCheckoutButton = (preferenceId) => {
    const containerSelector = "#button-checkout";

    // Inicializamos MercadoPago con la Public Key de prueba
    const mp = new MercadoPago('APP_USR-edc06f06-ecaa-4e65-941d-0201d2c84867', {
        locale: 'es-AR'
    });

    // Inicializamos checkout asegurándonos que el contenedor ya exista
    mp.checkout({
        preference: { id: preferenceId },
        render: {
            container: containerSelector, // string selector
            label: 'Pagar con Mercado Pago (sandbox)',
        }
    });
};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    cart.splice(foundId, 1);
    displayCart();
    displayCartCounter();
};

const displayCartCounter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
    if (cartLength > 0) {
        cartCounter.style.display = "block";
        cartCounter.innerText = cartLength;
    } else {
        cartCounter.style.display = "none";
    }
};
