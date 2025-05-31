document.addEventListener('DOMContentLoaded', () => {
    // Gestione del menu del ristorante
    if (document.body.classList.contains('restaurant-menu-content')) {
        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get('id');

        const restaurantsData = {
            'burger-house': {
                name: 'Burger House',
                cuisine: 'Hamburger, Americano',
                rating: '4.8',
                deliveryTime: '25-35 min',
                image: 'https://via.placeholder.com/400x200/FF6F61/FFFFFF?text=Burger+House+Banner'
            },
            'the-burger-joint': {
                name: 'The Burger Joint',
                cuisine: 'Hamburger Gourmet',
                rating: '4.6',
                deliveryTime: '30-40 min',
                image: 'https://via.placeholder.com/400x200/6B5B95/FFFFFF?text=The+Burger+Joint+Banner'
            },
            'fast-burger': {
                name: 'Fast Burger',
                cuisine: 'Hamburger, Fast Food',
                rating: '4.3',
                deliveryTime: '20-30 min',
                image: 'https://via.placeholder.com/400x200/88B04B/FFFFFF?text=Fast+Burger+Banner'
            },
            'grill-master': {
                name: 'Grill Master',
                cuisine: 'Grill, Hamburger, Carne',
                rating: '4.5',
                deliveryTime: '35-45 min',
                image: 'https://via.placeholder.com/400x200/F7CAC9/FFFFFF?text=Grill+Master+Banner'
            },
            'urban-burger': {
                name: 'Urban Burger',
                cuisine: 'Hamburger, Vegan',
                rating: '4.4',
                deliveryTime: '30-40 min',
                image: 'https://via.placeholder.com/400x200/92A8D1/FFFFFF?text=Urban+Burger+Banner'
            }
        };

        if (restaurantId && restaurantsData[restaurantId]) {
            const restaurant = restaurantsData[restaurantId];
            document.getElementById('restaurant-name-header').textContent = restaurant.name;
            document.getElementById('restaurant-name-overlay').textContent = restaurant.name;
            document.getElementById('restaurant-cuisine-overlay').textContent = 'Cucina: ' + restaurant.cuisine;
            document.getElementById('restaurant-rating-overlay').textContent = restaurant.rating;
            document.getElementById('restaurant-delivery-time-overlay').textContent = restaurant.deliveryTime;
            document.getElementById('restaurant-banner-image').src = restaurant.image;
        } else {
            // Reindirizza o mostra un messaggio di errore se il ristorante non è trovato
            document.getElementById('restaurant-name-header').textContent = 'Ristorante non trovato';
            document.getElementById('restaurant-name-overlay').textContent = 'Ristorante non trovato';
        }

        // Gestione scorrimento automatico alle sezioni del menu
        const menuNavItems = document.querySelectorAll('.menu-nav-item');
        menuNavItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                menuNavItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Scorrimento aggiustato per la barra fissa
                    const headerHeight = document.querySelector('.app-header').offsetHeight;
                    const navHeight = document.querySelector('.menu-categories-nav').offsetHeight;
                    const offset = headerHeight + navHeight + 20; // + un po' di padding
                    window.scrollTo({
                        top: targetSection.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Simula l'aggiunta al carrello
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        const cartCount = document.querySelector('.cart-count');
        let currentCartCount = 0;

        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentCartCount++;
                cartCount.textContent = currentCartCount;
                // Puoi aggiungere un'animazione o un messaggio di conferma qui
                alert('Piatto aggiunto al carrello!');
            });
        });

        // Aggiorna la sezione attiva della navbar del menu durante lo scroll
        const sections = document.querySelectorAll('.menu-section');
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -70% 0px', // Attiva quando il 30% della sezione è visibile
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    menuNavItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${entry.target.id}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

    }
});
