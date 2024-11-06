
//ОДИНОЧНЫЙ ТОВАР
class Product {
    constructor(product, containerId) {
        this.product = product;
        this.container = document.getElementById(containerId);
    }

     //ТАК ЖЕ КЛАССЫ ДЛЯ CSS
    getProductClass() {
        const classMap = {
            smartphone: 'one-smartphone__image',
            TV: 'one-TV__image',
            Electronics: 'one-Electronics__image',
            Clothes: 'one-Clothes__image',
            Sneakers: 'one-Sneakers__image',
        };
        return classMap[this.product.category] || ''; 
    }

    //СОЗДАНИЕ
    render() {
        if (!this.container) return;
        const productClass = this.getProductClass();
        this.container.innerHTML = `
            <div class="desc-one__container">
                <div class="desc-one__left">
                    <img src="${this.product.image}" alt="${this.product.title}" class="desc-one__image ${productClass}" />
                </div>
                <div class="desc-one__right">
                    <div class="desc-one__top">
                        <h2 class="desc-one__title">${this.product.title}</h2>
                        <span class="desc-one__feedback">Залишити відгук</span>
                    </div>
                    <div class="desc-one__sizes">
                        <span class="desc-one__sizes">${this.product.info}</span>
                        <div class="one-size__btn">
                            ${this.product.sizes ? this.product.sizes.map(size => `<button type="button" class="size-button">${size}</button>`).join('') : 'Розміри не вказані'}
                        </div>
                    </div>
                    <div class="desc-one__buy">
                        <p class="desc-one__price">${this.product.price} ₴</p>
                        <button type="button" id="addToCartButton" class="desc-but__btn">Додати в кошик</button>
                        <button type="button" class="desc-one__credit">Купити в кредіт</button>
                    </div>
                </div>
            </div>
        `;
        this.addToCartHandler();
    }

        //ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ ПО КНОПКЕ
    addToCartHandler() {
        const addToCartButton = this.container.querySelector('#addToCartButton');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                addToCart(this.product);
            });
        }
    }
}



class ProductList {
    constructor(products) {
        this.products = products;
        this.initEventListeners();
    }

    initEventListeners() {
        this.products.forEach(product => {
            const productImage = document.querySelector(`.product-image[data-id="${product.id}"]`);
            const productCart = document.querySelector(`.product-cart[data-id="${product.id}"]`);

            if (productImage) {
                productImage.addEventListener('click', () => this.handleProductClick(product.id));
            }

            if (productCart) {
                productCart.addEventListener('click', event => this.handleAddToCartClick(event, product));
            }
        });
    }

    handleProductClick(productId) {
        window.location.href = `product-detail.html?id=${productId}`;
    }

    handleAddToCartClick(event, product) {
        event.stopPropagation();
        addToCart(product);
    }

    static loadProductFromURL(products, containerId) {
        const productId = new URLSearchParams(window.location.search).get('id');
        const product = products.find(prod => prod.id == productId);

        if (product) {
            new Product(product, containerId).render();
        } else {
            console.error(`Product not found for ID: ${productId}`);
        }
    }
}

let products = [];

document.addEventListener('DOMContentLoaded', async () => {
    const products = await productService.fetchProducts();

    if (products.length > 0) {
        const productList = new ProductList(products);
        ProductList.loadProductFromURL(products, 'productDetailContainer');
    } else {
        console.error("No products found to display.");
    }
});