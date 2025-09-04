document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-links li a, .mobile-navbar .nav-item');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = e.currentTarget.getAttribute('href');

            const isLocalAnchor = href.startsWith('#');
            // Check if it's an anchor on the index.html on the current origin
            const isIndexPageAnchor = href.startsWith('/index.html#') && window.location.pathname === '/index.html';
            // Also check for category-page specific anchors (though typically they link to products or main categories)
            const isCategoryPageAnchor = (window.location.pathname.includes('/ferfi/') || window.location.pathname.includes('/noi/') || window.location.pathname.includes('/gyerek.html') || window.location.pathname.includes('/kiegeszitok.html')) && href.startsWith('#');


            if (isLocalAnchor || isIndexPageAnchor || isCategoryPageAnchor) {
                e.preventDefault();

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                let targetId = href.substring(href.lastIndexOf('#') + 1);
                
                // If linking to index.html from a sub-page, navigate first
                if (href.startsWith('/index.html#') && window.location.pathname !== '/index.html') {
                    window.location.href = href; 
                    return; 
                }

                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    window.scrollTo({
                        top: targetSection.offsetTop - navbarHeight - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const sections = document.querySelectorAll('main section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // Győződjünk meg róla, hogy a "home" szekció azonnal látható
        // A "home" szekció a hero szekció, aminek mindig láthatónak kell lennie betöltéskor
        if (section.id !== 'home') { // A hero szekciónak (home) ne adjuk hozzá a hidden osztályt
            section.classList.add('hidden');
        }
        observer.observe(section);
    });

    // Ez a hero-content már nem releváns az új hero szekció struktúrával
    // const heroContent = document.querySelector('.hero-content');
    // if (heroContent) {
    //     heroContent.style.opacity = '1';
    // }

    // Újdonságok szekció betöltése
    const newArrivalsGrid = document.getElementById('new-arrivals-product-grid'); // ID módosítva a HTML-ed alapján
    if (newArrivalsGrid) {
        fetch('/data.json') // Abszolút útvonal
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP hiba! Státusz: ${response.status}`);
                }
                return response.json();
            })
            .then(products => {
                // Szűrjük az újdonságokat az "is_new_arrival" mező alapján
                const newArrivals = products.filter(product => product.is_new_arrival === true);
                // VAGY: Ha csak az első néhányat akarod, ha nincs "is_new_arrival" mező:
                // const newArrivals = products.slice(0, 4); // Pl. az első 4 termék

                if (newArrivals.length === 0) {
                    newArrivalsGrid.innerHTML = '<p>Jelenleg nincsenek újdonságok.</p>';
                } else {
                    newArrivals.forEach(product => {
                        const productCard = `
                            <div class="product-card">
                                <a href="/product.html?id=${product.id}" class="product-link">
                                    <img src="/${product.images[0]}" alt="${product.name}" class="product-card-image">
                                    <h3 class="product-card-name">${product.name}</h3>
                                    <p class="product-card-price">${product.price}</p>
                                </a>
                                <button class="add-to-cart-btn">Kosárba</button>
                            </div>
                        `;
                        newArrivalsGrid.innerHTML += productCard;
                    });
                }
            })
            .catch(error => {
                console.error('Hiba az újdonságok betöltésekor:', error);
                newArrivalsGrid.innerHTML = '<p>Hiba történt az újdonságok betöltésekor. Kérjük, próbálja újra később.</p>';
            });
    }
});