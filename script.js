// Ano dinâmico
document.getElementById('year').textContent = new Date().getFullYear();

// Toggle de tema com persistência
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('span[aria-hidden]');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    icon.textContent = dark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label',
        dark ? 'Alternar para modo claro' : 'Alternar para modo escuro'
    );
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Inicializar tema
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(prefersDark.matches);
}

// Evento de clique
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(!isDark);
});

// Ouvir mudanças de preferência do sistema
prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches);
    }
});

// ========== Internacionalização (i18n) ==========
const translations = {
    pt: {
        skipLink: 'Pular para o conteúdo principal',
        themeLabel: 'Tema',
        heroTitle: 'Olá, eu sou <strong>Adler</strong> 👋',
        heroDesc: 'Desenvolvedor apaixonado por tecnologia, acessibilidade e boas práticas de desenvolvimento web.',
        aboutTitle: 'Sobre mim',
        aboutDesc: 'Sou um desenvolvedor com experiência em criar aplicações web modernas, performáticas e acessíveis. Acredito que a tecnologia deve ser inclusiva e que boas práticas de desenvolvimento fazem toda a diferença na experiência do usuário. Estou sempre em busca de aprender novas tecnologias e aprimorar minhas habilidades atuais.',
        contactTitle: 'Contato',
        contactDesc: 'Quer trocar uma ideia ou trabalhar junto? Entre em contato comigo pelo <a href="mailto:adlercoelhosantos12@gmail.com" class="text-sky-600 dark:text-sky-400 hover:underline font-medium">e-mail</a> ou pelas redes sociais acima. Estou sempre aberto a novas oportunidades e colaborações!',
        footerText: 'Feito com HTML semântico e acessível.',
        socialLabel: 'Redes sociais',
        langAriaLabel: 'Selecionar idioma',
        langTitle: 'Alternar idioma',
        themeToggleDark: 'Alternar para modo escuro',
        themeToggleLight: 'Alternar para modo claro',
    },
    en: {
        skipLink: 'Skip to main content',
        themeLabel: 'Theme',
        heroTitle: 'Hi, I\'m <strong>Adler</strong> 👋',
        heroDesc: 'Developer passionate for technology, accessibility, and web development best practices.',
        aboutTitle: 'About me',
        aboutDesc: 'I\'m a developer experienced in building modern, performant, and accessible web applications. I believe technology should be inclusive and that good development practices make all the difference in user experience. I\'m always looking to learn new technologies to improve my current skills.',
        contactTitle: 'Contact',
        contactDesc: 'Want to chat or work together? Reach me by <a href="mailto:adlercoelhosantos12@gmail.com" class="text-sky-600 dark:text-sky-400 hover:underline font-medium">email</a> or through my social links above. I\'m always open to new opportunities and collaborations!',
        footerText: 'Made with semantic and accessible HTML.',
        socialLabel: 'Social links',
        langAriaLabel: 'Select language',
        langTitle: 'Toggle language',
        themeToggleDark: 'Switch to dark mode',
        themeToggleLight: 'Switch to light mode',
    }
};

const langToggle = document.getElementById('lang-toggle');
const langFlag = langToggle.querySelector('span[aria-hidden]');
const langLabel = langToggle.querySelector('span.hidden');
let currentLang = localStorage.getItem('lang') || 'pt';

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    if (!t) return;

    // Update text content for data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });

    // Update innerHTML for data-i18n-html elements
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key]) el.innerHTML = t[key];
    });

    // Update social links aria-label
    const socialList = document.querySelector('ul[aria-label]');
    if (socialList) socialList.setAttribute('aria-label', t.socialLabel);

    // Update lang toggle button
    langFlag.textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
    langLabel.textContent = lang === 'pt' ? 'PT' : 'EN';
    langToggle.setAttribute('aria-label', t.langAriaLabel);
    langToggle.setAttribute('title', t.langTitle);

    // Update theme toggle aria-label
    const isDark = document.documentElement.classList.contains('dark');
    themeToggle.setAttribute('aria-label', isDark ? t.themeToggleLight : t.themeToggleDark);

    // Update html lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    localStorage.setItem('lang', lang);
}

// Initialize language
const savedLang = localStorage.getItem('lang') || 'pt';
setLanguage(savedLang);

// Language toggle click
langToggle.addEventListener('click', () => {
    const currentLang = localStorage.getItem('lang') || 'pt';
    setLanguage(currentLang === 'pt' ? 'en' : 'pt');
});

// Menu hamburger para mobile
// const menuToggle = document.getElementById('menu-toggle');
// const navMenu = document.getElementById('nav-menu');
// const menuIcon = document.getElementById('menu-icon');

// menuToggle.addEventListener('click', () => {
//     const isOpen = !navMenu.classList.contains('hidden');
//     navMenu.classList.toggle('hidden');
//     menuToggle.setAttribute('aria-expanded', !isOpen);
//     menuIcon.textContent = isOpen ? '☰' : '✕';
// });

// Fechar menu ao clicar em um link (mobile)
// navMenu.querySelectorAll('a').forEach(link => {
//     link.addEventListener('click', () => {
//         if (window.innerWidth < 640) {
//             navMenu.classList.add('hidden');
//             menuToggle.setAttribute('aria-expanded', 'false');
//             menuIcon.textContent = '☰';
//         }
//     });
// });

// Easter egg: triple click na foto de perfil
let clickCount = 0;
let clickTimer = null;
document.getElementById('profile-photo')?.addEventListener('click', () => {
    clickCount++;
    clearTimeout(clickTimer);
    if (clickCount === 3) {
        clickCount = 0;
        if (currentLang.trim().startsWith('pt')) {
            alert('Mari te amo muitão <3');
        } else {
            alert('Mari I love you so much <3');
        }
    } else {
        clickTimer = setTimeout(() => { clickCount = 0; }, 500);
    }
});
