document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Allow skip link to function normally
            if (this.getAttribute('href') === '#main-content') {
                document.querySelector('#main-content').focus();
                return;
            }

            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking a link
            if (!mobileMenu.classList.contains('hidden')) {
                 mobileMenu.classList.add('hidden');
                 mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Three.js animated background
    function initializeHeroCanvas() {
        if (typeof THREE === 'undefined') {
            console.error('Three.js has not loaded.');
            return;
        }

        const container = document.getElementById('hero-canvas');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Elegant Geometry (Icosahedron)
        const geometry = new THREE.IcosahedronGeometry(2.5, 0);
        const material = new THREE.MeshStandardMaterial({
            color: 0x34D399, // Tailwind green-400
            wireframe: true,
            roughness: 0.5,
            metalness: 0.2
        });
        const shape = new THREE.Mesh(geometry, material);
        scene.add(shape);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x8B5CF6, 1.5); // Tailwind purple-500
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 7;

        // Handle window resize
        window.addEventListener('resize', () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (width > 0 && height > 0) {
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        });

        // Animate
        function animate() {
            requestAnimationFrame(animate);
            shape.rotation.x += 0.001;
            shape.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();
    }

    // Skills section animation
    function animateSkills() {
        const skillsSection = document.querySelector('#skills');
        if (!skillsSection) return;

        const skillBars = document.querySelectorAll('.skill-bar');

        // Set initial width to 0 for all bars
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        bar.style.width = bar.dataset.width;
                    });
                    observer.unobserve(skillsSection); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of the section is visible
        });

        observer.observe(skillsSection);
    }
    
    // --- NEW: Generic Reveal on Scroll Animation ---
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) return;

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // Initialize all scripts
    initializeHeroCanvas();
    animateSkills();
    revealOnScroll();
});