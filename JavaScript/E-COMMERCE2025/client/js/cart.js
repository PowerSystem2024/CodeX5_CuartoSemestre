// REFERENCIAS DEL DOM
const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");

// FUNCIÓN PARA MOSTRAR EL CARRITO
const displayCart = () => {
    modalContainer.innerHTML = ""; // Limpia contenido previo
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    // HEADER DEL MODAL
    const modalHeader = document.createElement("div");

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

        const decrease = modalbody.querySelector(".quantity-btn-decrease");
        decrease.addEventListener("click", () => {
            if (product.quanty !== 1) {
                product.quanty--;
                displayCart();
            }
        });
        const increase = modalbody.querySelector(".quantity-btn-increase");
        increase.addEventListener("click", () => {
            product.quanty++;
            displayCart();
        });
        //delete
        const deleteProduct = modalbody.querySelector(".delete-product");
        deleteProduct.addEventListener("click", () => {
            deleteCartProduct(product.id);
        });
    });

    // Modal footer
    const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
       <div class="total-price"> Total:  $${total} </div>

    `;
    modalContainer.append(modalFooter);
};

// 👇 MUY IMPORTANTE: este listener va **afuera** de displayCart
cartBtn.addEventListener("click", displayCart);


const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    console.log(foundId);
    cart.splice(foundId, 1);
    displayCart();
    };
