document.addEventListener('DOMContentLoaded', () => {

    // --- Gestione del caricamento dei dati del ristorante sulla pagina del menu ---
    // Questa sezione si attiva solo se la pagina corrente è quella del menu del ristorante.
    if (document.body.classList.contains('restaurant-menu-content')) {
        const urlParams = new URLSearchParams(window.location.search);
        // CORREZIONE FONDAMENTALE: Si recupera l'ID del ristorante dal parametro 'id'
        // come passato dall'HTML (e.g., restaurant-menu.html?id=burger-house).
        const restaurantId = urlParams.get('id');

        // Dati fittizi dei ristoranti per il caricamento dinamico
        // In un'applicazione reale, questi dati verrebbero da un'API o un database.
        const restaurantsData = {
            'burger-house': {
                name: 'Burger House',
                cuisine: 'Hamburger, Americano',
                rating: '4.8',
                deliveryTime: '25-35 min',
                image: 'images/Burger House.jpg' // Percorso immagine locale
            },
            'the-burger-joint': {
                name: 'The Burger Joint',
                cuisine: 'Hamburger Gourmet',
                rating: '4.6',
                deliveryTime: '30-40 min',
                image: 'images/Burger Joint.jpg' // Percorso immagine locale
            },
            'fast-burger': {
                name: 'Fast Burger',
                cuisine: 'Hamburger, Fast Food',
                rating: '4.3',
                deliveryTime: '20-30 min',
                image: 'images/Fast Burger.jpg' // Percorso immagine locale
            },
            'grill-master': {
                name: 'Grill Master',
                cuisine: 'Grill, Hamburger, Carne',
                rating: '4.5',
                deliveryTime: '35-45 min',
                image: 'images/Grill Master.jpg' // Percorso immagine locale
            },
            'urban-burger': {
                name: 'Urban Burger',
                cuisine: 'Hamburger, Vegan',
                rating: '4.4',
                deliveryTime: '30-40 min',
                image: 'images/Urban Burger.jpg' // Percorso immagine locale
            }
        };

        // Elementi della pagina da aggiornare con i dati del ristorante
        const restaurantNameHeader = document.getElementById('restaurant-name-header');
        const restaurantNameOverlay = document.getElementById('restaurant-name-overlay');
        const restaurantCuisineOverlay = document.getElementById('restaurant-cuisine-overlay');
        const restaurantRatingOverlay = document.getElementById('restaurant-rating-overlay');
        const restaurantDeliveryTimeOverlay = document.getElementById('restaurant-delivery-time-overlay');
        const restaurantBannerImage = document.getElementById('restaurant-banner-image');

        // Carica i dettagli del ristorante se l'ID è valido
        if (restaurantId && restaurantsData[restaurantId]) {
            const restaurant = restaurantsData[restaurantId];
            if (restaurantNameHeader) restaurantNameHeader.textContent = restaurant.name;
            if (restaurantNameOverlay) restaurantNameOverlay.textContent = restaurant.name;
            if (restaurantCuisineOverlay) restaurantCuisineOverlay.textContent = 'Cucina: ' + restaurant.cuisine;
            if (restaurantRatingOverlay) restaurantRatingOverlay.textContent = restaurant.rating;
            if (restaurantDeliveryTimeOverlay) restaurantDeliveryTimeOverlay.textContent = restaurant.deliveryTime;
            // Assicurati che il percorso dell'immagine sia corretto e esista
            if (restaurantBannerImage) restaurantBannerImage.src = restaurant.image;
            // Aggiorna il titolo della pagina nel browser
            document.title = `Menu ${restaurant.name} - Carpet Courier`;
        } else {
            // Gestisce il caso in cui l'ID del ristorante non sia valido o non trovato
            console.warn(`ID ristorante non valido o non trovato: ${restaurantId}`);
            if (restaurantNameHeader) restaurantNameHeader.textContent = 'Ristorante non trovato';
            if (restaurantNameOverlay) restaurantNameOverlay.textContent = 'Ristorante non trovato';
            if (restaurantCuisineOverlay) restaurantCuisineOverlay.textContent = 'Cucina: N/D';
            if (restaurantRatingOverlay) restaurantRatingOverlay.textContent = 'N/D';
            if (restaurantDeliveryTimeOverlay) restaurantDeliveryTimeOverlay.textContent = 'N/D';
            // Immagine di fallback per ristorante non trovato
            if (restaurantBannerImage) restaurantBannerImage.src = 'https://via.placeholder.com/400x200/FF0000/FFFFFF?text=Ristorante+Non+Trovato';
            document.title = 'Menu - Ristorante Non Trovato';
        }

        // --- Gestione della navigazione delle categorie del menu (scroll & highlight) ---
        const menuNavItems = document.querySelectorAll('.menu-nav-item');
        const headerHeight = document.querySelector('.app-header')?.offsetHeight || 0;
        const navHeight = document.querySelector('.menu-categories-nav')?.offsetHeight || 0;
        // L'offset tiene conto dell'altezza dell'header fisso e della nav sticky, più un piccolo padding.
        const scrollOffset = headerHeight + navHeight + 20;

        menuNavItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault(); // Previene il comportamento di default del link
                
                // Rimuove la classe 'active' da tutti gli elementi di navigazione
                menuNavItems.forEach(nav => nav.classList.remove('active'));
                // Aggiunge la classe 'active' all'elemento cliccato
                this.classList.add('active');
                
                // Scorri alla sezione corrispondente
                const targetId = this.getAttribute('href'); // e.g., "#hamburger"
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - scrollOffset,
                        behavior: 'smooth' // Animazione di scorrimento fluida
                    });
                }
            });
        });

        // --- Simulazione aggiunta al carrello ---
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        const cartCountElement = document.querySelector('.cart-count');
        let currentCartCount = 0; // Inizializza il contatore del carrello

        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentCartCount++;
                cartCountElement.textContent = currentCartCount;
                // Aggiunge una classe per l'animazione "pop" sul conteggio del carrello
                cartCountElement.classList.add('animate-pop');
                // Rimuove la classe dopo l'animazione per poterla riapplicare
                cartCountElement.addEventListener('animationend', () => {
                    cartCountElement.classList.remove('animate-pop');
                }, { once: true }); // 'once: true' per far sì che l'event listener si attivi una sola volta

                console.log('Piatto aggiunto al carrello! Conteggio:', currentCartCount);
                // Puoi mostrare un piccolo toast o una notifica qui invece di un alert()
            });
        });

        // --- Aggiornamento della categoria attiva nella nav del menu durante lo scroll ---
        const menuSections = document.querySelectorAll('.menu-section');
        const observerOptions = {
            root: null, // L'elemento che è l'area di visualizzazione (viewport)
            // La sezione viene considerata "intersecting" quando il 30% della sezione è visibile
            // e c'è un margine di -scrollOffset px dal top, per compensare l'header/nav fisse.
            // Regola questo valore per una migliore esperienza utente a seconda del layout.
            rootMargin: `-${scrollOffset}px 0px -30% 0px`, 
            threshold: 0.1 // Almeno il 10% della sezione deve essere visibile
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Rimuove 'active' da tutti e aggiunge alla sezione corrente
                    menuNavItems.forEach(item => item.classList.remove('active'));
                    const correspondingNavItem = document.querySelector(`.menu-nav-item[href="#${entry.target.id}"]`);
                    if (correspondingNavItem) {
                        correspondingNavItem.classList.add('active');
                        // Scorri la nav orizzontale per rendere visibile l'elemento attivo
                        correspondingNavItem.scrollIntoView({
                            behavior: 'smooth',
                            inline: 'center' // Centra l'elemento nella vista orizzontale
                        });
                    }
                }
            });
        }, observerOptions);

        menuSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // --- Gestione della navigazione principale globale (se presente sulla pagina) ---
    // Questa parte di codice si applica se hai una navbar globale (come in index.html).
    // Puoi espandere qui la logica per la pagina index.html se necessario.
    const appNavItems = document.querySelectorAll('.app-navbar .nav-item');
    // Esempio: gestire l'attivazione della nav item in base alla pagina corrente
    const currentPath = window.location.pathname.split('/').pop(); // Ottiene il nome del file (e.g., "index.html")

    appNavItems.forEach(item => {
        // Rimuovi 'active' da tutti per evitare duplicati all'inizio
        item.classList.remove('active');
        // Aggiunge 'active' se il href corrisponde alla pagina corrente
        if (item.getAttribute('href') === currentPath ||
            (currentPath === 'restaurant-menu.html' && item.querySelector('i.fas.fa-search'))) {
            // Logica specifica: se sei sulla pagina del menu (restaurant-menu.html),
            // potresti voler mantenere attiva l'icona "Cerca" nella navbar inferiore,
            // dato che questa pagina è raggiunta tramite la ricerca/selezione di un ristorante.
            item.classList.add('active');
        }
    });

    // --- Altre logiche globali o per altre pagine possono andare qui ---
    // Esempio: Gestione della search bar sulla home page
    if (document.body.classList.contains('home-page-content')) { // Assumi che la home abbia questa classe
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                // Qui potresti filtrare dinamicamente la lista dei ristoranti
                console.log('Ricerca in corso:', searchTerm);
                // Esempio: restaurantCards.forEach(card => { ... logica di filtraggio ... });
            });
        }
    }
});
