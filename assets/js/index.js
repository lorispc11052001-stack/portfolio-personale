(function () {
      const STORAGE_KEYS = {
        theme: 'lb-theme',
        language: 'lb-language'
      };
      const SUPPORTED_LANGUAGES = ['it', 'en'];
      const DEFAULT_LANGUAGE = 'it';
      const PHONE_MEDIA_QUERY = '(max-width: 640px)';
      const PAGE_TITLES = {
        it: 'Loris Battaglini | Full-Stack Web Developer',
        en: 'Loris Battaglini | Full-Stack Web Developer'
      };
      const DYNAMIC_STRINGS = {
        it: {
          themeToggleAriaLabelLight: 'Attiva modalità scura',
          themeToggleAriaLabelDark: 'Torna alla modalità chiara',
          projectsShowAllButton: 'Vedi tutti i progetti',
          projectsHideAllButton: 'Torna alla griglia base',
          sliderPauseButton: 'Pausa',
          sliderResumeButton: 'Riprendi',
          formSubmitButton: 'Invia il messaggio',
          formSubmittingButton: 'Invio in corso...',
          formServiceUnavailable: 'Servizio invio non disponibile. Riprova tra qualche minuto.',
          formConfigMissing: 'Configura EmailJS nel tag form prima di inviare messaggi reali.',
          formPublicKeyInvalid: 'Public key non valida: inserisci la Public Key API di EmailJS, non la tua email.',
          formSubmitErrorPrefix: 'Invio non riuscito. Controlla la configurazione EmailJS e riprova.'
        },
        en: {
          themeToggleAriaLabelLight: 'Enable dark mode',
          themeToggleAriaLabelDark: 'Back to light mode',
          projectsShowAllButton: 'See all projects',
          projectsHideAllButton: 'Back to base grid',
          sliderPauseButton: 'Pause',
          sliderResumeButton: 'Resume',
          formSubmitButton: 'Send message',
          formSubmittingButton: 'Sending...',
          formServiceUnavailable: 'Sending service unavailable. Please try again in a few minutes.',
          formConfigMissing: 'Configure EmailJS in the form tag before sending real messages.',
          formPublicKeyInvalid: 'Invalid public key: use your EmailJS Public Key API, not your email address.',
          formSubmitErrorPrefix: 'Message not sent. Check EmailJS configuration and try again.'
        }
      };
      const ENGLISH_TEXT = {
        radialMenuHome: 'Home',
        radialMenuAbout: 'About Me',
        radialMenuContacts: 'Contacts',
        navMethod: 'Method',
        navWork: 'My Work',
        headerContactLink: 'Contact me',
        heroTitle: 'Hi, I am Loris Battaglini',
        heroSubtitle: 'Training as a',
        heroParagraph: 'I design and develop clear, fast, goal-oriented websites. Every section is built to highlight your work and guide users toward contact.',
        downloadCvButton: 'Download Resume',
        heroInfoLocation: 'Caprarola, Italy',
        heroInfoAge: '24 years old',
        heroInfoTagline: 'Clear, modern, contact-focused websites',
        skillsHeading: 'Core skills',
        skillsIntro: 'Selected technologies to build reliable, maintainable, high-performance products.',
        skillHtmlText: 'Semantic and accessible structure.',
        skillCssText: 'Responsive layouts and professional UIs.',
        skillGitText: 'Clean versioning and organized workflow.',
        learningSummary: 'Skills I am currently studying',
        learningIntro: 'I am deepening these with practical projects, so I keep them separate from my core skills.',
        learningJavascriptText: 'Client-side logic and interactivity.',
        learningTypescriptText: 'Typing for more robust code.',
        learningReactText: 'Reusable components for modern interfaces.',
        learningNodeText: 'Backend fundamentals and API management.',
        learningAiText: 'AI-assisted workflows for productivity and automation.',
        methodHeading: 'How I turn an idea into a website that works',
        methodIntro: 'Each project starts from a clear goal and is built with a precise method',
        methodResultTitle: 'Outcome',
        methodResultItem1: 'I turn your idea into a professional website focused on your goals.',
        methodResultItem2: 'I organize content into sections that immediately communicate the value of your services.',
        methodResultItem3: 'I build pages that guide visitors toward contacting you.',
        methodResultItem4: 'I deliver a solid foundation ready to grow with your project.',
        methodProcessTitle: 'Method',
        methodProcessItem1: 'I define goals, target audience, message, and tone before writing code.',
        methodProcessItem2: 'I design structure and visual hierarchy to guide attention, understanding, and decisions.',
        methodProcessItem3: 'I develop in a modular, responsive way with code that is easy to maintain and extend over time.',
        methodProcessItem4: 'I perform final optimizations on performance, readability, and UX before delivery.',
        methodCtaText: 'Do you have a project in mind? Write to me below and tell me about your idea.',
        methodCtaButton: 'Let\'s talk about your project',
        projectsHeading: 'My projects',
        projectsIntro: 'A focused selection of my main works. If you want to expand it, click \"See all projects\".',
        completedProjectsHeading: 'Completed projects',
        workingProjectsHeading: 'Projects in progress',
        projectDepylTitle: 'Depyl Project',
        projectDepylText: 'Informational landing page for Depyl focused on problem, solution, and benefits in a clear contact-oriented structure.',
        projectCoffeeTitle: 'Product Landing Page',
        projectCoffeeText: 'Showcase website for a specialty coffee shop with curated visual identity, highlighted menu, and CTAs for booking and contact.',
        projectVisitButton: 'Visit website',
        projectCraftEcommerceTitle: 'Craft E-commerce',
        projectCraftEcommerceText: 'Essential store designed for local products with a simplified checkout.',
        projectPhotoPortfolioTitle: 'Photo Portfolio',
        projectPhotoPortfolioText: 'Immersive experience for photographers with a high-impact visual gallery.',
        projectSeoDashboardTitle: 'SEO Dashboard',
        projectSeoDashboardText: 'Automated reports and metrics overview to monitor monthly performance.',
        projectRestaurantTitle: 'Restaurant Landing',
        projectRestaurantText: 'High-impact showcase site for fast bookings and menu highlights.',
        inProgressButton: 'In progress',
        contactHeading: 'Tell me about your project',
        contactIntro: 'Write below and explain what you want to build. I reply within 24 hours. <br>If you prefer, we can also discuss it in a short call.',
        leadMagnetHeading: 'Free guide',
        leadMagnetText: 'You will also receive a useful guide: <strong>\"Your first credible online presence (even if you are starting from zero)\"</strong>',
        formNameLabel: 'Name',
        formEmailLabel: 'Email',
        formMessageLabel: 'Message',
        formChecklistConsent: 'Yes, I also want to receive the free guide by email.',
        formHoneypotLabel: 'Do not fill in this field'
      };
      const ENGLISH_PLACEHOLDERS = {
        formNamePlaceholder: 'Type your name',
        formEmailPlaceholder: 'Enter your email',
        formMessagePlaceholder: 'Describe your project, your idea, or what you would like to improve'
      };
      const ENGLISH_ARIA_LABELS = {
        headerToolsAriaLabel: 'Header tools',
        themeToggleAriaLabel: 'Enable dark mode',
        languageSwitchAriaLabel: 'Language switcher',
        radialMenuToggleAriaLabel: 'Open orbital menu',
        radialMenuDialogAriaLabel: 'Orbital navigation',
        radialMenuCloseAriaLabel: 'Close menu',
        openLinkedinAriaLabel: 'Open LinkedIn profile',
        openInstagramAriaLabel: 'Open Instagram profile',
        completedControlsAriaLabel: 'Completed projects controls',
        sliderPrevAriaLabel: 'Scroll left',
        sliderNextAriaLabel: 'Scroll right',
        completedCarouselAriaLabel: 'Completed projects carousel',
        workingControlsAriaLabel: 'Projects in progress controls',
        workingCarouselAriaLabel: 'Projects in progress carousel'
      };
      const ENGLISH_ALTS = {
        projectDepylAlt: 'Depyl project preview',
        projectCoffeeAlt: 'Coffee Studio project preview',
        projectCraftEcommerceAlt: 'Craft E-commerce project preview',
        projectPhotoPortfolioAlt: 'Photo Portfolio project preview',
        projectSeoDashboardAlt: 'SEO Dashboard project preview',
        projectRestaurantAlt: 'Restaurant Landing project preview'
      };

      const navLinks = document.querySelectorAll('.header-nav a[href^="#"], .contattami-header[href^="#"], .metodo-cta-link[href^="#"], .brand-mark[href^="#"]');
      const radialMenuToggleButton = document.querySelector('#radial-menu-toggle');
      const radialMenuPanel = document.querySelector('#radial-menu-panel');
      const radialMenuShell = document.querySelector('#radial-menu-shell');
      const radialMenuCloseButton = document.querySelector('[data-radial-close]');
      const radialMenuItems = Array.from(document.querySelectorAll('[data-radial-item]'));
      const contactForm = document.querySelector('#form');
      const formSubmitButton = document.querySelector('#form-submit-button');
      const formStatus = document.querySelector('#form-status');
      const projectsSection = document.querySelector('#projects');
      const projectsExpandedContent = document.querySelector('#projects-expanded-content');
      const toggleProjectsExpandedButton = document.querySelector('#toggle-projects-expanded');
      const toggleProjectsExpandedLabel = toggleProjectsExpandedButton ? toggleProjectsExpandedButton.querySelector('[data-i18n]') : null;
      const themeToggleButton = document.querySelector('#theme-toggle');
      const themeToggleIcon = themeToggleButton ? themeToggleButton.querySelector('i') : null;
      const languageOptionButtons = Array.from(document.querySelectorAll('[data-language-option]'));
      const universeCanvas = document.querySelector('#universe-canvas');
      const reducedMotionQuery = typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
      const phoneViewportQuery = typeof window.matchMedia === 'function'
        ? window.matchMedia(PHONE_MEDIA_QUERY)
        : null;
      const sliderViewportQuery = typeof window.matchMedia === 'function'
        ? window.matchMedia('(max-width: 992px)')
        : null;
      const projectSliderStates = [];
      let projectViewportObserver = null;
      let isProjectsInViewport = true;
      let activeTimer = null;
      let activeSection = null;
      let sectionHighlightFrameId = 0;
      let pendingSectionHighlightTimeoutId = 0;
      let focusHashScrollTimeoutId = 0;
      let focusHashHighlightTimeoutId = 0;
      let projectAnimationFrameId = null;
      let projectAnimationLastTime = 0;
      let projectResizeFrameId = 0;
      let currentLanguage = DEFAULT_LANGUAGE;
      let isFormSubmitting = false;

      const universeState = {
        isSetup: false,
        context: null,
        particles: [],
        fragments: [],
        width: 0,
        height: 0,
        dpr: 1,
        rafId: 0,
        isRunning: false,
        lastTime: 0,
        themeMode: 'light',
        qualityLevel: 1,
        averageFrameMs: 16.667,
        lastQualityAdjustTime: 0
      };
      const UNIVERSE_QUALITY_CONFIG = {
        lowThresholdMs: 19.8,
        highThresholdMs: 15.8,
        adjustCooldownMs: 700,
        downStep: 0.06,
        upStep: 0.03,
        minQualityLight: 0.62,
        minQualityDark: 0.74,
        maxQuality: 1
      };
      const universeThemeProfiles = {
        light: {
          particleArea: 40800,
          minParticles: 18,
          maxParticles: 50,
          largeStarChance: 0.15,
          largeRadiusMin: 1.6,
          largeRadiusMax: 2.95,
          smallRadiusMin: 0.45,
          smallRadiusMax: 1.42,
          speedMin: 0.13,
          speedMax: 0.48,
          jitter: 0.0042,
          maxSpeed: 0.88,
          restitution: 0.85,
          impactThreshold: 0.11,
          glowLargeFactor: 4.65,
          glowSmallFactor: 3.8,
          glowCoreAlpha: 0.28,
          glowMidAlpha: 0.12,
          fillAlpha: 0.76,
          fragmentMinCount: 1,
          fragmentMaxCount: 3,
          fragmentRadiusMin: 0.16,
          fragmentRadiusMax: 0.56,
          fragmentLifeMin: 220,
          fragmentLifeMax: 620,
          fragmentAlphaMin: 0.22,
          fragmentAlphaMax: 0.46,
          sparkleThreshold: 2.2,
          sparkleAlpha: 0.17,
          palette: [
            { r: 0, g: 81, b: 255, a: 0.52 },
            { r: 253, g: 0, b: 255, a: 0.5 },
            { r: 116, g: 132, b: 255, a: 0.44 },
            { r: 224, g: 128, b: 255, a: 0.38 }
          ]
        },
        dark: {
          particleArea: 33200,
          minParticles: 24,
          maxParticles: 67,
          largeStarChance: 0.22,
          largeRadiusMin: 1.95,
          largeRadiusMax: 3.45,
          smallRadiusMin: 0.52,
          smallRadiusMax: 1.82,
          speedMin: 0.16,
          speedMax: 0.72,
          jitter: 0.0068,
          maxSpeed: 1.18,
          restitution: 0.9,
          impactThreshold: 0.08,
          glowLargeFactor: 5.25,
          glowSmallFactor: 4.35,
          glowCoreAlpha: 0.34,
          glowMidAlpha: 0.14,
          fillAlpha: 0.84,
          fragmentMinCount: 2,
          fragmentMaxCount: 5,
          fragmentRadiusMin: 0.2,
          fragmentRadiusMax: 0.78,
          fragmentLifeMin: 260,
          fragmentLifeMax: 760,
          fragmentAlphaMin: 0.3,
          fragmentAlphaMax: 0.6,
          sparkleThreshold: 2.35,
          sparkleAlpha: 0.28,
          palette: [
            { r: 120, g: 166, b: 255, a: 0.58 },
            { r: 95, g: 226, b: 255, a: 0.52 },
            { r: 255, g: 192, b: 126, a: 0.42 },
            { r: 196, g: 220, b: 255, a: 0.48 }
          ]
        }
      };

      const italianSnapshot = {
        text: Object.create(null),
        placeholder: Object.create(null),
        aria: Object.create(null),
        alt: Object.create(null)
      };

      document.querySelectorAll('[data-i18n]').forEach(function (node) {
        const key = node.getAttribute('data-i18n');
        if (!key || Object.prototype.hasOwnProperty.call(italianSnapshot.text, key)) return;
        italianSnapshot.text[key] = node.innerHTML;
      });

      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (node) {
        const key = node.getAttribute('data-i18n-placeholder');
        if (!key || Object.prototype.hasOwnProperty.call(italianSnapshot.placeholder, key)) return;
        italianSnapshot.placeholder[key] = node.getAttribute('placeholder') || '';
      });

      document.querySelectorAll('[data-i18n-aria-label]').forEach(function (node) {
        const key = node.getAttribute('data-i18n-aria-label');
        if (!key || Object.prototype.hasOwnProperty.call(italianSnapshot.aria, key)) return;
        italianSnapshot.aria[key] = node.getAttribute('aria-label') || '';
      });

      document.querySelectorAll('[data-i18n-alt]').forEach(function (node) {
        const key = node.getAttribute('data-i18n-alt');
        if (!key || Object.prototype.hasOwnProperty.call(italianSnapshot.alt, key)) return;
        italianSnapshot.alt[key] = node.getAttribute('alt') || '';
      });

      function safeStorageGet(key) {
        try {
          return window.localStorage.getItem(key);
        } catch (error) {
          return null;
        }
      }

      function safeStorageSet(key, value) {
        try {
          window.localStorage.setItem(key, value);
        } catch (error) {
          // Storage unavailable, continue without persistence.
        }
      }

      function getDynamicString(key) {
        const languagePack = DYNAMIC_STRINGS[currentLanguage] || DYNAMIC_STRINGS.it;
        return languagePack && Object.prototype.hasOwnProperty.call(languagePack, key) ? languagePack[key] : '';
      }

      function getStoredLanguage() {
        const language = safeStorageGet(STORAGE_KEYS.language);
        return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
      }

      function getStoredTheme() {
        const theme = safeStorageGet(STORAGE_KEYS.theme);
        return theme === 'light' ? 'light' : 'dark';
      }

      function getTranslatedText(key) {
        if (currentLanguage === 'en' && Object.prototype.hasOwnProperty.call(ENGLISH_TEXT, key)) {
          return ENGLISH_TEXT[key];
        }
        return italianSnapshot.text[key] || '';
      }

      function getTranslatedPlaceholder(key) {
        if (currentLanguage === 'en' && Object.prototype.hasOwnProperty.call(ENGLISH_PLACEHOLDERS, key)) {
          return ENGLISH_PLACEHOLDERS[key];
        }
        return italianSnapshot.placeholder[key] || '';
      }

      function getTranslatedAriaLabel(key) {
        if (currentLanguage === 'en' && Object.prototype.hasOwnProperty.call(ENGLISH_ARIA_LABELS, key)) {
          return ENGLISH_ARIA_LABELS[key];
        }
        return italianSnapshot.aria[key] || '';
      }

      function getTranslatedAlt(key) {
        if (currentLanguage === 'en' && Object.prototype.hasOwnProperty.call(ENGLISH_ALTS, key)) {
          return ENGLISH_ALTS[key];
        }
        return italianSnapshot.alt[key] || '';
      }

      function updateThemeToggleAccessibility() {
        if (!themeToggleButton || !themeToggleIcon) return;
        const isDarkTheme = document.body.classList.contains('theme-dark');
        themeToggleIcon.classList.toggle('fa-moon', !isDarkTheme);
        themeToggleIcon.classList.toggle('fa-sun', isDarkTheme);
        themeToggleButton.dataset.themeState = isDarkTheme ? 'dark' : 'light';
        themeToggleButton.setAttribute('aria-label', getDynamicString(isDarkTheme ? 'themeToggleAriaLabelDark' : 'themeToggleAriaLabelLight'));
      }

      function setProjectsExpandedButtonText(isExpanded) {
        const text = getDynamicString(isExpanded ? 'projectsHideAllButton' : 'projectsShowAllButton');
        if (toggleProjectsExpandedLabel) {
          toggleProjectsExpandedLabel.textContent = text;
          return;
        }
        if (toggleProjectsExpandedButton) {
          toggleProjectsExpandedButton.textContent = text;
        }
      }

      function refreshSliderToggleButtonsText() {
        projectSliderStates.forEach(function (state) {
          state.toggleButton.textContent = state.isAutoPaused ? getDynamicString('sliderResumeButton') : getDynamicString('sliderPauseButton');
        });
      }

      function applyTranslations() {
        document.documentElement.lang = currentLanguage;
        document.title = PAGE_TITLES[currentLanguage] || PAGE_TITLES.it;

        document.querySelectorAll('[data-i18n]').forEach(function (node) {
          const key = node.getAttribute('data-i18n');
          if (!key) return;
          node.innerHTML = getTranslatedText(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (node) {
          const key = node.getAttribute('data-i18n-placeholder');
          if (!key) return;
          node.setAttribute('placeholder', getTranslatedPlaceholder(key));
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(function (node) {
          const key = node.getAttribute('data-i18n-aria-label');
          if (!key) return;
          node.setAttribute('aria-label', getTranslatedAriaLabel(key));
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(function (node) {
          const key = node.getAttribute('data-i18n-alt');
          if (!key) return;
          node.setAttribute('alt', getTranslatedAlt(key));
        });

        languageOptionButtons.forEach(function (button) {
          const isActive = button.dataset.lang === currentLanguage;
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-pressed', String(isActive));
        });

        if (contactForm) {
          const activeChecklistUrl = currentLanguage === 'en' && contactForm.dataset.checklistUrlEn
            ? contactForm.dataset.checklistUrlEn
            : contactForm.dataset.checklistUrl;
          if (activeChecklistUrl) {
            contactForm.dataset.activeChecklistUrl = activeChecklistUrl;
          }
        }

        updateThemeToggleAccessibility();
        const isExpanded = toggleProjectsExpandedButton && toggleProjectsExpandedButton.getAttribute('aria-expanded') === 'true';
        setProjectsExpandedButtonText(Boolean(isExpanded));
        refreshSliderToggleButtonsText();
        setFormSubmitting(isFormSubmitting);
      }

      function setLanguage(language, shouldPersist) {
        currentLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
        applyTranslations();
        if (shouldPersist) {
          safeStorageSet(STORAGE_KEYS.language, currentLanguage);
        }
      }

      function applyTheme(theme, shouldPersist) {
        const nextTheme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.classList.toggle('theme-dark', nextTheme === 'dark');
        document.body.classList.toggle('theme-dark', nextTheme === 'dark');
        updateThemeToggleAccessibility();
        syncUniverseParticlesState();
        if (shouldPersist) {
          safeStorageSet(STORAGE_KEYS.theme, nextTheme);
        }
      }

      function clampValue(value, min, max) {
        return Math.min(max, Math.max(min, value));
      }

      function randomBetween(min, max) {
        return min + Math.random() * (max - min);
      }

      function toRgba(color, alphaMultiplier) {
        const alpha = clampValue(color.a * alphaMultiplier, 0, 1);
        return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + alpha + ')';
      }

      function getUniverseThemeMode() {
        return document.body.classList.contains('theme-dark') ? 'dark' : 'light';
      }

      function getUniverseProfile() {
        return universeThemeProfiles[universeState.themeMode] || universeThemeProfiles.light;
      }

      function getUniverseQualityBounds() {
        return {
          min: universeState.themeMode === 'dark'
            ? UNIVERSE_QUALITY_CONFIG.minQualityDark
            : UNIVERSE_QUALITY_CONFIG.minQualityLight,
          max: UNIVERSE_QUALITY_CONFIG.maxQuality
        };
      }

      function resetUniverseAdaptiveQuality() {
        universeState.qualityLevel = UNIVERSE_QUALITY_CONFIG.maxQuality;
        universeState.averageFrameMs = 16.667;
        universeState.lastQualityAdjustTime = performance.now();
      }

      function updateUniverseAdaptiveQuality(deltaMs, timestamp) {
        universeState.averageFrameMs += (deltaMs - universeState.averageFrameMs) * 0.14;
        if (timestamp - universeState.lastQualityAdjustTime < UNIVERSE_QUALITY_CONFIG.adjustCooldownMs) {
          return;
        }

        const bounds = getUniverseQualityBounds();
        let nextQuality = universeState.qualityLevel;

        if (universeState.averageFrameMs > UNIVERSE_QUALITY_CONFIG.lowThresholdMs) {
          nextQuality -= UNIVERSE_QUALITY_CONFIG.downStep;
        } else if (universeState.averageFrameMs < UNIVERSE_QUALITY_CONFIG.highThresholdMs) {
          nextQuality += UNIVERSE_QUALITY_CONFIG.upStep;
        }

        nextQuality = clampValue(nextQuality, bounds.min, bounds.max);
        universeState.lastQualityAdjustTime = timestamp;
        if (Math.abs(nextQuality - universeState.qualityLevel) < 0.009) return;

        universeState.qualityLevel = nextQuality;
        if (universeState.width > 0 && universeState.height > 0) {
          ensureUniverseParticleCount(universeState.width, universeState.height);
        }
      }

      function getUniverseTargetParticleCount(width, height) {
        const profile = getUniverseProfile();
        const quality = clampValue(universeState.qualityLevel, 0.55, 1);
        const countByArea = Math.round(((width * height) / profile.particleArea) * quality);
        const minParticles = Math.max(8, Math.round(profile.minParticles * quality));
        const maxParticles = Math.max(minParticles + 4, Math.round(profile.maxParticles * quality));
        return clampValue(countByArea, minParticles, maxParticles);
      }

      function createUniverseParticle(width, height) {
        const profile = getUniverseProfile();
        const isLarge = Math.random() < profile.largeStarChance;
        const baseRadius = isLarge
          ? randomBetween(profile.largeRadiusMin, profile.largeRadiusMax)
          : randomBetween(profile.smallRadiusMin, profile.smallRadiusMax);
        const angle = Math.random() * Math.PI * 2;
        const speed = randomBetween(profile.speedMin, profile.speedMax) * (2 / (baseRadius + 0.8));
        const color = profile.palette[Math.floor(Math.random() * profile.palette.length)];
        const twinkleAmplitude = randomBetween(0.08, 0.34) * (isLarge ? 1.35 : 0.86);
        const depth = randomBetween(0.82, 1.22) * (isLarge ? 1.18 : 1);
        return {
          x: randomBetween(0, width),
          y: randomBetween(0, height),
          vx: Math.cos(angle) * speed * depth,
          vy: Math.sin(angle) * speed * depth,
          radius: baseRadius,
          baseRadius: baseRadius,
          minRadius: Math.max(0.4, baseRadius * randomBetween(0.4, 0.58)),
          mass: Math.max(0.8, baseRadius * baseRadius),
          color: color,
          glowColorInner: toRgba(color, profile.glowCoreAlpha),
          glowColorMid: toRgba(color, profile.glowMidAlpha),
          glowColorOuter: toRgba(color, 0),
          fillColor: toRgba(color, profile.fillAlpha),
          burstCooldownMs: 0,
          twinklePhase: randomBetween(0, Math.PI * 2),
          twinkleSpeed: randomBetween(0.35, 1.08),
          twinkleAmplitude: twinkleAmplitude
        };
      }

      function ensureUniverseParticleCount(width, height) {
        const targetCount = getUniverseTargetParticleCount(width, height);
        while (universeState.particles.length < targetCount) {
          universeState.particles.push(createUniverseParticle(width, height));
        }
        if (universeState.particles.length > targetCount) {
          universeState.particles.splice(targetCount);
        }
      }

      function resizeUniverseCanvas() {
        if (!universeCanvas || !universeState.context) return;

        const width = Math.max(window.innerWidth || 0, 1);
        const height = Math.max(window.innerHeight || 0, 1);
        const dpr = clampValue(window.devicePixelRatio || 1, 1, 2);

        const hasSizeChanged = universeState.width !== width || universeState.height !== height || universeState.dpr !== dpr;
        if (!hasSizeChanged && universeState.particles.length > 0) return;

        universeState.width = width;
        universeState.height = height;
        universeState.dpr = dpr;

        universeCanvas.width = Math.floor(width * dpr);
        universeCanvas.height = Math.floor(height * dpr);
        universeCanvas.style.width = width + 'px';
        universeCanvas.style.height = height + 'px';
        universeState.context.setTransform(dpr, 0, 0, dpr, 0, 0);

        ensureUniverseParticleCount(width, height);
        universeState.particles.forEach(function (particle) {
          particle.x = clampValue(particle.x, particle.radius, width - particle.radius);
          particle.y = clampValue(particle.y, particle.radius, height - particle.radius);
        });
      }

      function spawnUniverseFragments(x, y, impactStrength, colorA, colorB) {
        const profile = getUniverseProfile();
        const quality = clampValue(universeState.qualityLevel, 0.55, 1);
        const fragmentCount = Math.max(
          1,
          Math.round((randomBetween(profile.fragmentMinCount, profile.fragmentMaxCount) + impactStrength * 1.7) * quality)
        );
        for (let index = 0; index < fragmentCount; index += 1) {
          const angle = randomBetween(0, Math.PI * 2);
          const speed = randomBetween(0.28, 1.22) * (0.64 + impactStrength);
          const radius = randomBetween(profile.fragmentRadiusMin, profile.fragmentRadiusMax) * (0.72 + impactStrength * 0.4);
          const sourceColor = Math.random() < 0.5 ? colorA : colorB;
          const lifetime = randomBetween(profile.fragmentLifeMin, profile.fragmentLifeMax);
          universeState.fragments.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: radius,
            lifeMs: lifetime,
            maxLifeMs: lifetime,
            color: {
              r: sourceColor.r,
              g: sourceColor.g,
              b: sourceColor.b,
              a: sourceColor.a * randomBetween(profile.fragmentAlphaMin, profile.fragmentAlphaMax)
            }
          });
        }

        const maxFragments = Math.max(72, Math.round(180 * quality));
        if (universeState.fragments.length > maxFragments) {
          universeState.fragments.splice(0, universeState.fragments.length - maxFragments);
        }
      }

      function updateUniverseParticles(deltaMs) {
        if (!universeState.context) return;
        const profile = getUniverseProfile();
        const frameScale = deltaMs / 16.667;
        const width = universeState.width;
        const height = universeState.height;
        const particles = universeState.particles;
        const jitter = profile.jitter * frameScale;
        const maxSpeed = profile.maxSpeed;
        const radiusReturnFactor = 0.065 * frameScale;
        const twinkleStep = 0.02 * frameScale;
        const fragmentVelocityDamping = Math.pow(0.992, frameScale);
        const fragmentRadiusDamping = Math.pow(0.997, frameScale);

        particles.forEach(function (particle) {
          particle.burstCooldownMs = Math.max(0, particle.burstCooldownMs - deltaMs);

          particle.vx += randomBetween(-jitter, jitter);
          particle.vy += randomBetween(-jitter, jitter);

          const speed = Math.hypot(particle.vx, particle.vy);
          if (speed > maxSpeed) {
            particle.vx = (particle.vx / speed) * maxSpeed;
            particle.vy = (particle.vy / speed) * maxSpeed;
          }

          particle.x += particle.vx * frameScale;
          particle.y += particle.vy * frameScale;

          if (particle.x <= particle.radius) {
            particle.x = particle.radius;
            particle.vx = Math.abs(particle.vx);
          } else if (particle.x >= width - particle.radius) {
            particle.x = width - particle.radius;
            particle.vx = -Math.abs(particle.vx);
          }

          if (particle.y <= particle.radius) {
            particle.y = particle.radius;
            particle.vy = Math.abs(particle.vy);
          } else if (particle.y >= height - particle.radius) {
            particle.y = height - particle.radius;
            particle.vy = -Math.abs(particle.vy);
          }
        });

        for (let i = 0; i < particles.length; i += 1) {
          const particleA = particles[i];
          for (let j = i + 1; j < particles.length; j += 1) {
            const particleB = particles[j];
            const deltaX = particleB.x - particleA.x;
            const deltaY = particleB.y - particleA.y;
            const minDistance = particleA.radius + particleB.radius;
            if (Math.abs(deltaX) >= minDistance || Math.abs(deltaY) >= minDistance) continue;
            const distanceSquared = deltaX * deltaX + deltaY * deltaY;
            if (distanceSquared >= minDistance * minDistance || distanceSquared === 0) continue;

            const distance = Math.sqrt(distanceSquared);
            const normalX = deltaX / distance;
            const normalY = deltaY / distance;
            const overlap = minDistance - distance;

            particleA.x -= normalX * overlap * 0.5;
            particleA.y -= normalY * overlap * 0.5;
            particleB.x += normalX * overlap * 0.5;
            particleB.y += normalY * overlap * 0.5;

            const relativeVx = particleB.vx - particleA.vx;
            const relativeVy = particleB.vy - particleA.vy;
            const velocityAlongNormal = relativeVx * normalX + relativeVy * normalY;

            if (velocityAlongNormal < 0) {
              const restitution = profile.restitution;
              const impulse = -(1 + restitution) * velocityAlongNormal / ((1 / particleA.mass) + (1 / particleB.mass));
              const impulseX = impulse * normalX;
              const impulseY = impulse * normalY;
              particleA.vx -= impulseX / particleA.mass;
              particleA.vy -= impulseY / particleA.mass;
              particleB.vx += impulseX / particleB.mass;
              particleB.vy += impulseY / particleB.mass;
            }

            const tangentX = -normalY;
            const tangentY = normalX;
            const tangentBoost = randomBetween(-0.05, 0.05);
            particleA.vx -= tangentX * tangentBoost;
            particleA.vy -= tangentY * tangentBoost;
            particleB.vx += tangentX * tangentBoost;
            particleB.vy += tangentY * tangentBoost;

            const impactStrength = clampValue(Math.abs(velocityAlongNormal) * 0.92 + overlap * 0.35, 0, 1.4);
            const canBurst = particleA.burstCooldownMs <= 0 || particleB.burstCooldownMs <= 0;
            if (canBurst && impactStrength > profile.impactThreshold) {
              const burstX = (particleA.x + particleB.x) * 0.5;
              const burstY = (particleA.y + particleB.y) * 0.5;
              spawnUniverseFragments(burstX, burstY, impactStrength, particleA.color, particleB.color);

              particleA.radius = Math.max(particleA.minRadius, particleA.radius * randomBetween(0.84, 0.94));
              particleB.radius = Math.max(particleB.minRadius, particleB.radius * randomBetween(0.84, 0.94));
              particleA.mass = Math.max(0.8, particleA.radius * particleA.radius);
              particleB.mass = Math.max(0.8, particleB.radius * particleB.radius);
              particleA.burstCooldownMs = randomBetween(90, 180);
              particleB.burstCooldownMs = randomBetween(90, 180);
            }
          }
        }

        particles.forEach(function (particle) {
          particle.radius += (particle.baseRadius - particle.radius) * radiusReturnFactor;
          particle.mass = Math.max(0.8, particle.radius * particle.radius);
          particle.twinklePhase += particle.twinkleSpeed * twinkleStep;
        });

        const nextFragments = [];
        universeState.fragments.forEach(function (fragment) {
          fragment.lifeMs -= deltaMs;
          if (fragment.lifeMs <= 0 || fragment.radius <= 0.22) return;

          fragment.x += fragment.vx * frameScale;
          fragment.y += fragment.vy * frameScale;
          fragment.vx *= fragmentVelocityDamping;
          fragment.vy *= fragmentVelocityDamping;
          fragment.radius *= fragmentRadiusDamping;

          if (fragment.x < -4 || fragment.x > width + 4 || fragment.y < -4 || fragment.y > height + 4) return;
          nextFragments.push(fragment);
        });
        universeState.fragments = nextFragments;
      }

      function drawUniverseParticles() {
        if (!universeState.context) return;
        const profile = getUniverseProfile();
        const context = universeState.context;
        const now = performance.now();

        context.clearRect(0, 0, universeState.width, universeState.height);

        universeState.particles.forEach(function (particle) {
          const twinkle = 1 + Math.sin(now * 0.0012 * particle.twinkleSpeed + particle.twinklePhase) * particle.twinkleAmplitude;
          const starRadius = particle.radius * twinkle;
          const glowRadius = starRadius * (particle.baseRadius > profile.sparkleThreshold ? profile.glowLargeFactor : profile.glowSmallFactor);
          const glowGradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glowRadius);
          glowGradient.addColorStop(0, particle.glowColorInner);
          glowGradient.addColorStop(0.5, particle.glowColorMid);
          glowGradient.addColorStop(1, particle.glowColorOuter);
          context.fillStyle = glowGradient;
          context.beginPath();
          context.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
          context.fill();

          context.fillStyle = particle.fillColor;
          context.beginPath();
          context.arc(particle.x, particle.y, starRadius, 0, Math.PI * 2);
          context.fill();

          if (universeState.qualityLevel >= 0.84 && particle.baseRadius >= profile.sparkleThreshold && twinkle > 1.04) {
            const sparkleLength = starRadius * 2.4;
            context.strokeStyle = toRgba(particle.color, profile.sparkleAlpha * (twinkle - 0.95));
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(particle.x - sparkleLength, particle.y);
            context.lineTo(particle.x + sparkleLength, particle.y);
            context.moveTo(particle.x, particle.y - sparkleLength);
            context.lineTo(particle.x, particle.y + sparkleLength);
            context.stroke();
          }
        });

        universeState.fragments.forEach(function (fragment) {
          const alphaByLife = clampValue(fragment.lifeMs / fragment.maxLifeMs, 0, 1);
          context.fillStyle = toRgba(fragment.color, alphaByLife * 0.75);
          context.beginPath();
          context.arc(fragment.x, fragment.y, fragment.radius, 0, Math.PI * 2);
          context.fill();
        });
      }

      function stopUniverseAnimation(shouldClearCanvas) {
        if (universeState.rafId) {
          window.cancelAnimationFrame(universeState.rafId);
          universeState.rafId = 0;
        }
        universeState.isRunning = false;
        universeState.lastTime = 0;
        if (shouldClearCanvas && universeState.context) {
          universeState.context.clearRect(0, 0, universeState.width, universeState.height);
        }
      }

      function runUniverseAnimationFrame(timestamp) {
        if (!universeState.isRunning) return;
        if (!universeState.lastTime) {
          universeState.lastTime = timestamp;
        }

        const deltaMs = clampValue(timestamp - universeState.lastTime, 10, 40);
        universeState.lastTime = timestamp;
        updateUniverseAdaptiveQuality(deltaMs, timestamp);
        updateUniverseParticles(deltaMs);
        drawUniverseParticles();
        universeState.rafId = window.requestAnimationFrame(runUniverseAnimationFrame);
      }

      function startUniverseAnimation() {
        if (!universeCanvas || !universeState.context || universeState.isRunning) return;
        universeState.isRunning = true;
        universeState.lastTime = 0;
        universeState.rafId = window.requestAnimationFrame(runUniverseAnimationFrame);
      }

      function syncUniverseParticlesState() {
        if (!universeCanvas || !universeState.context) return;
        const nextThemeMode = getUniverseThemeMode();
        const reduceMotionEnabled = reducedMotionQuery ? reducedMotionQuery.matches : false;

        if (universeState.themeMode !== nextThemeMode) {
          universeState.themeMode = nextThemeMode;
          resetUniverseAdaptiveQuality();
          universeState.particles = [];
          universeState.fragments = [];
        }

        resizeUniverseCanvas();

        if (reduceMotionEnabled) {
          stopUniverseAnimation(false);
          drawUniverseParticles();
          return;
        }

        startUniverseAnimation();
      }

      function setupUniverseParticles() {
        if (!universeCanvas || universeState.isSetup) return;
        const context = universeCanvas.getContext('2d', { alpha: true });
        if (!context) return;

        universeState.context = context;
        universeState.isSetup = true;
        universeState.themeMode = getUniverseThemeMode();
        resetUniverseAdaptiveQuality();
        resizeUniverseCanvas();
        drawUniverseParticles();

        let universeResizeFrameId = 0;
        window.addEventListener('resize', function () {
          if (universeResizeFrameId) return;
          universeResizeFrameId = window.requestAnimationFrame(function () {
            universeResizeFrameId = 0;
            resizeUniverseCanvas();
            if (!universeState.isRunning) {
              drawUniverseParticles();
            }
          });
        }, { passive: true });

        document.addEventListener('visibilitychange', function () {
          if (document.hidden) {
            stopUniverseAnimation(false);
            return;
          }
          syncUniverseParticlesState();
        });

        if (reducedMotionQuery) {
          const handleReducedMotionChange = function () {
            syncUniverseParticlesState();
          };
          if (typeof reducedMotionQuery.addEventListener === 'function') {
            reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
          } else if (typeof reducedMotionQuery.addListener === 'function') {
            reducedMotionQuery.addListener(handleReducedMotionChange);
          }
        }
      }

      if (themeToggleButton) {
        themeToggleButton.addEventListener('click', function () {
          const isDarkTheme = document.body.classList.contains('theme-dark');
          applyTheme(isDarkTheme ? 'light' : 'dark', true);
        });
      }

      languageOptionButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          const nextLanguage = button.dataset.lang;
          if (!nextLanguage || nextLanguage === currentLanguage) return;
          setLanguage(nextLanguage, true);
        });
      });

      function getLaneGap(lane) {
        const styles = window.getComputedStyle(lane);
        const rawGap = styles.columnGap || styles.gap || '0';
        const gap = Number.parseFloat(rawGap);
        return Number.isNaN(gap) ? 0 : gap;
      }

      // Keep slider metrics in state to avoid repeated style reads during animation.
      function updateSliderLayoutMetrics(state) {
        state.laneGap = getLaneGap(state.lane);
        updateSliderEdgeOffset(state);
        updateSliderSpeed(state);
      }

      function ensureMinimumCards(lane, slider) {
        const originalCards = Array.from(lane.children).filter(function (card) {
          return !card.hasAttribute('data-cloned-card');
        });
        if (originalCards.length === 0) return;

        lane.querySelectorAll('[data-cloned-card="true"]').forEach(function (clonedCard) {
          clonedCard.remove();
        });

        if (originalCards.length === 1) return;

        const gap = getLaneGap(lane);
        const originalLaneWidth = originalCards.reduce(function (sum, card) {
          return sum + card.getBoundingClientRect().width;
        }, 0) + gap * Math.max(0, originalCards.length - 1);

        let requiredLoops = 2;
        if (originalLaneWidth > 0) {
          const targetWidth = Math.max(slider.clientWidth * 2.4, originalLaneWidth * 2);
          requiredLoops = Math.ceil(targetWidth / originalLaneWidth);
        }
        requiredLoops = Math.max(2, Math.min(6, requiredLoops));

        for (let loopIndex = 1; loopIndex < requiredLoops; loopIndex += 1) {
          originalCards.forEach(function (sourceCard) {
            const clonedCard = sourceCard.cloneNode(true);
            clonedCard.setAttribute('data-cloned-card', 'true');
            lane.appendChild(clonedCard);
          });
        }
      }

      function getCardStep(card, state) {
        const laneGap = typeof state.laneGap === 'number' ? state.laneGap : getLaneGap(state.lane);
        return card.getBoundingClientRect().width + laneGap;
      }

      function applyLaneTransform(state) {
        state.lane.style.transform = 'translate3d(' + state.offset + 'px, 0, 0)';
      }

      function updateSliderEdgeOffset(state) {
        const cards = Array.from(state.lane.children);
        if (cards.length === 0) return;

        const firstCard = cards[0];
        const gap = typeof state.laneGap === 'number' ? state.laneGap : getLaneGap(state.lane);
        const cardsTotalWidth = cards.reduce(function (sum, card) {
          return sum + card.getBoundingClientRect().width;
        }, 0);
        const laneNaturalWidth = cardsTotalWidth + gap * Math.max(0, cards.length - 1);
        const sliderWidth = state.slider.clientWidth;
        const isSmallViewport = sliderViewportQuery ? sliderViewportQuery.matches : window.innerWidth <= 992;

        const targetWidth = isSmallViewport
          ? firstCard.getBoundingClientRect().width
          : Math.min(laneNaturalWidth, sliderWidth);
        const edgeOffset = Math.max(0, (sliderWidth - targetWidth) / 2);

        state.edgeOffset = edgeOffset;
        state.lane.style.setProperty('--edge-offset', edgeOffset + 'px');
      }

      function updateSliderSpeed(state) {
        const isSmallViewport = sliderViewportQuery ? sliderViewportQuery.matches : window.innerWidth <= 992;
        state.speed = isSmallViewport ? 0.026 : 0.045;
      }

      function normalizeForwardLoop(state) {
        let firstCard = state.lane.firstElementChild;
        while (firstCard) {
          const step = getCardStep(firstCard, state);
          const recycleThreshold = step + (state.edgeOffset || 0);
          if (-state.offset < recycleThreshold) break;
          state.offset += step;
          state.lane.appendChild(firstCard);
          firstCard = state.lane.firstElementChild;
        }
      }

      function normalizeBackwardLoop(state) {
        let lastCard = state.lane.lastElementChild;
        while (lastCard && state.offset > 0) {
          const step = getCardStep(lastCard, state);
          state.offset -= step;
          state.lane.insertBefore(lastCard, state.lane.firstElementChild);
          lastCard = state.lane.lastElementChild;
        }
      }

      function snapLaneToCenter(state, durationMs) {
        const firstCard = state.lane.firstElementChild;
        if (!firstCard) return;
        const step = getCardStep(firstCard, state);
        if (!step) return;

        while (state.offset <= -step) {
          const movedCard = state.lane.firstElementChild;
          if (!movedCard) break;
          state.offset += step;
          state.lane.appendChild(movedCard);
        }

        while (state.offset > 0) {
          const movedCard = state.lane.lastElementChild;
          if (!movedCard) break;
          state.offset -= step;
          state.lane.insertBefore(movedCard, state.lane.firstElementChild);
        }

        const deltaToCenter = -state.offset;
        if (Math.abs(deltaToCenter) < 0.5) {
          state.offset = 0;
          applyLaneTransform(state);
          return;
        }

        if (durationMs && !state.isManualAnimating) {
          animateLaneBy(state, deltaToCenter, durationMs, function () {
            state.offset = 0;
            applyLaneTransform(state);
          });
          return;
        }

        state.offset = 0;
        applyLaneTransform(state);
      }

      function setSliderPaused(state, shouldPause, alignOnPause) {
        state.isAutoPaused = shouldPause;
        state.toggleButton.setAttribute('aria-pressed', shouldPause ? 'true' : 'false');
        state.toggleButton.textContent = shouldPause ? getDynamicString('sliderResumeButton') : getDynamicString('sliderPauseButton');
        if (shouldPause && alignOnPause !== false) {
          snapLaneToCenter(state, 220);
        }
        syncProjectAnimationLoopState();
      }

      function hasActiveProjectAnimationWork() {
        if (!isProjectsInViewport) return false;
        return projectSliderStates.some(function (state) {
          return state.isVisible && !state.isAutoPaused && !state.isManualAnimating;
        });
      }

      function syncProjectAnimationLoopState() {
        if (hasActiveProjectAnimationWork()) {
          startProjectAnimationLoop();
          return;
        }
        stopProjectAnimationLoop();
      }

      function animateLaneBy(state, delta, durationMs, onComplete) {
        state.isManualAnimating = true;
        const startOffset = state.offset;
        let startTime = null;

        function frame(now) {
          if (startTime === null) startTime = now;
          const progress = Math.min(1, (now - startTime) / durationMs);
          const eased = 1 - Math.pow(1 - progress, 3);
          state.offset = startOffset + delta * eased;
          applyLaneTransform(state);

          if (progress < 1) {
            requestAnimationFrame(frame);
            return;
          }

          state.isManualAnimating = false;
          if (onComplete) onComplete();
        }

        requestAnimationFrame(frame);
      }

      function stepSlider(state, direction) {
        if (state.isManualAnimating) return;

        setSliderPaused(state, true, false);

        if (direction > 0) {
          const firstCard = state.lane.firstElementChild;
          if (!firstCard) return;
          const step = getCardStep(firstCard, state);

          animateLaneBy(state, -step, 300, function () {
            const movedCard = state.lane.firstElementChild;
            if (!movedCard) return;
            state.lane.appendChild(movedCard);
            state.offset += step;
            applyLaneTransform(state);
          });
          return;
        }

        const lastCard = state.lane.lastElementChild;
        if (!lastCard) return;
        const step = getCardStep(lastCard, state);

        state.lane.insertBefore(lastCard, state.lane.firstElementChild);
        state.offset -= step;
        applyLaneTransform(state);

        requestAnimationFrame(function () {
          animateLaneBy(state, step, 300, null);
        });
      }

      function runProjectAnimation(now) {
        if (!hasActiveProjectAnimationWork()) {
          stopProjectAnimationLoop();
          return;
        }
        if (!projectAnimationLastTime) projectAnimationLastTime = now;
        const elapsed = Math.min(40, now - projectAnimationLastTime);
        projectAnimationLastTime = now;

        projectSliderStates.forEach(function (state) {
          if (!state.isVisible || state.isAutoPaused || state.isManualAnimating) return;
          state.offset -= state.speed * elapsed;
          normalizeForwardLoop(state);
          applyLaneTransform(state);
        });

        projectAnimationFrameId = requestAnimationFrame(runProjectAnimation);
      }

      function startProjectAnimationLoop() {
        if (projectAnimationFrameId) return;
        projectAnimationLastTime = 0;
        projectAnimationFrameId = requestAnimationFrame(runProjectAnimation);
      }

      function stopProjectAnimationLoop() {
        if (!projectAnimationFrameId) return;
        cancelAnimationFrame(projectAnimationFrameId);
        projectAnimationFrameId = null;
        projectAnimationLastTime = 0;
      }

      function setupProjectSliders() {
        if (!projectsExpandedContent) return;
        if (projectSliderStates.length > 0) return;

        if ('IntersectionObserver' in window && !projectViewportObserver) {
          projectViewportObserver = new IntersectionObserver(function (entries) {
            const entry = entries[0];
            isProjectsInViewport = Boolean(entry && entry.isIntersecting);
            syncProjectAnimationLoopState();
          }, {
            root: null,
            threshold: 0.01,
            rootMargin: '120px 0px 120px 0px'
          });
          projectViewportObserver.observe(projectsExpandedContent);
        }

        const sliderBlocks = projectsExpandedContent.querySelectorAll('.projects-slider-block');
        sliderBlocks.forEach(function (block) {
          const slider = block.querySelector('.projects-slider');
          const lane = block.querySelector('.projects-lane');
          const toggleButton = block.querySelector('.projects-nav-toggle');
          const prevButton = block.querySelector('[data-action="prev"]');
          const nextButton = block.querySelector('[data-action="next"]');
          if (!slider || !lane || !toggleButton || !prevButton || !nextButton) return;

          ensureMinimumCards(lane, slider);

          const state = {
            slider: slider,
            lane: lane,
            toggleButton: toggleButton,
            isAutoPaused: false,
            isManualAnimating: false,
            isVisible: false,
            offset: 0,
            laneGap: 0,
            edgeOffset: 0,
            speed: 0.045,
            ignoreNextClick: false
          };

          prevButton.addEventListener('click', function () {
            stepSlider(state, -1);
          });

          nextButton.addEventListener('click', function () {
            stepSlider(state, 1);
          });

          toggleButton.addEventListener('click', function () {
            setSliderPaused(state, !state.isAutoPaused, true);
          });

          if ('PointerEvent' in window) {
            const dragState = {
              active: false,
              pointerId: null,
              startX: 0,
              startY: 0,
              startOffset: 0,
              lastDeltaX: 0,
              isHorizontal: false,
              didMove: false,
              hasCapturedPointer: false,
              wasAutoPaused: false
            };
            const dragActivationThreshold = 8;

            function trySetSliderPointerCapture(pointerId) {
              if (typeof slider.setPointerCapture !== 'function') return;
              try {
                slider.setPointerCapture(pointerId);
              } catch (error) {
                // Some browsers reject pointer capture when pointer state changes quickly.
              }
            }

            function tryReleaseSliderPointerCapture(pointerId) {
              if (typeof slider.releasePointerCapture !== 'function') return;
              try {
                if (typeof slider.hasPointerCapture === 'function' && !slider.hasPointerCapture(pointerId)) {
                  return;
                }
                slider.releasePointerCapture(pointerId);
              } catch (error) {
                // Pointer may already be released by the browser.
              }
            }

            function resetSliderDragState() {
              dragState.active = false;
              dragState.pointerId = null;
              dragState.startX = 0;
              dragState.startY = 0;
              dragState.startOffset = 0;
              dragState.lastDeltaX = 0;
              dragState.isHorizontal = false;
              dragState.didMove = false;
              dragState.hasCapturedPointer = false;
              dragState.wasAutoPaused = false;
              slider.classList.remove('is-dragging');
            }

            function endSliderDrag(event, isCancelled) {
              if (!dragState.active || event.pointerId !== dragState.pointerId) return;

              const pointerId = dragState.pointerId;
              const lastDeltaX = dragState.lastDeltaX;
              const isHorizontal = dragState.isHorizontal;
              const didMove = dragState.didMove;
              const hadCapture = dragState.hasCapturedPointer;
              const wasAutoPaused = dragState.wasAutoPaused;

              if (hadCapture) {
                tryReleaseSliderPointerCapture(pointerId);
              }
              resetSliderDragState();

              if (!isHorizontal) {
                if (!wasAutoPaused) {
                  setSliderPaused(state, false, false);
                }
                snapLaneToCenter(state, 180);
                applyLaneTransform(state);
                return;
              }

              if (didMove) {
                state.ignoreNextClick = true;
              }

              if (isCancelled) {
                snapLaneToCenter(state, 180);
                applyLaneTransform(state);
                return;
              }

              const firstCard = state.lane.firstElementChild;
              const cardStep = firstCard ? getCardStep(firstCard, state) : 0;
              const swipeThreshold = Math.min(130, Math.max(34, cardStep * 0.22));

              if (cardStep > 0 && Math.abs(lastDeltaX) >= swipeThreshold) {
                stepSlider(state, lastDeltaX < 0 ? 1 : -1);
                return;
              }

              snapLaneToCenter(state, 180);
              applyLaneTransform(state);
            }

            slider.addEventListener('pointerdown', function (event) {
              if (event.pointerType === 'mouse') return;
              if (typeof event.button === 'number' && event.button !== 0) return;
              if (state.isManualAnimating) return;

              dragState.wasAutoPaused = state.isAutoPaused;
              setSliderPaused(state, true, false);
              snapLaneToCenter(state, 0);

              dragState.active = true;
              dragState.pointerId = event.pointerId;
              dragState.startX = event.clientX;
              dragState.startY = event.clientY;
              dragState.startOffset = state.offset;
              dragState.lastDeltaX = 0;
              dragState.isHorizontal = false;
              dragState.didMove = false;
              dragState.hasCapturedPointer = false;
            });

            slider.addEventListener('pointermove', function (event) {
              if (!dragState.active || event.pointerId !== dragState.pointerId) return;

              const deltaX = event.clientX - dragState.startX;
              const deltaY = event.clientY - dragState.startY;
              const absDeltaX = Math.abs(deltaX);
              const absDeltaY = Math.abs(deltaY);

              if (!dragState.isHorizontal) {
                if (absDeltaX < dragActivationThreshold) {
                  return;
                }

                if (absDeltaX <= absDeltaY * 1.05) {
                  return;
                }

                dragState.isHorizontal = true;
                slider.classList.add('is-dragging');
                trySetSliderPointerCapture(event.pointerId);
                dragState.hasCapturedPointer = true;
              }

              event.preventDefault();
              dragState.didMove = true;
              const firstCard = state.lane.firstElementChild;
              const cardStep = firstCard ? getCardStep(firstCard, state) : 0;
              const maxDrag = cardStep > 0 ? cardStep * 0.72 : 120;
              const boundedDeltaX = Math.max(-maxDrag, Math.min(maxDrag, deltaX));
              dragState.lastDeltaX = boundedDeltaX;

              state.offset = dragState.startOffset + boundedDeltaX;
              applyLaneTransform(state);
            }, { passive: false });

            slider.addEventListener('pointerup', function (event) {
              endSliderDrag(event, false);
            });

            slider.addEventListener('pointercancel', function (event) {
              endSliderDrag(event, true);
            });

            slider.addEventListener('click', function (event) {
              if (!state.ignoreNextClick) return;
              state.ignoreNextClick = false;
              event.preventDefault();
              event.stopPropagation();
            }, true);
          }

          updateSliderLayoutMetrics(state);
          applyLaneTransform(state);
          projectSliderStates.push(state);
        });

        refreshSliderToggleButtonsText();

        window.addEventListener('resize', function () {
          if (projectResizeFrameId) return;
          projectResizeFrameId = window.requestAnimationFrame(function () {
            projectResizeFrameId = 0;
            projectSliderStates.forEach(function (state) {
              updateSliderLayoutMetrics(state);
              snapLaneToCenter(state, 0);
              applyLaneTransform(state);
            });
          });
        });
      }

      function setProjectsExpandedState(isExpanded) {
        if (!projectsSection || !projectsExpandedContent || !toggleProjectsExpandedButton) return;

        projectsSection.classList.toggle('projects-expanded', isExpanded);
        projectsExpandedContent.hidden = !isExpanded;
        toggleProjectsExpandedButton.setAttribute('aria-expanded', String(isExpanded));
        setProjectsExpandedButtonText(isExpanded);

        if (isExpanded) {
          setupProjectSliders();
          projectSliderStates.forEach(function (state) {
            state.isVisible = true;
            updateSliderLayoutMetrics(state);
            snapLaneToCenter(state, 0);
            applyLaneTransform(state);
          });
          syncProjectAnimationLoopState();
          return;
        }

        projectSliderStates.forEach(function (state) {
          state.isVisible = false;
        });
        stopProjectAnimationLoop();
      }

      if (toggleProjectsExpandedButton) {
        toggleProjectsExpandedButton.addEventListener('click', function () {
          const currentState = toggleProjectsExpandedButton.getAttribute('aria-expanded') === 'true';
          setProjectsExpandedState(!currentState);
        });
      }

      function scrollToCenter(element) {
        const rect = element.getBoundingClientRect();
        const sectionCenter = window.scrollY + rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const targetScroll = Math.min(maxScroll, Math.max(0, sectionCenter - viewportCenter));
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }

      function highlightSection(targetId) {
        const section = document.querySelector(targetId);
        if (!section) return;

        if (activeSection && activeSection !== section) {
          activeSection.classList.remove('section-focus');
        }

        section.classList.remove('section-focus');
        if (sectionHighlightFrameId) {
          window.cancelAnimationFrame(sectionHighlightFrameId);
          sectionHighlightFrameId = 0;
        }
        sectionHighlightFrameId = window.requestAnimationFrame(function () {
          sectionHighlightFrameId = 0;
          section.classList.add('section-focus');
        });
        activeSection = section;

        if (activeTimer) {
          clearTimeout(activeTimer);
          activeTimer = null;
        }
        activeTimer = window.setTimeout(function () {
          activeTimer = null;
          section.classList.remove('section-focus');
          if (activeSection === section) activeSection = null;
        }, 1700);
      }

      function navigateToTarget(targetId) {
        if (!targetId || targetId === '#') return false;
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return false;

        const isMobileViewport = phoneViewportQuery ? phoneViewportQuery.matches : window.innerWidth <= 767;
        const useDefaultTopScroll = isMobileViewport && targetId === '#projects';

        if (useDefaultTopScroll) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          scrollToCenter(targetSection);
        }

        if (pendingSectionHighlightTimeoutId) {
          window.clearTimeout(pendingSectionHighlightTimeoutId);
        }
        pendingSectionHighlightTimeoutId = window.setTimeout(function () {
          pendingSectionHighlightTimeoutId = 0;
          highlightSection(targetId);
        }, useDefaultTopScroll ? 360 : 460);

        return true;
      }

      function clearHashFromUrl() {
        if (!window.location.hash || !window.history || typeof window.history.replaceState !== 'function') return;
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
          const targetId = link.getAttribute('href');
          if (!targetId || targetId.charAt(0) !== '#') return;
          if (navigateToTarget(targetId)) {
            event.preventDefault();
          }
        });
      });

      function toPositiveModulo(value, modulo) {
        return ((value % modulo) + modulo) % modulo;
      }

      function getCircularOffset(index, position, count) {
        const wrappedPosition = toPositiveModulo(position, count);
        let offset = index - wrappedPosition;
        if (offset > count / 2) offset -= count;
        if (offset < -count / 2) offset += count;
        return offset;
      }

      function setupRadialMenu() {
        if (
          !radialMenuToggleButton ||
          !radialMenuPanel ||
          !radialMenuShell ||
          !radialMenuCloseButton ||
          radialMenuItems.length === 0
        ) {
          return;
        }

        const radialMenuOrbit = radialMenuShell.querySelector('.radial-menu-orbit');
        if (!radialMenuOrbit) return;

        const radialState = {
          isOpen: false,
          activeIndex: 0,
          wheelAccumulator: 0,
          isDragging: false,
          pointerId: null,
          dragStartY: 0,
          hasSteppedInDrag: false,
          suppressBackgroundTap: false,
          inputLockUntil: 0,
          navigateTimeoutId: 0
        };
        const itemCount = radialMenuItems.length;
        const dragStepThreshold = 34;

        function isPhoneViewport() {
          return phoneViewportQuery ? phoneViewportQuery.matches : window.innerWidth <= 767;
        }

        function trySetPointerCapture(pointerId) {
          if (typeof radialMenuShell.setPointerCapture !== 'function') return;
          try {
            radialMenuShell.setPointerCapture(pointerId);
          } catch (error) {
            // Some browsers may reject pointer capture if pointer state changes quickly.
          }
        }

        function tryReleasePointerCapture(pointerId) {
          if (typeof radialMenuShell.releasePointerCapture !== 'function') return;
          if (typeof radialMenuShell.hasPointerCapture === 'function' && !radialMenuShell.hasPointerCapture(pointerId)) {
            return;
          }
          try {
            radialMenuShell.releasePointerCapture(pointerId);
          } catch (error) {
            // Ignore capture-release errors to prevent interaction crashes.
          }
        }

        function getCssNumber(variableName, fallbackValue) {
          const rawValue = window.getComputedStyle(radialMenuOrbit).getPropertyValue(variableName);
          const parsedValue = Number.parseFloat(rawValue);
          return Number.isNaN(parsedValue) ? fallbackValue : parsedValue;
        }

        function syncWheelGeometry() {
          const radius = getCssNumber('--wheel-radius', 280);
          const toggleRect = radialMenuToggleButton.getBoundingClientRect();
          const centerX = toggleRect.left - radius + toggleRect.width * 0.62;
          const centerY = toggleRect.bottom + 86;
          radialMenuOrbit.style.setProperty('--wheel-center-x', centerX + 'px');
          radialMenuOrbit.style.setProperty('--wheel-center-y', centerY + 'px');
        }

        function getActiveIndex() {
          return toPositiveModulo(radialState.activeIndex, itemCount);
        }

        function renderWheel() {
          const radius = getCssNumber('--wheel-radius', 280);
          const centerX = getCssNumber('--wheel-center-x', -220);
          const centerY = getCssNumber('--wheel-center-y', 220);
          const stepAngle = getCssNumber('--wheel-step-angle', 16);
          const tiltFactor = getCssNumber('--wheel-tilt-factor', 0.42);
          const minScale = getCssNumber('--wheel-scale-min', 0.8);
          const minOpacity = getCssNumber('--wheel-fade-min', 0.3);

          radialMenuItems.forEach(function (item, index) {
            const offset = getCircularOffset(index, radialState.activeIndex, itemCount);
            const absOffset = Math.abs(offset);
            const angle = offset * stepAngle;
            const radians = angle * (Math.PI / 180);
            const x = centerX + radius * Math.cos(radians);
            const y = centerY + radius * Math.sin(radians);
            const scale = Math.max(minScale, 1 - absOffset * 0.16);
            const opacity = Math.max(minOpacity, 1 - absOffset * 0.35);
            const tilt = offset === 0 ? 0 : angle * tiltFactor;
            const isActive = offset === 0;

            item.style.setProperty('--item-x', x + 'px');
            item.style.setProperty('--item-y', y + 'px');
            item.style.setProperty('--item-tilt', tilt + 'deg');
            item.style.setProperty('--item-scale', String(scale));
            item.style.setProperty('--item-opacity', String(opacity));
            item.classList.toggle('is-active', isActive);
            item.setAttribute('aria-current', isActive ? 'true' : 'false');
          });
        }

        function stepWheel(direction) {
          const now = performance.now();
          if (now < radialState.inputLockUntil) return false;
          if (direction === 0) return false;

          radialState.activeIndex = toPositiveModulo(radialState.activeIndex + (direction > 0 ? 1 : -1), itemCount);
          radialState.inputLockUntil = now + 260;
          renderWheel();
          return true;
        }

        function setRadialMenuOpen(nextOpen) {
          if (nextOpen && !isPhoneViewport()) return;
          radialState.isOpen = Boolean(nextOpen);
          document.body.classList.toggle('radial-menu-open', radialState.isOpen);
          radialMenuToggleButton.setAttribute('aria-expanded', String(radialState.isOpen));
          radialMenuPanel.setAttribute('aria-hidden', String(!radialState.isOpen));

          if (radialState.isOpen) {
            syncWheelGeometry();
            radialState.wheelAccumulator = 0;
            radialState.hasSteppedInDrag = false;
            radialState.dragStartY = 0;
            radialState.inputLockUntil = 0;
            radialMenuShell.focus({ preventScroll: true });
            renderWheel();
            return;
          }

          if (radialState.pointerId !== null) {
            tryReleasePointerCapture(radialState.pointerId);
          }
          radialState.isDragging = false;
          radialState.pointerId = null;
        }

        radialMenuToggleButton.addEventListener('click', function () {
          setRadialMenuOpen(!radialState.isOpen);
        });

        radialMenuCloseButton.addEventListener('click', function () {
          setRadialMenuOpen(false);
        });

        radialMenuShell.addEventListener('wheel', function (event) {
          if (!radialState.isOpen) return;
          event.preventDefault();
          radialState.wheelAccumulator += event.deltaY;
          if (Math.abs(radialState.wheelAccumulator) < 72) return;
          const direction = radialState.wheelAccumulator > 0 ? 1 : -1;
          stepWheel(direction);
          radialState.wheelAccumulator = 0;
        }, { passive: false });

        radialMenuShell.addEventListener('pointerdown', function (event) {
          if (!radialState.isOpen) return;
          if (event.pointerType === 'mouse') return;
          radialState.isDragging = true;
          radialState.pointerId = event.pointerId;
          radialState.dragStartY = event.clientY;
          radialState.hasSteppedInDrag = false;
          radialState.suppressBackgroundTap = false;
          trySetPointerCapture(event.pointerId);
        });

        radialMenuShell.addEventListener('pointermove', function (event) {
          if (!radialState.isDragging || event.pointerId !== radialState.pointerId) return;
          const deltaY = event.clientY - radialState.dragStartY;
          if (Math.abs(deltaY) > 6) {
            radialState.suppressBackgroundTap = true;
          }
          if (radialState.hasSteppedInDrag || Math.abs(deltaY) < dragStepThreshold) return;
          const direction = deltaY > 0 ? -1 : 1;
          radialState.hasSteppedInDrag = stepWheel(direction);
        });

        radialMenuShell.addEventListener('pointerup', function (event) {
          if (!radialState.isDragging) return;
          if (event.pointerId !== radialState.pointerId) return;
          radialState.isDragging = false;
          radialState.pointerId = null;
          radialState.dragStartY = 0;
          radialState.hasSteppedInDrag = false;
          tryReleasePointerCapture(event.pointerId);
        });

        radialMenuShell.addEventListener('pointercancel', function (event) {
          if (!radialState.isDragging) return;
          if (event.pointerId !== radialState.pointerId) return;
          radialState.isDragging = false;
          radialState.pointerId = null;
          radialState.dragStartY = 0;
          radialState.hasSteppedInDrag = false;
        });

        radialMenuShell.addEventListener('click', function (event) {
          if (!radialState.isOpen) return;
          const clickTarget = event.target instanceof Element ? event.target : null;
          if (clickTarget && clickTarget.closest('[data-radial-item]')) return;
          if (radialState.suppressBackgroundTap) {
            radialState.suppressBackgroundTap = false;
            return;
          }
          setRadialMenuOpen(false);
        });

        radialMenuItems.forEach(function (item, index) {
          item.addEventListener('click', function (event) {
            event.preventDefault();
            if (radialState.suppressBackgroundTap) {
              radialState.suppressBackgroundTap = false;
              return;
            }
            radialState.activeIndex = index;
            radialState.inputLockUntil = performance.now() + 260;
            renderWheel();

            if (radialState.navigateTimeoutId) {
              window.clearTimeout(radialState.navigateTimeoutId);
            }

            const targetHref = item.getAttribute('href') || '';
            radialState.navigateTimeoutId = window.setTimeout(function () {
              setRadialMenuOpen(false);
              if (!targetHref || targetHref === '#') return;
              if (targetHref.charAt(0) === '#') {
                navigateToTarget(targetHref);
                return;
              }
              window.location.href = targetHref;
            }, 260);
          });
        });

        document.addEventListener('keydown', function (event) {
          if (!radialState.isOpen) return;

          if (event.key === 'Escape') {
            event.preventDefault();
            setRadialMenuOpen(false);
            return;
          }

          if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            event.preventDefault();
            stepWheel(1);
            return;
          }

          if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            event.preventDefault();
            stepWheel(-1);
            return;
          }

          if (event.key === 'Enter') {
            event.preventDefault();
            const activeItem = radialMenuItems[getActiveIndex()];
            if (activeItem) activeItem.click();
          }
        });

        let radialSyncFrameId = 0;
        function scheduleRadialWheelSync() {
          if (!radialState.isOpen || radialSyncFrameId) return;
          radialSyncFrameId = window.requestAnimationFrame(function () {
            radialSyncFrameId = 0;
            syncWheelGeometry();
            renderWheel();
          });
        }

        window.addEventListener('resize', function () {
          if (!isPhoneViewport() && radialState.isOpen) {
            setRadialMenuOpen(false);
            return;
          }
          scheduleRadialWheelSync();
        });

        window.addEventListener('scroll', scheduleRadialWheelSync, { passive: true });

        syncWheelGeometry();
        renderWheel();
      }

      function focusSectionFromHash() {
        const targetId = window.location.hash;
        if (!targetId || targetId === '#') return;
        const targetSection = document.querySelector(targetId);
        if (!targetSection) {
          clearHashFromUrl();
          return;
        }

        if (focusHashScrollTimeoutId) {
          window.clearTimeout(focusHashScrollTimeoutId);
          focusHashScrollTimeoutId = 0;
        }
        if (focusHashHighlightTimeoutId) {
          window.clearTimeout(focusHashHighlightTimeoutId);
          focusHashHighlightTimeoutId = 0;
        }

        focusHashScrollTimeoutId = window.setTimeout(function () {
          focusHashScrollTimeoutId = 0;
          scrollToCenter(targetSection);
          focusHashHighlightTimeoutId = window.setTimeout(function () {
            focusHashHighlightTimeoutId = 0;
            highlightSection(targetId);
            clearHashFromUrl();
          }, 260);
        }, 120);
      }

      function setFormStatus(message, isError) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.classList.toggle('is-error', Boolean(isError));
        formStatus.classList.toggle('is-success', !isError && message !== '');
      }

      function setFormSubmitting(isSubmitting) {
        isFormSubmitting = isSubmitting;
        if (!formSubmitButton) return;
        formSubmitButton.disabled = isSubmitting;
        formSubmitButton.textContent = isSubmitting ? getDynamicString('formSubmittingButton') : getDynamicString('formSubmitButton');
      }

      const EMAILJS_PLACEHOLDER_VALUES = {
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
        serviceId: 'YOUR_EMAILJS_SERVICE_ID',
        templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
        autoReplyTemplateId: 'YOUR_EMAILJS_AUTOREPLY_TEMPLATE_ID'
      };

      // Resolve URLs defensively to prevent malformed dataset values from breaking form flow.
      function resolveSafeHttpUrl(rawUrl, fallbackUrl) {
        try {
          const fallback = new URL(fallbackUrl, window.location.href);
          const candidateText = typeof rawUrl === 'string' ? rawUrl.trim() : '';
          if (!candidateText) return fallback.href;
          const candidate = new URL(candidateText, window.location.href);
          if (candidate.protocol !== 'http:' && candidate.protocol !== 'https:') {
            return fallback.href;
          }
          return candidate.href;
        } catch (error) {
          return new URL(fallbackUrl, window.location.href).href;
        }
      }

      function getEmailJsConfig(form) {
        const fallbackChecklistUrl = new URL('assets/files/checklist-placeholder.txt', window.location.href).href;
        const checklistUrlIt = form.dataset.checklistUrl || fallbackChecklistUrl;
        const checklistUrlEn = form.dataset.checklistUrlEn || checklistUrlIt;
        return {
          publicKey: form.dataset.emailjsPublicKey || '',
          serviceId: form.dataset.emailjsServiceId || '',
          templateId: form.dataset.emailjsTemplateId || '',
          autoReplyTemplateId: form.dataset.emailjsAutoreplyTemplateId || '',
          autoReplyTemplateIdEn: form.dataset.emailjsAutoreplyTemplateIdEn || '',
          checklistUrl: form.dataset.activeChecklistUrl || checklistUrlIt,
          checklistUrlIt: checklistUrlIt,
          checklistUrlEn: checklistUrlEn,
          successUrl: form.dataset.successUrl || 'assets/html/form-success.html'
        };
      }

      function getContactFormFields(form) {
        return {
          nameField: form.querySelector('#text'),
          emailField: form.querySelector('#email'),
          messageField: form.querySelector('#message'),
          checklistField: form.querySelector('#lead-magnet'),
          honeypotField: form.querySelector('#website')
        };
      }

      function buildTemplateParams(fields) {
        const contactName = fields.nameField ? fields.nameField.value.trim() : '';
        const checklistRequested = Boolean(fields.checklistField && fields.checklistField.checked);
        const checklistValue = checklistRequested ? 'yes' : 'no';
        const wantsChecklistLabel = currentLanguage === 'en'
          ? (checklistRequested ? 'Yes' : 'No')
          : (checklistRequested ? 'Si' : 'No');
        const autoReplyChecklistValue = checklistRequested ? wantsChecklistLabel : '';
        const autoReplyCopy = currentLanguage === 'en'
          ? {
            title: contactName ? 'Message received, ' + contactName : 'Message received',
            intro: contactName ? 'Hi ' + contactName + ', thanks for reaching out.' : 'Hi, thanks for reaching out.',
            lineOne: 'I will carefully review the information you sent and get back to you via email within 24 hours.',
            lineTwo: 'In my follow-up email, I will also include details to schedule a brief call, should you wish to discuss the project structure further.',
            checklistLabel: checklistRequested
              ? 'As promised, you can find the guide below'
              : 'I am leaving an unexpected extra for you below (even though you skipped the checkbox... &#128521;)',
            downloadLabel: checklistRequested
              ? 'Guide download'
              : 'I figured this guide might come in handy for your project anyway.',
            downloadCta: checklistRequested
              ? 'Open guide'
              : 'Grab it anyway',
            footer: 'This is an automated reply.'
          }
          : {
            title: contactName ? 'Messaggio ricevuto, ' + contactName : 'Messaggio ricevuto',
            intro: contactName ? 'Ciao ' + contactName + ', grazie per avermi contattato!' : 'Ciao, grazie per avermi contattato!',
            lineOne: 'Analizzerò con cura le informazioni che mi hai inviato e ti ricontatterò via email entro 24 ore.',
            lineTwo: 'Nella prossima email troverai anche i dettagli per fissare una breve call, qualora volessi approfondire la struttura del progetto a voce.',
            checklistLabel: checklistRequested
              ? 'Come promesso, trovi la guida qui sotto'
              : 'Ho deciso di lasciarti comunque un extra qui sotto, nel caso ti fossi dimenticato della casella... &#128521;',
            downloadLabel: checklistRequested
              ? 'Download guida'
              : 'Ho pensato che questa guida potesse esserti utile comunque per il tuo progetto.',
            downloadCta: checklistRequested
              ? 'Apri guida'
              : 'Scaricala lo stesso',
            footer: 'Questa e una risposta automatica.'
          };

        return {
          from_name: contactName,
          reply_to: fields.emailField ? fields.emailField.value.trim() : '',
          message: fields.messageField ? fields.messageField.value.trim() : '',
          wants_checklist: wantsChecklistLabel,
          wants_checklist_value: checklistValue,
          wants_checklist_label: wantsChecklistLabel,
          auto_reply_checklist_value: autoReplyChecklistValue,
          preferred_language: currentLanguage,
          site_owner_name: 'Loris Battaglini',
          auto_reply_title: autoReplyCopy.title,
          auto_reply_intro: autoReplyCopy.intro,
          auto_reply_line_one: autoReplyCopy.lineOne,
          auto_reply_line_two: autoReplyCopy.lineTwo,
          auto_reply_checklist_label: autoReplyCopy.checklistLabel,
          auto_reply_download_label: autoReplyCopy.downloadLabel,
          auto_reply_download_cta: autoReplyCopy.downloadCta,
          auto_reply_footer: autoReplyCopy.footer,
          to_name: contactName,
          to_email: fields.emailField ? fields.emailField.value.trim() : ''
        };
      }

      function isMissingEmailJsConfig(config) {
        return (
          !config.publicKey ||
          !config.serviceId ||
          !config.templateId ||
          config.publicKey === EMAILJS_PLACEHOLDER_VALUES.publicKey ||
          config.serviceId === EMAILJS_PLACEHOLDER_VALUES.serviceId ||
          config.templateId === EMAILJS_PLACEHOLDER_VALUES.templateId
        );
      }

      function setupContactForm() {
        if (!contactForm) return;
        const formFields = getContactFormFields(contactForm);

        contactForm.addEventListener('submit', async function (event) {
          event.preventDefault();
          setFormStatus('', false);

          if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
          }

          const config = getEmailJsConfig(contactForm);
          const safeSuccessUrl = resolveSafeHttpUrl(config.successUrl, 'assets/html/form-success.html');

          if (formFields.honeypotField && formFields.honeypotField.value.trim() !== '') {
            window.location.href = safeSuccessUrl;
            return;
          }

          if (
            !window.emailjs ||
            typeof window.emailjs.send !== 'function' ||
            typeof window.emailjs.init !== 'function'
          ) {
            setFormStatus(getDynamicString('formServiceUnavailable'), true);
            return;
          }

          if (isMissingEmailJsConfig(config)) {
            setFormStatus(getDynamicString('formConfigMissing'), true);
            return;
          }

          if (config.publicKey.indexOf('@') !== -1) {
            setFormStatus(getDynamicString('formPublicKeyInvalid'), true);
            return;
          }

          setFormSubmitting(true);
          try {
            window.emailjs.init({ publicKey: config.publicKey });
            const templateParams = buildTemplateParams(formFields);
            const checklistFallbackUrl = 'assets/files/checklist-placeholder.txt';
            templateParams.checklist_url = resolveSafeHttpUrl(config.checklistUrl, checklistFallbackUrl);
            templateParams.checklist_url_it = resolveSafeHttpUrl(config.checklistUrlIt, templateParams.checklist_url);
            templateParams.checklist_url_en = resolveSafeHttpUrl(config.checklistUrlEn, templateParams.checklist_url_it);

            await window.emailjs.send(config.serviceId, config.templateId, templateParams);

            const selectedAutoReplyTemplateId = templateParams.preferred_language === 'en'
              ? (config.autoReplyTemplateIdEn || config.autoReplyTemplateId)
              : config.autoReplyTemplateId;
            const autoReplyConfigured = selectedAutoReplyTemplateId &&
              selectedAutoReplyTemplateId !== EMAILJS_PLACEHOLDER_VALUES.autoReplyTemplateId;

            if (!autoReplyConfigured) {
              throw new Error('Template auto-reply non configurato');
            }

            await window.emailjs.send(config.serviceId, selectedAutoReplyTemplateId, templateParams);
            window.location.href = safeSuccessUrl;
          } catch (error) {
            const errorText = error && (error.text || error.message) ? ' (' + (error.text || error.message) + ')' : '';
            setFormStatus(getDynamicString('formSubmitErrorPrefix') + errorText, true);
          } finally {
            setFormSubmitting(false);
          }
        });
      }

      setupUniverseParticles();
      applyTheme(getStoredTheme(), false);
      setLanguage(getStoredLanguage(), false);
      setupRadialMenu();
      setupContactForm();
      focusSectionFromHash();
      window.addEventListener('hashchange', focusSectionFromHash);
    })();

