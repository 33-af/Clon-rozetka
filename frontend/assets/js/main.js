// САЙДБАР ОТОБРАЖЕНИЕ ДЛЯ КАЖДЕЙ КАТЕГОРИИ БРЕНДОВ  А  ТАК ЖЕ ПОИСК 
class Sidebar {
    constructor(brandsCategory, productRenderer) {
        this.brandsCategory = brandsCategory;
        this.sidebarBottomLists = document.getElementById("sidebar-bottom-lists");
        this.productRenderer = productRenderer;
        this.initEventListeners();
        this.initSidebarItems();
    }

    //ТАК ЖЕ КЛАССЫ ДЛЯ CSS
    getCategoryClass(category) {
        switch (category) {
            case 'Мобільні пристрої':
                return 'smart-side__image';
            case 'Телевізори':
                return 'tv-side__image';
            case 'Електроніка':
                return 'electronics-side__image';
            case 'Сорочки':
                return 'clothes-side__image';
            case 'Взуття':
                return 'sneakers-side__image';
            default:
                return '';
        }
    }

    initEventListeners() {
        document.addEventListener("click", (event) => this.handleClickOutside(event));
    }

    initSidebarItems() {
        const smartphoneItems = document.querySelectorAll('.smartphone-item');
        smartphoneItems.forEach(item => {
            item.addEventListener('click', (event) => {
                const submenuId = event.currentTarget.nextElementSibling.id;
                this.toggleSubmenu(submenuId);
            });
        });

        const subItems = document.querySelectorAll('.subItem');
        subItems.forEach(subItem => {
            subItem.addEventListener('click', (event) => {
                event.preventDefault();
                const category = subItem.textContent.trim();
                subItem.classList.toggle('selected');
                this.showCategory(category);
            });
        });
    }

    toggleSubmenu(submenuId) {
        const submenu = document.getElementById(submenuId);
        const isVisible = submenu.style.display === "block";
        document.querySelectorAll('.submenu').forEach(sub => sub.style.display = "none");
        submenu.style.display = isVisible ? "none" : "block";
    }

    showCategory(category) {
        const brands = this.brandsCategory[category] || [];
        this.sidebarBottomLists.className = "";
        const categoryClass = this.getCategoryClass(category);
        if (categoryClass) {
            this.sidebarBottomLists.classList.add(categoryClass);
        }

        //Поиск внутри сайдбар для поиска брендов и по ним филтрации
        this.sidebarBottomLists.innerHTML = `
            <div class="sidebar-search__form">
                <input type="text" class="sidebar-search" id="sidebar-search" placeholder="Пошук...">
            </div>
        `;

        brands.forEach(brand => {
            const brandItem = this.createBrandItem(brand, category);
            this.sidebarBottomLists.appendChild(brandItem);
        });
        this.sidebarBottomLists.style.display = "block";
        this.addCheckboxListeners();
        this.attachSidebarSearchListener();
    }

    createBrandItem(brand, category) {
        const brandItem = document.createElement("div");
        brandItem.className = "model-item";
        brandItem.innerHTML = `
            <input type="checkbox" class="model-checkbox" value="${brand.trim()}" data-category="${category}"> 
            <span class="model-name">${brand}</span>
        `;
        return brandItem;
    }

