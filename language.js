// This file should be saved as a .js file, e.g., 'language-switcher.js'

// Create gear menu container
const gearContainer = document.createElement('div');
gearContainer.innerHTML = `
    <img src="https://cdn-icons-png.flaticon.com/512/2099/2099058.png" class="gear" alt="Settings">
    <div class="gear-menu" id="gearMenu">
        <button onclick="setLanguage('en')">English</button>
        <button onclick="setLanguage('es')">Español</button>
    </div>
`;
document.body.appendChild(gearContainer);

// Add gear CSS
const style = document.createElement('style');
style.textContent = `
    .gear {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 32px;
        height: 32px;
        cursor: pointer;
        z-index: 50;
        filter: brightness(0) invert(1);
    }
    .gear-menu {
        position: fixed;
        bottom: 60px;
        right: 20px;
        background: #222;
        color: white;
        padding: 10px;
        border-radius: 8px;
        display: none;
        flex-direction: column;
        gap: 5px;
        font-size: 0.9em;
        z-index: 50;
    }
    .gear-menu button {
        background: #333;
        color: white;
        border: none;
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
    }
    .gear-menu button:hover {
        background: #555;
    }
`;
document.head.appendChild(style);

// Toggle menu
const gearIcon = gearContainer.querySelector('.gear');
const gearMenu = gearContainer.querySelector('#gearMenu');

gearIcon.addEventListener('click', (e) => {
    gearMenu.style.display = gearMenu.style.display === 'flex' ? 'none' : 'flex';
    e.stopPropagation();
});

// Language switching function (also closes menu)
function setLanguage(lang) {
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-en]').forEach(el => {
        if (el.tagName.toLowerCase() === 'title') {
            document.title = lang === 'en' ? el.dataset.en : el.dataset.es;
        } else if (el.tagName.toLowerCase() === 'input' && el.placeholder) {
            el.placeholder = lang === 'en' ? el.dataset.en : el.dataset.es;
        } else {
            el.textContent = lang === 'en' ? el.dataset.en : el.dataset.es;
        }
    });

    gearMenu.style.display = 'none';
}

// Close menu when clicking anywhere else
document.addEventListener('click', () => {
    gearMenu.style.display = 'none';
});

// Prevent clicks inside menu from closing it
gearMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Apply saved or auto-detected language on load
const savedLang = localStorage.getItem('lang');
let initialLang;

if (savedLang) {
    initialLang = savedLang;
} else {
    const browserLang = navigator.language.split('-')[0];
    initialLang = browserLang === 'es' ? 'es' : 'en';
}

setLanguage(initialLang);