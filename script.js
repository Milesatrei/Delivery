document.addEventListener('DOMContentLoaded', () => {
    // Gestione del menu del ristorante
    if (document.body.classList.contains('restaurant-menu-content')) {
        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get('restaurant');

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
                // AGGIORNATO: Percorso alla tua immagine Fast Burger
                image: 'images/Fast Burger.jpg'
            },
            'grill-master': {
                name: 'Grill Master',
                cuisine: 'Grill, BBQ',
                rating: '4.7',
                deliveryTime: '35-45 min',
                image: 'https://via.placeholder.com/400x200/FFC30B/333333?text=Grill+Master+Banner'
            },
            'pizza-palace': {
                name: 'Pizza Palace',
                cuisine: 'Pizza, Italiana',
                rating: '4.9',
                deliveryTime: '20-30 min',
                image: 'https://via.placeholder.com/400x200/DAF7A6/333333?text=Pizza+Palace+Banner'
            },
            'vegan-delight': {
                name: 'Vegan Delight',
                cuisine: 'Vegano, Salutare',
                rating: '4.5',
                deliveryTime: '30-40 min',
                image: 'https://via.placeholder.com/400x200/C70039/FFFFFF?text=Vegan+Delight+Banner'
            },
            'sushi-express': {
                name: 'Sushi Express',
                cuisine: 'Sushi, Giapponese',
                rating: '4.6',
                deliveryTime: '40-50 min',
                image: 'https://via.placeholder.com/400x200/900C3F/FFFFFF?text=Sushi+Express+Banner'
            },
            'taco-fiesta': {
                name: 'Taco Fiesta',
                cuisine: 'Messicano, Tacos',
                rating: '4.2',
                deliveryTime: '25-35 min',
                image: 'https://via.placeholder.com/400x200/581845/FFFFFF?text=Taco+Fiesta+Banner'
            },
            'pasta-amore': {
                name: 'Pasta Amore',
                cuisine: 'Pasta, Italiana',
                rating: '4.7',
                deliveryTime: '30-40 min',
                image: 'https://via.placeholder.com/400x200/FF5733/FFFFFF?text=Pasta+Amore+Banner'
            },
            'healthy-bites': {
                name: 'Healthy Bites',
                cuisine: 'Salutare, Insalate',
                rating: '4.5',
                deliveryTime: '20-30 min',
                image: 'https://via.placeholder.com/400x200/C70039/FFFFFF?text=Healthy+Bites+Banner'
            },
            'urban-burger': {
                name: 'Urban Burger',
                cuisine: 'Hamburger, Vegan',
                rating: '4.4',
                deliveryTime: '30-40 min',
                image: 'https://via.placeholder.com/400x200/92A8D1/FFFFFF?text=Urban+Burger'
            }
        };


        const restaurant = restaurantsData[restaurantId];

        if (restaurant) {
            // Aggiorna il banner del ristorante
            const bannerImage = document.getElementById('restaurant-banner-image');
            if (bannerImage) {
                bannerImage.src = restaurant.image;
                bannerImage.alt = `Banner di ${restaurant.name}`;
            }

            // Aggiorna i dettagli del ristorante nell'overlay
            const restaurantNameOverlay = document.getElementById('restaurant-name-overlay');
            if (restaurantNameOverlay) {
                restaurantNameOverlay.textContent = restaurant.name;
            }

            const restaurantCuisineOverlay = document.getElementById('restaurant-cuisine-overlay');
            if (restaurantCuisineOverlay) {
                restaurantCuisineOverlay.textContent = `Cucina: ${restaurant.cuisine}`;
            }

            const restaurantRatingOverlay = document.getElementById('restaurant-rating-overlay');
            if (restaurantRatingOverlay) {
                restaurantRatingOverlay.textContent = restaurant.rating;
            }

            const restaurantDeliveryTimeOverlay = document.getElementById('restaurant-delivery-time-overlay');
            if (restaurantDeliveryTimeOverlay) {
                restaurantDeliveryTimeOverlay.textContent = restaurant.deliveryTime;
            }

            // Aggiorna il nome del ristorante nell'header
            const restaurantNameHeader = document.getElementById('restaurant-name-header');
            if (restaurantNameHeader) {
                restaurantNameHeader.textContent = restaurant.name;
            }
        } else {
            console.error('Ristorante non trovato:', restaurantId);
            // Reindirizza o mostra un messaggio di errore se il ristorante non esiste
            // window.location.href = 'index.html';
        }

        // Gestione dell'aggiunta al carrello
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
        const menuNavItems = document.querySelectorAll('.menu-nav a'); // Assicurati che questo selettore sia corretto per la tua navbar del menu
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
