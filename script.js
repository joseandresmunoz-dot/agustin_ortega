// ===================================
// EmailJS Init
// ===================================
emailjs.init('ds1f8OLYr9pDlFbgE');

// ===================================
// DOM Elements
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const statNumbers = document.querySelectorAll('.stat-number');

// ===================================
// Mobile Menu Toggle
// ===================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// Navbar Scroll Effect
// ===================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Back to Top Button
// ===================================
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Animated Counter for Stats
// ===================================
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// Form Validation and Submission
// ===================================
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone === '' || re.test(phone);
};

const showError = (formGroup, message) => {
    formGroup.classList.add('error');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
};

const clearError = (formGroup) => {
    formGroup.classList.remove('error');
};

const validateForm = () => {
    let isValid = true;
    
    // Clear all previous errors
    document.querySelectorAll('.form-group').forEach(group => {
        clearError(group);
    });
    
    // Validate name
    const nameInput = document.getElementById('name');
    const nameGroup = nameInput.closest('.form-group');
    if (nameInput.value.trim() === '') {
        showError(nameGroup, 'Por favor ingresa tu nombre');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showError(nameGroup, 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }
    
    // Validate email
    const emailInput = document.getElementById('email');
    const emailGroup = emailInput.closest('.form-group');
    if (emailInput.value.trim() === '') {
        showError(emailGroup, 'Por favor ingresa tu email');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailGroup, 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    // Validate phone (optional but must be valid format if provided)
    const phoneInput = document.getElementById('phone');
    const phoneGroup = phoneInput.closest('.form-group');
    if (phoneInput.value.trim() !== '' && !validatePhone(phoneInput.value)) {
        showError(phoneGroup, 'Por favor ingresa un teléfono válido');
        isValid = false;
    }
    
    // Validate plan selection
    const planSelect = document.getElementById('plan');
    const planGroup = planSelect.closest('.form-group');
    if (planSelect.value === '') {
        showError(planGroup, 'Por favor selecciona un plan');
        isValid = false;
    }
    
    // Validate message
    const messageInput = document.getElementById('message');
    const messageGroup = messageInput.closest('.form-group');
    if (messageInput.value.trim() === '') {
        showError(messageGroup, 'Por favor ingresa un mensaje');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageGroup, 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
};

// Mostrar/ocultar campo de patología
document.getElementById('patologia').addEventListener('change', function () {
    const detalle = document.getElementById('patologiaDetalle');
    detalle.style.display = this.value === 'si' ? 'block' : 'none';
    if (this.value !== 'si') {
        document.getElementById('patologiaTexto').value = '';
    }
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        const templateParams = {
            nombre:    document.getElementById('name').value,
            email:     document.getElementById('email').value,
            telefono:  document.getElementById('phone').value,
            plan:      document.getElementById('plan').value,
            entrenado: document.getElementById('entrenado').value,
            patologia: document.getElementById('patologia').value,
            patologia_detalle: document.getElementById('patologiaTexto').value || 'No aplica',
            mensaje:   document.getElementById('message').value
        };

        emailjs.send('service_795hpnt', 'template_q4es57m', templateParams)
            .then(() => {
                const successMessage = document.getElementById('formSuccess');
                successMessage.classList.add('show');
                contactForm.reset();
                document.getElementById('patologiaDetalle').style.display = 'none';
                setTimeout(() => successMessage.classList.remove('show'), 5000);
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                alert('Hubo un error al enviar el mensaje. Por favor intentá de nuevo.');
            })
            .finally(() => {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
            });
    }
});

// Real-time validation on input
const inputs = contactForm.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        const formGroup = input.closest('.form-group');
        
        if (input.value.trim() !== '') {
            if (input.type === 'email' && !validateEmail(input.value)) {
                showError(formGroup, 'Por favor ingresa un email válido');
            } else if (input.type === 'tel' && !validatePhone(input.value)) {
                showError(formGroup, 'Por favor ingresa un teléfono válido');
            } else {
                clearError(formGroup);
            }
        }
    });
    
    input.addEventListener('input', () => {
        const formGroup = input.closest('.form-group');
        if (formGroup.classList.contains('error') && input.value.trim() !== '') {
            clearError(formGroup);
        }
    });
});

// ===================================
// Scroll Animations for Sections
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
const sections = document.querySelectorAll('.services, .results, .pricing, .contact');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const updateActiveLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', updateActiveLink);

// ===================================
// Smooth Scroll for All Internal Links
// ===================================
const allLinks = document.querySelectorAll('a[href^="#"]');
allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Prevent Form Resubmission on Page Reload
// ===================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===================================
// Console Log for Development
// ===================================
console.log('%c🏋️ FitProTrainer Landing Page Loaded! 🏋️', 'color: #dc2626; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped with ❤️ for fitness enthusiasts', 'color: #a3a3a3; font-size: 14px;');