    addCheckboxListeners() {
        const checkboxes = this.sidebarBottomLists.querySelectorAll('.model-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.filterProducts());
        });
    }

    attachSidebarSearchListener() {
        const sidebarSearchInput = document.getElementById('sidebar-search');
        if (sidebarSearchInput) {
            sidebarSearchInput.addEventListener('input', (event) => {
                const query = event.target.value.toLowerCase();
                this.filterBrands(query);
            });
        }
    }

    filterBrands(query) {
        const brandItems = this.sidebarBottomLists.querySelectorAll('.model-item');
        brandItems.forEach(item => {
            const brandName = item.querySelector('.model-name').textContent.toLowerCase();
            item.style.display = brandName.includes(query) ? 'flex' : 'none';
        });
    }

    filterProducts() {
        const selectedBrands = Array.from(this.sidebarBottomLists.querySelectorAll('.model-checkbox:checked')).map(checkbox => checkbox.value.trim());
        const selectedCategories = Array.from(this.sidebarBottomLists.querySelectorAll('.subItem.selected')).map(subItem => subItem.textContent.trim());
        const sidebarSearchInput = document.getElementById('sidebar-search');
        const searchQuery = sidebarSearchInput ? sidebarSearchInput.value.toLowerCase() : '';
        const filteredProducts = this.productRenderer.products.filter(product => {
            const isBrandSelected = selectedBrands.length === 0 || selectedBrands.includes(product.brand.trim());
            const isCategorySelected = selectedCategories.length === 0 || selectedCategories.includes(product.category.trim());
            const isSearchMatch = product.title.toLowerCase().includes(searchQuery);
            return isBrandSelected && isCategorySelected && isSearchMatch;
        });

        this.productRenderer.renderProducts(filteredProducts);
    }

    handleClickOutside(event) {
        const isClickInsideSidebarBottom = this.sidebarBottomLists.contains(event.target);
        if (!isClickInsideSidebarBottom && !event.target.closest('.submenu') && !event.target.closest('.smartphone-item')) {
            this.sidebarBottomLists.style.display = "none";
            document.querySelectorAll('.submenu').forEach(sub => sub.style.display = "none");
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // загрузка с серва
    const products = await productService.fetchProducts();
    const productManager = new ProductManager(products);
    const productRenderer = new ProductRenderer(products, 'productGrid');
    productRenderer.renderProducts(products);

    const brandsCategory = {
        "Мобільні пристрої": ["Xiaomi", "Samsung", "Apple"],
        "Телевізори": ["LG", "Sony", "Samsung"],
        "Електроніка": ["Xiaomi"],
        "Сорочки": ["Guess", "Mavi"],
        "Взуття": ["Adidas", "Nike"]
    };

    const sidebar = new Sidebar(brandsCategory, productRenderer);
    const deleteButtonContainer = document.getElementById('delete-button-container');

    if (deleteButtonContainer) {
        const categorySelector = new CategorySelector();
    } else {
        console.error("Required elements not found in DOM for CategorySelector");
    }
});


//ТАК ЖЕ КЛАССЫ ДЛЯ CSS
class ProductManager {
    constructor(products) {
        // Ensure products is an array, default to an empty array if not
        this.products = Array.isArray(products) ? products : [];
        this.assignProductClasses();
    }

    assignProductClasses() {
        this.products.forEach(product => {
            product.className = this.getProductClassName(product.category);
        });
    }


    getProductClassName(category) {
        switch (category) {
            case 'smartphone':
                return 'smartphone-images';
            case 'TV':
                return 'tv-images';
            case 'Electronics':
                return 'electronics-images';
            case 'Clothes':
                return 'clothes-images';
            case 'Sneakers':
                return 'sneakers-images';
            default:
                return '';
        }
    }

    getDescClassName(product) {
        switch (product.category) {
            case 'Sneakers':
                return 'extra-red__desc';
            case 'TV':
            case 'smartphone':
            case 'Clothes':
            case 'Electronics':
                return 'extra-gray__desc';
            default:
                return '';
        }
    }
}


//СОЗДАНИЕ КАРТОЧКИ И ВСЯ ЛОГИКА 
class ProductRenderer {
    constructor(products, gridId) {
        this.products = products;
        this.gridElement = document.getElementById(gridId);

        // Check if gridElement is found
        if (!this.gridElement) {
            console.error(`Element with id '${gridId}' not found.`);
            return; // Exit constructor if the grid element is not found
        }

        this.searchInputs = [
            document.getElementById('input-search'),
            document.getElementById('sidebar-search')
        ].filter(input => input);

        this.attachSearchListeners();
        this.renderProducts();
    }

    attachSearchListeners() {
        this.searchInputs.forEach(input => {
            input.addEventListener('input', (event) => {
                const query = event.target.value.toLowerCase();
                this.filterProducts(query);
            });
        });
    }
    filterProducts(query) {
        const filteredProducts = this.products.filter(product =>
            product.title.toLowerCase().includes(query)
        );

        if (!Array.isArray(filteredProducts)) {
            console.error("Filtered products is not an array:", filteredProducts);
            return; // Exit if not an array
        }
        this.renderProducts(filteredProducts);
    }

