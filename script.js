const products = [
            {
                id: 1,
                title: "Classic Cotton Shirt",
                price: 49.99,
                image: "./src/shirt3d92495dab310207b9af7454d98147cc2.jpg",
                description: "Premium quality shirt made from 100% Egyptian cotton. Perfect for formal occasions or business attire.",
                sizes: ["S", "M", "L", "XL", "XXL"]
            },
            {
                id: 2,
                title: "Brown Boot",
                price: 59.99,
                image: "./src/Boot pexels-1242304473-30272905.jpg"
            },
            {
                id: 3,
                title: "Printed Red Hoodie",
                price: 199.99,
                image: "./src/bff-printed-red-hoodie.jpg"
            },
            {
                id: 4,
                title: "Classy Sneakers",
                price: 69.99,
                image: "./src/pexels-sole-heaven-1013230921-20298289.jpg"
            },
            {
                id: 5,
                title: "Black Hoodie type Jacket",
                price: 149.99,
                image: "./src/shirt48c1e9adb59deafddf0b84b7580f20249.jpg"
            },
            {
                id: 6,
                title: "classic Retro Eyewear",
                price: 24.99,
                image: "./src/Temu：Shop like a Billionaire.jpg"
            },
            {
                id: 7,
                title: "Casino Watch ",
                price: 89.99,
                image: "src/download (2).jpg"
            },
            {
                id: 8,
                title: "Casual Shirt Checked",
                price: 129.99,
                image: "./src/Shirt26194b25f79ada649bb45bfb45effeeb6.jpg"
            },
            {
                id: 9,
                title: "Transparent Glass",
                price: 89.99,
                image: "src/download (1).jpg"
            },
            {
                id: 10,
                title: "Leather Jacket",
                price: 39.99,
                image: "src/download (3).jpg"
            },
            {
                id: 11,
                title: "Sneakers Smoothy",
                price: 29.99,
                image: "./src/The New Balance _Dunks_ Are Having a Beautiful Run.jpg"
            },
            {
                id: 12,
                title: "Leather Thick Coat",
                price: 49.99,
                image: "./src/Shirt1657c40105c574a5b1ec5746111d229d.jpg"
            }
        ];

        // Cart Data
        let cart = [];

        // DOM Elements
        const productModal = document.getElementById('product-modal');
        const closeProductModal = document.getElementById('close-product-modal');
        const productDetailsContainer = document.getElementById('product-details');
        const productsContainer = document.getElementById('products');
        const cartIcon = document.getElementById('cart-icon');
        const cartCount = document.getElementById('cart-count');
        const cartModal = document.getElementById('cart-modal');
        const closeCart = document.getElementById('close-cart');
        const overlay = document.getElementById('overlay');
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');

        // Display Products
        function displayProducts() {
            productsContainer.innerHTML = products.map(product => `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `).join('');

            // Add event listeners to all add to cart buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        }

        // Add to Cart Function
        function addToCart(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Show feedback
            e.target.textContent = 'Added!';
            setTimeout(() => {
                e.target.textContent = 'Add to Cart';
            }, 1000);
        }

        // Update Cart Function
        function updateCart() {
            // Update cart count
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart modal
            renderCartItems();
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Render Cart Items
        function renderCartItems() {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
                totalPriceElement.textContent = '$0.00';
                return;
            }
            
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase">+</button>
                        </div>
                        <div class="remove-item">Remove</div>
                    </div>
                </div>
            `).join('');
            
            // Calculate total price
            const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            // totalPriceElement.textContent = $${totalPrice.toFixed(2)};
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.decrease').forEach(button => {
                button.addEventListener('click', decreaseQuantity);
            });
            
            document.querySelectorAll('.increase').forEach(button => {
                button.addEventListener('click', increaseQuantity);
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', removeItem);
            });
        }

        // Quantity Functions
        function decreaseQuantity(e) {
            const productId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== productId);
            }
            
            updateCart();
        }

        function increaseQuantity(e) {
            const productId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            item.quantity += 1;
            updateCart();
        }

        function removeItem(e) {
            const productId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        // Toggle Cart Modal
        function toggleCart() {
            cartModal.classList.toggle('active');
            overlay.classList.toggle('active');
        }

        // Load Cart from localStorage
        function loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
                updateCart();
            }
        }

        // Show Product Details
        function showProductDetails(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            productDetailsContainer.innerHTML = `
                <div class="product-details-img-container">
                    <img src="${product.image}" alt="${product.title}" class="product-details-img">
                </div>
                <div class="product-details-info">
                    <h2>${product.title}</h2>
                    <div class="product-details-price">${product.price.toFixed(2)}</div>
                    <p class="product-details-description">${product.description || 'No description available'}</p>
                    
                    <div class="size-options">
                        <h3>Size</h3>
                        <div class="size-buttons">
                            ${product.sizes ? product.sizes.map(size => `
                                <button class="size-btn">${size}</button>
                            `).join('') : '<p>One size</p>'}
                        </div>
                    </div>
                    
                    <button class="btn add-to-cart-details" data-id="${product.id}">Add to Cart</button>
                </div>
            `;

            // Add size selection functionality
            document.querySelectorAll('.size-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });

            // Add to cart from details
            document.querySelector('.add-to-cart-details')?.addEventListener('click', function() {
                const selectedSize = document.querySelector('.size-btn.selected')?.textContent;
                if (product.sizes && !selectedSize) {
                    alert('Please select a size');
                    return;
                }
                addToCart({ target: this });
                productModal.classList.remove('active');
            });

            productModal.classList.add('active');
        }

        // Event Listeners
        cartIcon.addEventListener('click', toggleCart);
        closeCart.addEventListener('click', toggleCart);
        overlay.addEventListener('click', function() {
            cartModal.classList.remove('active');
            productModal.classList.remove('active');
            overlay.classList.remove('active');
        });
        closeProductModal.addEventListener('click', function() {
            productModal.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Product click handler
        document.addEventListener('click', function(e) {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = parseInt(productCard.getAttribute('data-id'));
                showProductDetails(productId);
            }
        });

        // Initialize
        displayProducts();
        loadCart();

        