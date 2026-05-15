import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
    const cartItems = getLocalStorage("so-cart") || [];
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Attach a listener to each remove button after rendering
    document.querySelectorAll(".cart-card__remove").forEach((button) => {
        button.addEventListener("click", removeFromCart);
    });
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img src="${item.Image}" alt="${item.Name}" />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
        <button class="cart-card__remove" data-id="${item.Id}">X</button>
    </li>`;

    return newItem;
}

function removeFromCart(event) {
    // Get the ID of the product to remove from the button's data-id attribute
    const productId = event.target.dataset.id;

    // Pull the current cart from localStorage
    const cart = getLocalStorage("so-cart") || [];

    // Find the index of the first item that matches the ID
    const indexToRemove = cart.findIndex((item) => item.Id === productId);

    // Only remove that one item at that index
    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);
    }
    // Save the updated cart back to localStorage
    setLocalStorage("so-cart", cart);

    // Re-render the cart so the removed item disappears
    renderCartContents();
}

renderCartContents();
