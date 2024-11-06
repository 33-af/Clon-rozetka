//АЯКС ЗАПРОС В ООП НА ОСНОВЕ КЛАССОВ

class ProductService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchProducts() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", this.apiUrl);
    
            xhr.onload = () => {
                console.log('Response:', xhr.responseText); // Log raw response
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        console.log('Parsed Data:', data); // Log parsed data
                        resolve(data.products); // Extract the products array from the response object
                    } catch (error) {
                        console.error("Error parsing response:", error);
                        resolve([]); // Resolve with an empty array if parsing fails
                    }
                } else {
                    console.error(`HTTP Error! Status: ${xhr.status}`);
                    resolve([]); // Resolve with an empty array if there's an error
                }
            };
    
            xhr.onerror = () => {
                console.error("Error loading products:", xhr.statusText);
                resolve([]); // Resolve with an empty array on error
            };
    
            xhr.send();
        });
    }
    
    
    
}

const productService = new ProductService("https://clon-rozetka.onrender.com/api/products");