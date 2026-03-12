(function () {
      const STORAGE_KEY = 'lb-language';
      const THEME_KEY = 'lb-theme';
      const DEFAULT_LANGUAGE = 'it';
      const SUPPORTED_LANGUAGES = ['it', 'en'];
      const universeCanvas = document.querySelector('#universe-canvas');
      const reducedMotionQuery = typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
      const COPY = {
        it: {
          pageTitle: 'Messaggio inviato | Loris Battaglini',
          metaDescription: 'Conferma di invio del form di contatto.',
          heading: 'Richiesta inviata con successo!',
          lineOne: 'Controlla la tua casella di posta: ti ho inviato un\'email di conferma. Se non la vedi, prova a dare un\'occhiata alla cartella spam o promozioni.',
          lineTwo: 'Ti risponderò personalmente entro 24 ore!',
          sendAnother: 'Invia un altro messaggio',
          backHome: 'Torna alla home'
        },
        en: {
          pageTitle: 'Message sent | Loris Battaglini',
          metaDescription: 'Confirmation that your contact form was sent.',
          heading: 'Message sent successfully!',
          lineOne: 'Thank you for reaching out. Please check your inbox for a confirmation email. If you don\'t see it, be sure to peek into your spam or promotions folder!',
          lineTwo: 'I\'ll get back to you personally within 24 hours!',
          sendAnother: 'Send another message',
          backHome: 'Back to home'
        }
      };

      const universeState = {
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
        isSetup: false,
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
        return {
          x: randomBetween(0, width),
          y: randomBetween(0, height),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
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
          twinkleAmplitude: randomBetween(0.08, 0.34) * (isLarge ? 1.35 : 0.86)
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
              const impulse = -(1 + profile.restitution) * velocityAlongNormal / ((1 / particleA.mass) + (1 / particleB.mass));
              const impulseX = impulse * normalX;
              const impulseY = impulse * normalY;
              particleA.vx -= impulseX / particleA.mass;
              particleA.vy -= impulseY / particleA.mass;
              particleB.vx += impulseX / particleB.mass;
              particleB.vy += impulseY / particleB.mass;
            }

            const impactStrength = clampValue(Math.abs(velocityAlongNormal) * 0.92 + overlap * 0.35, 0, 1.4);
            const canBurst = particleA.burstCooldownMs <= 0 || particleB.burstCooldownMs <= 0;
            if (canBurst && impactStrength > profile.impactThreshold) {
              spawnUniverseFragments((particleA.x + particleB.x) * 0.5, (particleA.y + particleB.y) * 0.5, impactStrength, particleA.color, particleB.color);
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
        if (universeState.themeMode !== nextThemeMode) {
          universeState.themeMode = nextThemeMode;
          resetUniverseAdaptiveQuality();
          universeState.particles = [];
          universeState.fragments = [];
        }

        resizeUniverseCanvas();

        const reduceMotionEnabled = reducedMotionQuery ? reducedMotionQuery.matches : false;
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

      function getLanguage() {
        try {
          const storedLanguage = localStorage.getItem(STORAGE_KEY);
          return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
        } catch (error) {
          return DEFAULT_LANGUAGE;
        }
      }

      function getTheme() {
        try {
          return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
        } catch (error) {
          return 'light';
        }
      }

      function applyTheme(theme) {
        const isDarkTheme = theme === 'dark';
        document.documentElement.classList.toggle('theme-dark', isDarkTheme);
        document.body.classList.toggle('theme-dark', isDarkTheme);
        syncUniverseParticlesState();
      }

      function applyLanguage(language) {
        const copy = COPY[language] || COPY.it;
        document.documentElement.lang = language;
        document.title = copy.pageTitle;

        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) {
          descriptionMeta.setAttribute('content', copy.metaDescription);
        }

        const i18nNodes = document.querySelectorAll('[data-success-key]');
        i18nNodes.forEach(function (node) {
          const key = node.getAttribute('data-success-key');
          if (!key || !Object.prototype.hasOwnProperty.call(copy, key)) return;
          node.textContent = copy[key];
        });
      }

      setupUniverseParticles();
      applyTheme(getTheme());
      applyLanguage(getLanguage());
    })();

