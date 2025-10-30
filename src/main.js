// main.js - улучшенная версия с современными анимациями
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация бегунков
    initRangeSliders();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
    
    // Инициализация параллакс эффектов
    initParallaxEffects();
    
    // Инициализация обработчиков форм
    initFormHandlers();
});

// Бегунки для выбора этажа и комнат
function initRangeSliders() {
    const floorRange = document.getElementById('floorRange');
    const floorValue = document.getElementById('floorValue');
    const roomsRange = document.getElementById('roomsRange');
    const roomsValue = document.getElementById('roomsValue');
    
    if (floorRange && floorValue) {
        floorRange.addEventListener('input', function() {
            const value = this.value;
            floorValue.textContent = value === '1' ? '1 этаж' : 
                                   value === '18' ? '18 этаж' : 
                                   `${value} этаж`;
            
            // Анимация изменения значения
            floorValue.style.transform = 'scale(1.1)';
            setTimeout(() => {
                floorValue.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (roomsRange && roomsValue) {
        roomsRange.addEventListener('input', function() {
            const value = this.value;
            const roomTexts = {
                '1': '1 комната',
                '2': '2 комнаты', 
                '3': '3 комнаты'
            };
            roomsValue.textContent = roomTexts[value] || 'Любое';
            
            // Анимация изменения значения
            roomsValue.style.transform = 'scale(1.1)';
            setTimeout(() => {
                roomsValue.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Плавные анимации при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Добавляем задержку для последовательной анимации карточек
                if (entry.target.classList.contains('card')) {
                    const cards = Array.from(entry.target.parentElement.children);
                    const index = cards.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    const animatedElements = document.querySelectorAll('.card, .fade-in, .img-fluid');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Параллакс эффекты для герой-секции
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// Обработчики форм с улучшенным UX
function initFormHandlers() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Анимация отправки
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Отправка...';
            submitBtn.disabled = true;
            
            // Имитация отправки
            setTimeout(() => {
                submitBtn.innerHTML = '✅ Отправлено!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                    
                    // Показываем уведомление об успехе
                    showNotification('Ваша заявка успешно отправлена!', 'success');
                }, 2000);
            }, 1500);
        });
    });
}

// Красивые уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification-alert`;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-check-circle me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        border: none;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Обработка модальных окон
document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
    button.addEventListener('click', function() {
        // Анимация кнопки при клике
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});