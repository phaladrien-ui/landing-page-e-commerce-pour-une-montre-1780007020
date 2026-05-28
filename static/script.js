```javascript
// static/script.js - JavaScript pour landing page e-commerce montre connectée de luxe

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // 1. MENU MOBILE - Hamburger toggle
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ============================================
    // 2. SCROLL SMOOTH - Navigation douce
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Hauteur du header fixe
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 3. HEADER SCROLL EFFECT - Apparition/disparition
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Ajouter une classe quand on scrolle
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Cacher/montrer le header
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            
            lastScroll = currentScroll;
        });
    }

    // ============================================
    // 4. ANIMATIONS AU SCROLL - Intersection Observer
    // ============================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel : arrêter d'observer une fois visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ============================================
    // 5. COMPTEUR ANIMÉ - Pour les statistiques
    // ============================================
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 secondes
                    const step = Math.ceil(target / (duration / 16)); // ~60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = current;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ============================================
    // 6. GALERIE D'IMAGES - Lightbox simplifié
    // ============================================
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryImages.length > 0 && lightbox) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const src = this.getAttribute('src') || this.getAttribute('data-src');
                if (src) {
                    lightboxImg.setAttribute('src', src);
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Fermer la lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ============================================
    // 7. BOUTON "RETOUR EN HAUT"
    // ============================================
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 8. FORMULAIRE DE NEWSLETTER
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulation d'envoi
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification('Merci pour votre inscription !', 'success');
                    emailInput.value = '';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                showNotification('Veuillez entrer un email valide.', 'error');
                emailInput.classList.add('error');
                setTimeout(() => {
                    emailInput.classList.remove('error');
                }, 3000);
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ============================================
    // 9. SYSTÈME DE NOTIFICATION
    // ============================================
    function showNotification(message, type = 'success') {
        // Supprimer les notifications existantes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Suppression automatique
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ============================================
    // 10. EFFET PARALLAXE LÉGER
    // ============================================
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrollPosition * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // ============================================
    // 11. GESTION DES PRIX - Animation au survol
    // ============================================
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });

    // ============================================
    // 12. LAZY LOADING POUR LES IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px'
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ============================================
    // 13. COMPTEUR DE CARACTÈRES POUR LES AVIS
    // ============================================
    const reviewTextarea = document.querySelector('.review-textarea');
    const charCount = document.querySelector('.char-count');
    
    if (reviewTextarea && charCount) {
        reviewTextarea.addEventListener('input', function() {
            const count = this.value.length;
            const max = this.getAttribute('maxlength') || 500;
            charCount.textContent = `${count}/${max}`;
            
            if (count > max * 0.9) {
                charCount.style.color = '#e74c3c';
            } else {
                charCount.style.color = '#999';
            }
        });
    }

    // ============================================
    // 14. ANIMATION DE CHARGEMENT
    // ============================================
    const loader = document.querySelector('.loader');
    
    if (loader) {
        window.addEventListener('load', function() {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }

    // ============================================
    // 15. GESTION DU THÈME SOMBRE/CLAIR
    // ============================================
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // Vérifier le thème sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                themeToggle.classList.add('dark');
            }
        }

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.classList.toggle('dark');
        });
    }

    // ============================================
    // 16. DÉTECTION DE LA VISIBILITÉ DE LA PAGE
    // ============================================
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page cachée - mettre en pause les animations
            document.body.classList.add('page-hidden');
        } else {
            // Page visible - reprendre les animations
            document.body.classList.remove('page-hidden');
        }
    });

    // ============================================
    // 17. GESTION DE LA CONNEXION RÉSEAU
    // ============================================
    window.addEventListener('online', function() {
        showNotification('Connexion rétablie', 'success');
    });

    window.addEventListener('offline', function() {
        showNotification('Connexion perdue', 'error');
    });

    // ============================================
    // 18. PERFORMANCE - Debounce pour le scroll
    // ============================================
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Appliquer le debounce aux événements de scroll si nécessaire
    const debouncedScroll = debounce(function() {
        // Actions à effectuer avec debounce
    }, 100);

    window.addEventListener('scroll', debouncedScroll);

    // ============================================
    // 19. INITIALISATION DES ANIMATIONS CSS
    // ============================================
    // Ajouter les classes d'animation aux éléments
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    document.querySelectorAll('.slide-in-left').forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    document.querySelectorAll('.slide-in-right').forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // ============================================
    // 20. MESSAGE DE BIENVENUE (optionnel)
    // ============================================
    console.log('%c⌚ Montre Connectée de Luxe - Landing Page', 'font-size: 20px; font-weight: bold; color: #c9a84c;');
    console.log('%cBienvenue sur notre site e-commerce', 'font-size: 14px; color: #666;');

}); // Fin du DOMContentLoaded
```