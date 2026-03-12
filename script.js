// ── Hamburger Menu ──────────────────────────────────────
(function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
})();

// ── Smooth scrolling ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Navbar background on scroll ───────────────────────────
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.style.background = window.scrollY > 100
        ? 'rgba(254, 254, 254, 0.98)'
        : 'rgba(254, 254, 254, 0.95)';
});

// ── Notification system ───────────────────────────────────
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white; padding: 1rem 1.5rem; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 3000;
        max-width: 400px; animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight  { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    .notification-content { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
    .notification-close { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; line-height: 1; }
    .notification-close:hover { opacity: 0.8; }
`;
document.head.appendChild(notificationStyles);

// ── Modal functions ───────────────────────────────────────
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.addEventListener('click', function (event) {
    const modal = document.getElementById('bookingModal');
    if (modal && event.target === modal) closeBookingModal();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeBookingModal();
});

// ── Intersection Observer (section fade-in) ───────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ── Lazy image loading ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.addEventListener('load', () => img.classList.add('loaded'));
                if (img.complete) img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[loading="lazy"]').forEach(img => imageObserver.observe(img));
});

// ── Gallery lightbox ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });
});

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); display: flex; justify-content: center;
        align-items: center; z-index: 4000; cursor: pointer;
    `;
    const img = document.createElement('img');
    img.src = src; img.alt = alt;
    img.style.cssText = `max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 8px;`;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute; top: 20px; right: 30px; background: none;
        border: none; color: white; font-size: 3rem; cursor: pointer; z-index: 4001;
    `;
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    const close = () => { document.body.removeChild(lightbox); document.body.style.overflow = 'auto'; };
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    closeBtn.addEventListener('click', close);
    const onKey = e => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } };
    document.addEventListener('keydown', onKey);
}

// ── Scroll-to-top button ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
        background-color: var(--primary-color); color: var(--text-dark);
        border: none; border-radius: 50%; cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 1000;
        opacity: 0; transform: translateY(20px); transition: all 0.3s ease; font-size: 1.2rem;
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.style.opacity = window.scrollY > 500 ? '1' : '0';
        btn.style.transform = window.scrollY > 500 ? 'translateY(0)' : 'translateY(20px)';
    });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btn.addEventListener('mouseenter', () => { btn.style.backgroundColor = 'var(--accent-color)'; btn.style.transform = 'translateY(-2px)'; });
    btn.addEventListener('mouseleave', () => { btn.style.backgroundColor = 'var(--primary-color)'; btn.style.transform = 'translateY(0)'; });
});

// ── Analytics tracking ────────────────────────────────────
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', () => trackEvent('cta_click', { button_text: btn.textContent.trim() }));
    });
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => trackEvent('phone_click'));
    });
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', () => trackEvent('email_click'));
    });
});

// ── Contact form submission ───────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        try {
            const response = await fetch('https://formspree.io/f/mnnwqakp', {
                method: 'POST', body: data, headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                showNotification('Thank you! Your form has been submitted successfully.', 'success');
                e.target.reset();
            } else {
                const err = await response.json();
                showNotification(err.error || 'Submission failed. Please try again.', 'error');
            }
        } catch {
            showNotification('Submission failed. Please try again.', 'error');
        }
    });
});
