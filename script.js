/* ==============================================
   Portfólio Adler Coelho — script.js
   ============================================== */

// ── Ano dinâmico ──────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Toggle de tema com persistência ───────────────
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
    themeToggle?.setAttribute('aria-label',
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

themeToggle?.addEventListener('click', () => {
    setTheme(!document.documentElement.classList.contains('dark'));
});

prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) setTheme(e.matches);
});

// ── i18n ──────────────────────────────────────────
const translations = {
    pt: {
        skipLink: 'Pular para o conteúdo principal',
        themeLabel: 'Tema',
        navAbout: 'Sobre',
        navProjects: 'Projetos',
        navStack: 'Stack',
        navContact: 'Contato',
        availableBadge: 'On-line',
        heroTitle: 'Olá, eu sou <strong class="efeito-escrita text-gradient font-mono">Adler</strong><span class="animate-blink" style="color: var(--accent);">_</span>',
        heroDesc: 'Desenvolvedor apaixonado por tecnologia, acessibilidade e boas práticas de desenvolvimento web.',
        contactBtnLabel: 'Contato',
        aboutTitle: 'Sobre mim',
        aboutDesc: 'Sou um desenvolvedor com experiência em criar aplicações web modernas, performáticas e acessíveis. Acredito que a tecnologia deve ser inclusiva e que boas práticas de desenvolvimento fazem toda a diferença na experiência do usuário. Estou sempre em busca de aprender novas tecnologias e aprimorar minhas habilidades atuais.',
        metricA11y: 'Acessibilidade WCAG',
        metricVitals: 'Web Vitals (LCP/FID/CLS)',
        metricCode: 'Clean Code',
        stackTitle: 'Stack & Habilidades',
        projectsTitle: 'Meus Projetos',
        projectStatus: 'Ativo / Em produção',
        meuCofrinSubtitle: 'Controle suas finanças com inteligência',
        meuCofrinDesc: 'Um projeto de finanças pessoais desenvolvido para ajudar no controle de gastos e planejamento financeiro de forma simples e intuitiva.',
        meuCofrinLink: 'Acessar site',
        githubBtn: 'Ver código',
        contactTitle: 'Contato',
        contactCTA: 'Vamos construir algo juntos?',
        contactSubtitle: 'Estou disponível para novos projetos, oportunidades e colaborações. Me chama!',
        sendEmailBtn: 'Enviar mensagem',
        copyEmailBtn: 'Copiar e-mail',
        copyEmailSuccess: 'E-mail copiado! ✓',
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
        navAbout: 'About',
        navProjects: 'Projects',
        navStack: 'Stack',
        navContact: 'Contact',
        availableBadge: 'On-line',
        heroTitle: 'Hi, I\'m <strong class="efeito-escrita text-gradient font-mono">Adler</strong><span class="animate-blink" style="color: var(--accent);">_</span>',
        heroDesc: 'Developer passionate for technology, accessibility, and web development best practices.',
        contactBtnLabel: 'Contact',
        aboutTitle: 'About me',
        aboutDesc: 'I\'m a developer experienced in building modern, performant, and accessible web applications. I believe technology should be inclusive and that good development practices make all the difference in user experience. I\'m always looking to learn new technologies to improve my current skills.',
        metricA11y: 'Accessibility WCAG',
        metricVitals: 'Web Vitals (LCP/FID/CLS)',
        metricCode: 'Clean Code',
        stackTitle: 'Stack & Skills',
        projectsTitle: 'Projects',
        projectStatus: 'Active / In production',
        meuCofrinSubtitle: 'Smartly control your finances',
        meuCofrinDesc: 'A personal finance project developed to help with spending control and financial planning in a simple and intuitive way.',
        meuCofrinLink: 'Access site',
        githubBtn: 'View code',
        contactTitle: 'Contact',
        contactCTA: 'Let\'s build something together?',
        contactSubtitle: 'I\'m available for new projects, opportunities and collaborations. Reach out!',
        sendEmailBtn: 'Send message',
        copyEmailBtn: 'Copy e-mail',
        copyEmailSuccess: 'Email copied! ✓',
        footerText: 'Made with semantic and accessible HTML.',
        socialLabel: 'Social links',
        langAriaLabel: 'Select language',
        langTitle: 'Toggle language',
        themeToggleDark: 'Switch to dark mode',
        themeToggleLight: 'Switch to light mode',
    }
};

const langToggle = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'pt';

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    if (!t) return;

    // data-i18n (textContent)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });

    // data-i18n-html (innerHTML)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // lang toggle button
    if (langToggle) {
        const flagSpan = langToggle.querySelector('span[aria-hidden]');
        const labelSpan = langToggle.querySelector('span.hidden, span.sm\\:inline');
        if (flagSpan) flagSpan.textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
        if (labelSpan) labelSpan.textContent = lang === 'pt' ? 'PT' : 'EN';
        langToggle.setAttribute('aria-label', t.langAriaLabel);
        langToggle.setAttribute('title', t.langTitle);
    }

    // theme toggle
    const isDark = document.documentElement.classList.contains('dark');
    themeToggle?.setAttribute('aria-label', isDark ? t.themeToggleLight : t.themeToggleDark);

    // html lang
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    localStorage.setItem('lang', lang);
}

// Init
setLanguage(currentLang);

langToggle?.addEventListener('click', () => {
    const cur = localStorage.getItem('lang') || 'pt';
    setLanguage(cur === 'pt' ? 'en' : 'pt');
});

// ── Copiar e-mail ──────────────────────────────────
const copyEmailBtn = document.getElementById('copy-email-btn');
const copyEmailLabel = document.getElementById('copy-email-label');
const EMAIL = 'adlercoelhosantos12@gmail.com';

copyEmailBtn?.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(EMAIL);
        const t = translations[currentLang];
        if (copyEmailLabel) {
            const original = copyEmailLabel.textContent;
            copyEmailLabel.textContent = t.copyEmailSuccess || 'Copiado! ✓';
            copyEmailBtn.style.background = 'rgba(34,197,94,0.2)';
            copyEmailBtn.style.borderColor = 'rgba(34,197,94,0.4)';
            setTimeout(() => {
                copyEmailLabel.textContent = original;
                copyEmailBtn.style.background = '';
                copyEmailBtn.style.borderColor = '';
            }, 2500);
        }
    } catch {
        // Fallback for older browsers
        const el = document.createElement('input');
        el.value = EMAIL;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
});

// ── Bottom Nav: active state on scroll ────────────────
const sections = ['sobre', 'projetos', 'stack', 'contato'];
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

function updateBottomNav() {
    if (window.innerWidth >= 1024) return; // desktop: skip

    let current = '';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) current = id;
    });

    bottomNavItems.forEach(item => {
        const sec = item.getAttribute('data-section');
        item.classList.toggle('active', sec === current);
    });
}

window.addEventListener('scroll', updateBottomNav, { passive: true });
updateBottomNav();

// ── Easter egg: triple-click on profile photo ──────────
let clickCount = 0;
let clickTimer = null;

function handleProfileClick() {
    clickCount++;
    clearTimeout(clickTimer);
    if (clickCount === 3) {
        clickCount = 0;
        if (currentLang.startsWith('pt')) {
            alert('Mari te amo muitão <3');
        } else {
            alert('Mari I love you so much <3');
        }
    } else {
        clickTimer = setTimeout(() => { clickCount = 0; }, 600);
    }
}

document.getElementById('profile-photo')?.addEventListener('click', handleProfileClick);
document.getElementById('profile-photo-mobile')?.addEventListener('click', handleProfileClick);
