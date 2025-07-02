// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a delay to ensure Chart.js is fully loaded
    setTimeout(() => {
        initializeChart();
    }, 500);
    
    addInteractiveFeatures();
});

// Initialize the response time chart
function initializeChart() {
    const canvas = document.getElementById('responseChart');
    if (!canvas) {
        console.log('Chart canvas not found');
        return;
    }

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded, showing fallback chart');
        showFallbackChart();
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.log('Cannot get 2D context, showing fallback chart');
        showFallbackChart();
        return;
    }

    // Set canvas dimensions explicitly
    canvas.style.height = '300px';
    canvas.style.maxHeight = '300px';

    // Chart data based on the provided results
    const chartData = {
        labels: ['Pump On Notification', 'Pump Off Alert'],
        datasets: [{
            label: 'Response Time (seconds)',
            data: [16.34, 2.72],
            backgroundColor: ['#1FB8CD', '#FFC185'],
            borderColor: ['#1FB8CD', '#FFC185'],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'System Response Times Comparison',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                color: '#21808D'
            },
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.parsed.y}s`;
                    }
                },
                backgroundColor: 'rgba(33, 128, 141, 0.9)',
                titleColor: '#FCFCF9',
                bodyColor: '#FCFCF9',
                borderColor: '#21808D',
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 18,
                title: {
                    display: true,
                    text: 'Time (seconds)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(94, 82, 64, 0.2)'
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Notification Type',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    };

    try {
        const chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
        console.log('Chart created successfully');
    } catch (error) {
        console.error('Error creating chart:', error);
        showFallbackChart();
    }
}

// Fallback chart for when Chart.js is not available
function showFallbackChart() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;

    chartContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #f0f9ff, #e0f7fa); border-radius: 12px; border: 2px solid #1FB8CD;">
            <h4 style="color: #21808D; margin-bottom: 30px; font-size: 18px; font-weight: bold;">System Response Times Comparison</h4>
            <div style="display: flex; justify-content: space-around; align-items: end; height: 200px; margin: 20px 0;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 80px; height: 164px; background: linear-gradient(to top, #1FB8CD, #32B8C6); border-radius: 8px; display: flex; align-items: end; padding: 12px; color: white; font-weight: bold; justify-content: center; box-shadow: 0 4px 12px rgba(31, 184, 205, 0.3); position: relative;">
                        <span style="writing-mode: vertical-lr; text-orientation: mixed;">16.34s</span>
                        <div style="position: absolute; top: -30px; background: #21808D; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; white-space: nowrap;">High Response</div>
                    </div>
                    <span style="margin-top: 12px; font-size: 14px; font-weight: 600; color: #21808D;">Pump On</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 80px; height: 27px; background: linear-gradient(to top, #FFC185, #FFD4A6); border-radius: 8px; display: flex; align-items: center; padding: 12px; color: #8B4513; font-weight: bold; justify-content: center; box-shadow: 0 4px 12px rgba(255, 193, 133, 0.3); position: relative;">
                        <span>2.72s</span>
                        <div style="position: absolute; top: -30px; background: #D2BA4C; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; white-space: nowrap;">Fast Response</div>
                    </div>
                    <span style="margin-top: 12px; font-size: 14px; font-weight: 600; color: #21808D;">Pump Off</span>
                </div>
            </div>
            <div style="margin-top: 20px; display: flex; justify-content: center; gap: 30px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 20px; height: 20px; background: #1FB8CD; border-radius: 4px;"></div>
                    <span style="font-size: 12px; color: #666;">Normal Operation</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 20px; height: 20px; background: #FFC185; border-radius: 4px;"></div>
                    <span style="font-size: 12px; color: #666;">Emergency Response</span>
                </div>
            </div>
        </div>
        <div class="chart-caption" style="margin-top: 15px; font-size: 14px; color: #666; font-style: italic; text-align: center;">Figure 3: System response times comparison between pump on/off notifications</div>
    `;
}

// Add interactive features to enhance user experience
function addInteractiveFeatures() {
    // Add hover effects to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 15px 35px rgba(33, 128, 141, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)';
        });
    });

    // Add hover effects to component blocks in the diagram
    const componentBlocks = document.querySelectorAll('.component-block');
    componentBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 12px 25px rgba(33, 128, 141, 0.4)';
            this.style.zIndex = '10';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)';
            this.style.zIndex = '1';
        });
    });

    // Add smooth scrolling for better navigation (if needed)
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

    // Add image zoom effect on hover
    const images = document.querySelectorAll('.aquarium-image img, .iot-diagram img, .emergency-system img, .monitoring-features img, .component-item img, .blynk-app img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
            this.style.cursor = 'pointer';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add section highlight on scroll (for better readability)
    const sections = document.querySelectorAll('.poster-section');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -20% 0px'
    };

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.boxShadow = '0 12px 30px rgba(33, 128, 141, 0.15)';
                    entry.target.style.transform = 'translateY(-3px)';
                    entry.target.style.transition = 'all 0.4s ease';
                } else {
                    entry.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Add loading animation for chart
    animateMetricCards();
    
    // Add typewriter effect for key statistics
    setTimeout(() => {
        animateStatistics();
    }, 1000);
}

// Animate metric cards on load
function animateMetricCards() {
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 300));
    });
}

// Animate statistics with counting effect
function animateStatistics() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach((element, index) => {
        const finalValue = element.textContent;
        const isTime = finalValue.includes('s');
        const isPercentage = finalValue.includes('%');
        
        setTimeout(() => {
            if (isTime) {
                const numValue = parseFloat(finalValue);
                animateNumber(element, 0, numValue, 2000, 's');
            } else if (isPercentage) {
                const numValue = parseInt(finalValue);
                animateNumber(element, 0, numValue, 2000, '%');
            }
        }, index * 500);
    });
}

// Helper function to animate numbers
function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        if (isDecimal) {
            element.textContent = current.toFixed(2) + suffix;
        } else {
            element.textContent = Math.round(current) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = (isDecimal ? end.toFixed(2) : end) + suffix;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Add keyboard shortcuts for better accessibility
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                scrollToSection('.introduction');
                break;
            case '2':
                e.preventDefault();
                scrollToSection('.architecture');
                break;
            case '3':
                e.preventDefault();
                scrollToSection('.results');
                break;
            case '4':
                e.preventDefault();
                scrollToSection('.conclusion');
                break;
        }
    }
});

// Helper function to scroll to specific section
function scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add print optimization
window.addEventListener('beforeprint', function() {
    // Ensure chart is properly rendered for print
    if (typeof Chart !== 'undefined') {
        const charts = Chart.getChart('responseChart');
        if (charts) {
            charts.resize();
        }
    }
});

// Enhanced error handling and Chart.js loading check
window.addEventListener('load', function() {
    // Double-check chart initialization after page load
    setTimeout(() => {
        const canvas = document.getElementById('responseChart');
        if (canvas && typeof Chart !== 'undefined') {
            const existingChart = Chart.getChart(canvas);
            if (!existingChart) {
                console.log('Retry chart initialization...');
                initializeChart();
            }
        }
    }, 1000);
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading if needed
lazyLoadImages();
