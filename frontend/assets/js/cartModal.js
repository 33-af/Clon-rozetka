
// КОРЗИНA
class CartModal {
    constructor(cartIconId, closeButtonId, modalId) {
        this.openCartButton = document.getElementById(cartIconId);
        this.closeCartButton = document.getElementById(closeButtonId);
        this.cartModal = document.getElementById(modalId);
        this.initEventListeners();
    }

    initEventListeners() {
        this.openCartButton.addEventListener('click', () => this.openModal());
        this.closeCartButton.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (event) => this.handleClickOutside(event));
    }

    openModal() {
        this.cartModal.style.display = 'block';
    }

    closeModal() {
        this.cartModal.style.display = 'none';
    }

    handleClickOutside(event) {
        if (event.target === this.cartModal) {
            this.closeModal();
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const cartModal = new CartModal('cart-icon', 'closeCartButton', 'cartModal');
});