    renderProducts(productsList = []) {
        if (!Array.isArray(productsList)) {
            console.error("Expected productsList to be an array, but received:", productsList);
            return; // Exit the method if not an array
        }
        productsList = productsList.length ? productsList : this.products;
        this.gridElement.innerHTML = productsList.map(product => this.createProductCard(product)).join('');
        this.addProductEventListeners(productsList);
    }




    createProductCard(product) {
        const descClass = this.getDescClassName(product);
        return `
            <div class="card">
                <div class="card__content">
                    <div class="product-top">
                        ${product.isSale ? '<div class="sale">Акція</div>' : ''}
                        <img src="./assets/img/heart.png" alt="heart-icon" class="product-heart">
                    </div>
                    <div class="product-body ${product.className || ''}">
                        <img src="${product.image}" alt="${product.title}" class="product-image ${product.className }" data-id="${product.id}"> 
                    </div>
                    <div class="product-info">
                        <p class="product-info__title">${product.title}</p>
                        <div class="product-rating">
                            ${'<i class="fa-solid fa-star star"></i>'.repeat(product.rating)}
                        </div>
                        <div class="product-bottom">
                            <div class="price">${product.price} ₴</div>
                            <i class="fa-solid fa-cart-shopping product-cart" data-id="${product.id}"></i>
                        </div>
                        <div class="product-extra__info">
                            <p class="product-info">${product.info}</p>
                            <div class="size-btns">
                                ${product.sizes ? product.sizes.map(size => `<button type="button" class="product-size__btn">${size}</button>`).join('') : ''}
                            </div>
                            <p class="product-extra__desc ${descClass}">${product.infoDesc}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addProductEventListeners(productsList) {
        this.gridElement.querySelectorAll('.product-image').forEach(item => {
            item.addEventListener('click', event => {
                const productId = event.target.getAttribute('data-id');
                if (productId) {
                    window.location.href = `product-detail.html?id=${productId}`;
                }
            });
        });

        this.gridElement.querySelectorAll('.product-cart').forEach(item => {
            item.addEventListener('click', event => {
                event.stopPropagation();
                const productId = event.target.getAttribute('data-id');
                const product = productsList.find(prod => prod.id == productId);
                if (product) {
                    this.addToCart(product);
                } else {
                    console.error(`Product not found for ID: ${productId}`);
                }
            });
        });
    }


    //КЛАСС ДЛЯ ДОП.ИНФОРМАЦИИ ПРИ НАВОДКЕ НА КАРТОЧКУ
    getDescClassName(product) {
        return product.infoDesc ? 'extra-desc' : 'no-desc';
    }

    //ФИЛЬТРАЦИЯ ПОД ХЕДЕРОМ ПРАВАЯ ЧАСТЬ 
    sortProducts(criteria) {
        let sortedProducts = [...this.products];

        switch (criteria) {
            case 'item1':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'item2':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'item3':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        this.renderProducts(sortedProducts);
    }

    attachSortListener(selectElement) {
        selectElement.addEventListener('change', (event) => {
            this.sortProducts(event.target.value);
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const products = await productService.fetchProducts();
        console.log('Fetched Products:', products);

        if (products.length > 0) {
            const productManager = new ProductManager(products);
            const productRenderer = new ProductRenderer(products, 'productGrid');
            productRenderer.renderProducts(products);

            const selectElement = document.querySelector('.select-wrapper select');
            if (selectElement) {
                productRenderer.attachSortListener(selectElement);
            } else {
                console.error("Select element for sorting not found.");
            }
        } else {
            console.error("No products found to display.");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});




class Cart {
    constructor() {
        this.cartItems = [];
    }

    addToCart(product) {
        const existingProduct = this.cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            this.cartItems.push({ ...product, quantity: 1 });
        }
        this.updateCartDisplay();
    }

    incrementQuantity(itemId) {
        const item = this.cartItems.find(i => i.id === itemId);
        if (item) item.quantity++;
        this.updateCartDisplay();
    }

    decrementQuantity(itemId) {
        const item = this.cartItems.find(i => i.id === itemId);
        if (item && item.quantity > 1) item.quantity--;
        this.updateCartDisplay();
    }

    updateQuantity(itemId, newQuantity) {
        const item = this.cartItems.find(i => i.id === itemId);
        if (item && newQuantity > 0) {
            item.quantity = parseInt(newQuantity, 10);
            this.updateCartDisplay();
        }
    }

    updateCartDisplay() {
        const cartContent = document.querySelector('.cart-content');
        const totalPriceElement = document.querySelector('.total-price');
        const cartFooter = document.querySelector('.cart-footer');
        const cartQuantityElement = document.getElementById('cart-quantity');

        console.log("Текущие товары в корзине:", this.cartItems);
        console.log("Количество товаров в корзине:", this.cartItems.length);

        if (this.cartItems.length > 0) {
            cartContent.innerHTML = this.cartItems.map(item => {
                let productClass = '';
                switch (item.category) {
                    case 'smartphone': productClass = 'cart-smartphone__image'; break;
                    case 'TV': productClass = 'cart-TV__image'; break;
                    case 'Electronics': productClass = 'cart-Electronics__image'; break;
                    case 'Clothes': productClass = 'cart-Clothes__image'; break;
                    case 'Sneakers': productClass = 'cart-Sneakers__image'; break;
                    default: productClass = '';
                }

                return `
                    <div class="cart-item" data-id="${item.id}"> 
                        <img class="${productClass} cart-item__image" src="${item.image}" alt="${item.title}">
                        <p class="cart-item-detail">${item.title}</p>
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="cart.decrementQuantity(${item.id})">-</button>
                            <input type="number" value="${item.quantity}" min="1" style="width: 40px; text-align: center;" onchange="cart.updateQuantity(${item.id}, this.value)">
                            <button class="quantity-btn" onclick="cart.incrementQuantity(${item.id})">+</button>
                        </div>
                        <p class="item-price">${item.price} ₴</p>
                    </div>
                `;
            }).join('');

            cartFooter.style.display = 'flex';
            const total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            totalPriceElement.textContent = `${total} ₴`;

            // Обновляем счётчик количества товаров
            const totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
            cartQuantityElement.textContent = totalQuantity;

        } else {
            totalPriceElement.textContent = '';
            cartQuantityElement.textContent = '0'; // Если корзина пустая, счетчик обнуляется
        }
    }
}

// Создаем экземпляр класса Cart
const cart = new Cart();

// Подключаем методы к глобальному объекту
window.addToCart = (product) => cart.addToCart(product);
window.incrementQuantity = (itemId) => cart.incrementQuantity(itemId);
window.decrementQuantity = (itemId) => cart.decrementQuantity(itemId);
window.updateQuantity = (itemId, newQuantity) => cart.updateQuantity(itemId, newQuantity);



//  КНОПКА  ОТОБРАЖАЕТЬСЯ ПРИ ВЫБОРЕ КАТЕГОРИИ И ОТОБРАЖАЕТ СОДЕРЖИМОЕ ПРИ ВЫБОРЕ ДРУГОЙ КАТЕГОРИИ МЕНЯЕТСЯ А ТАК ЖЕ  СКРЫВАЕТСЯ.
class CategorySelector {
    constructor() {
        this.deleteButtonContainer = document.getElementById('delete-button-container');
        this.deleteButton = this.deleteButtonContainer ? this.deleteButtonContainer.querySelector('.delete-btn.remove') : null;
        this.submenuItems = document.querySelectorAll('.subItem');
        this.filterSelect = document.getElementById('filter-select');

        if (this.deleteButton && this.deleteButtonContainer) {
            this.addEventListeners();
        } else {
            console.error("Required elements not found in DOM for CategorySelector");
        }
    }

    updateCategory(event) {
        event.preventDefault();
        const selectedCategory = event.target.textContent;
        if (this.deleteButton && this.deleteButtonContainer) {
            this.deleteButton.innerHTML = `${selectedCategory} <i class="fa-solid fa-xmark rem"></i>`;
            this.deleteButtonContainer.style.display = 'block';
        }
    }

    clearDeleteButton() {
        if (this.deleteButton && this.deleteButtonContainer) {
            this.deleteButton.innerHTML = '';
            this.deleteButtonContainer.style.display = 'none';
        }
    }

    handleFilterChange() {
        this.clearDeleteButton();
    }

    addEventListeners() {
        this.submenuItems.forEach(item => {
            item.addEventListener('click', this.updateCategory.bind(this));
        });
        if (this.filterSelect) {
            this.filterSelect.addEventListener('change', this.handleFilterChange.bind(this));
        }
    }
}
