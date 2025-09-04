// js/merettablazat.js

document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const unitButtons = document.querySelectorAll('.unit-btn');
    const sizeChartDisplay = document.getElementById('size-chart-display');

    let currentCategory = 'general'; // Alapértelmezett kategória
    let currentUnit = 'cm';       // Alapértelmezett mértékegység

    // Mérettáblázat adatok (ezt lehetne egy külön JSON fájlból is betölteni, ha nagyon sok van)
    const sizeChartData = {
        general: {
            cm: {
                headers: ['Méret', 'Mell (cm)', 'Derék (cm)', 'Csípő (cm)'],
                rows: [
                    ['XS', '80-84', '60-64', '86-90'],
                    ['S', '84-88', '64-68', '90-94'],
                    ['M', '88-92', '68-72', '94-98'],
                    ['L', '92-96', '72-76', '98-102'],
                    ['XL', '96-100', '76-80', '102-106']
                ]
            },
            inch: {
                headers: ['Méret', 'Mell (inch)', 'Derék (inch)', 'Csípő (inch)'],
                rows: [
                    ['XS', '31.5-33', '23.5-25', '34-35.5'],
                    ['S', '33-34.5', '25-26.5', '35.5-37'],
                    ['M', '34.5-36', '26.5-28', '37-38.5'],
                    ['L', '36-37.5', '28-29.5', '38.5-40'],
                    ['XL', '37.5-39.5', '29.5-31.5', '40-41.5']
                ]
            }
        },
        male: {
            cm: {
                headers: ['Méret', 'Nyak (cm)', 'Mell (cm)', 'Derék (cm)', 'Csípő (cm)', 'Belső szár (cm)'],
                rows: [
                    ['S', '37-38', '92-96', '76-80', '92-96', '80'],
                    ['M', '39-40', '96-100', '80-84', '96-100', '81'],
                    ['L', '41-42', '100-104', '84-88', '100-104', '82'],
                    ['XL', '43-44', '104-108', '88-92', '104-108', '83'],
                    ['2XL', '45-46', '108-112', '92-96', '108-112', '84']
                ]
            },
            inch: {
                headers: ['Méret', 'Nyak (inch)', 'Mell (inch)', 'Derék (inch)', 'Csípő (inch)', 'Belső szár (inch)'],
                rows: [
                    ['S', '14.5-15', '36-38', '30-31.5', '36-38', '31.5'],
                    ['M', '15.5-16', '38-39.5', '31.5-33', '38-39.5', '32'],
                    ['L', '16-16.5', '39.5-41', '33-34.5', '39.5-41', '32.5'],
                    ['XL', '17-17.5', '41-42.5', '34.5-36', '41-42.5', '33'],
                    ['2XL', '17.5-18', '42.5-44', '36-37.5', '42.5-44', '33.5']
                ]
            }
        },
        female: {
            cm: {
                headers: ['Méret', 'Mell (cm)', 'Derék (cm)', 'Csípő (cm)'],
                rows: [
                    ['XS (34)', '82-85', '63-66', '88-91'],
                    ['S (36)', '86-89', '67-70', '92-95'],
                    ['M (38)', '90-93', '71-74', '96-99'],
                    ['L (40)', '94-97', '75-78', '100-103'],
                    ['XL (42)', '98-102', '79-83', '104-108']
                ]
            },
            inch: {
                headers: ['Méret', 'Mell (inch)', 'Derék (inch)', 'Csípő (inch)'],
                rows: [
                    ['XS (34)', '32.5-33.5', '25-26', '34.5-35.5'],
                    ['S (36)', '34-35', '26.5-27.5', '36-37.5'],
                    ['M (38)', '35.5-36.5', '28-29', '38-39'],
                    ['L (40)', '37-38.5', '29.5-30.5', '39.5-40.5'],
                    ['XL (42)', '39-40', '31-32.5', '41-42.5']
                ]
            }
        },
        kids: {
            cm: {
                headers: ['Méret', 'Életkor (év)', 'Magasság (cm)', 'Mell (cm)', 'Derék (cm)'],
                rows: [
                    ['86', '1-2', '81-86', '50-52', '48-50'],
                    ['92', '2-3', '87-92', '52-54', '50-52'],
                    ['98', '3-4', '93-98', '54-56', '52-54'],
                    ['104', '4-5', '99-104', '56-58', '54-56'],
                    ['110', '5-6', '105-110', '58-60', '56-58']
                ]
            },
            inch: {
                headers: ['Méret', 'Életkor (év)', 'Magasság (inch)', 'Mell (inch)', 'Derék (inch)'],
                rows: [
                    ['86', '1-2', '32-34', '19.5-20.5', '19-19.5'],
                    ['92', '2-3', '34.5-36', '20.5-21', '19.5-20.5'],
                    ['98', '3-4', '36.5-38.5', '21-22', '20.5-21'],
                    ['104', '4-5', '39-41', '22-23', '21-22'],
                    ['110', '5-6', '41.5-43.5', '23-23.5', '22-23']
                ]
            }
        },
        accessories: {
            cm: {
                headers: ['Típus', 'Méret', 'Körfogat (cm)'],
                rows: [
                    ['Öv', 'S', '70-80'],
                    ['Öv', 'M', '80-90'],
                    ['Öv', 'L', '90-100'],
                    ['Öv', 'XL', '100-110'],
                    ['Sál', 'Egy méret', '180x70'],
                    ['Sapka', 'Egy méret', '56-59'],
                    ['Kesztyű', 'S', '18-19'],
                    ['Kesztyű', 'M', '19-20'],
                    ['Kesztyű', 'L', '20-21']
                ]
            },
            inch: {
                headers: ['Típus', 'Méret', 'Körfogat (inch)'],
                rows: [
                    ['Öv', 'S', '27.5-31.5'],
                    ['Öv', 'M', '31.5-35.5'],
                    ['Öv', 'L', '35.5-39.5'],
                    ['Öv', 'XL', '39.5-43.5'],
                    ['Sál', 'Egy méret', '71x27.5'],
                    ['Sapka', 'Egy méret', '22-23'],
                    ['Kesztyű', 'S', '7-7.5'],
                    ['Kesztyű', 'M', '7.5-8'],
                    ['Kesztyű', 'L', '8-8.5']
                ]
            }
        }
    };

    function renderTable(category, unit) {
        const data = sizeChartData[category][unit];
        if (!data) {
            sizeChartDisplay.innerHTML = '<p>Nincs elérhető mérettáblázat ehhez a kategóriához/mértékegységhez.</p>';
            return;
        }

        let tableHTML = '<table><thead><tr>';
        data.headers.forEach(header => {
            tableHTML += `<th>${header}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';

        data.rows.forEach(row => {
            tableHTML += '<tr>';
            row.forEach(cell => {
                tableHTML += `<td>${cell}</td>`;
            });
            tableHTML += '</tr>';
        });
        tableHTML += '</tbody></table>';
        sizeChartDisplay.innerHTML = tableHTML;
    }

    // Gombkezelők hozzáadása
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            renderTable(currentCategory, currentUnit);
        });
    });

    unitButtons.forEach(button => {
        button.addEventListener('click', () => {
            unitButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentUnit = button.dataset.unit;
            renderTable(currentCategory, currentUnit);
        });
    });

    // Kezdeti táblázat renderelése az oldal betöltésekor
    renderTable(currentCategory, currentUnit);
});

// A globális script.js-ből átmozgatva, ha a merettablazat.html is használja a burger menüt
// Fontos: Győződj meg róla, hogy a script.js-ben EZ a rész ne ismétlődjön,
// különben kétszer lesz kezelő hozzáadva, ami problémákat okozhat.
// Ideiglenesen bemásolom, de ha a script.js-t minden oldalon betöltöd,
// akkor onnan kell, hogy jöjjön, vagy külön függvénybe szervezni.
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Külön navLinks a mobil navbarhoz (ha van)
    const mobileNavLinks = document.querySelectorAll('.mobile-navbar .nav-item');
    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active'); // Bezárja a menüt mobilon
                }
            });
        });
    }

    // A globális navigációs linkek kattintásának kezelése (ha a script.js-ből jön)
    const allNavLinks = document.querySelectorAll('.nav-links li a, .mobile-navbar .nav-item');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = e.currentTarget.getAttribute('href');

            const isLocalAnchor = href.startsWith('#');
            const isIndexPageAnchor = href.startsWith('/index.html#') && window.location.pathname === '/index.html';
            const isCategoryPageAnchor = (window.location.pathname.includes('/ferfi/') || window.location.pathname.includes('/noi/') || window.location.pathname.includes('/gyerek.html') || window.location.pathname.includes('/kiegeszitok.html')) && href.startsWith('#');

            if (isLocalAnchor || isIndexPageAnchor || isCategoryPageAnchor) {
                e.preventDefault();

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                let targetId = href.substring(href.lastIndexOf('#') + 1);
                
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
            } else if (href.startsWith('/merettablazat.html')) { // Speciális kezelés a mérettáblázathoz
                // Ha a mérettáblázat linkjére kattintunk, egyszerűen navigálunk
                window.location.href = href;
            }
        });
    });
});