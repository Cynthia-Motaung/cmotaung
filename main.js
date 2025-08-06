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
            if (this.getAttribute('href') === '#main-content') {
                document.querySelector('#main-content').focus();
                return;
            }
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
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
        const geometry = new THREE.IcosahedronGeometry(2.5, 0);
        const material = new THREE.MeshStandardMaterial({
            color: 0x34D399,
            wireframe: true,
            roughness: 0.5,
            metalness: 0.2
        });
        const shape = new THREE.Mesh(geometry, material);
        scene.add(shape);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x8B5CF6, 1.5);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        camera.position.z = 7;
        window.addEventListener('resize', () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (width > 0 && height > 0) {
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        });
        function animate() {
            requestAnimationFrame(animate);
            shape.rotation.x += 0.001;
            shape.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();
    }
    
    // Generic Reveal on Scroll Animation
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
        }, { threshold: 0.1 });
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // Glowing Cursor Effect
    function initializeCursorGlow() {
        const cursorGlow = document.getElementById('cursor-glow');
        if (!cursorGlow) return;

        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            });
        });
    }

    // CHATBOT LOGIC
    function initializeChatbot() {
        const chatbotIcon = document.getElementById('chatbot-icon');
        const chatbotWindow = document.getElementById('chatbot-window');
        const closeBtn = document.getElementById('chatbot-close-btn');
        const sendBtn = document.getElementById('chatbot-send-btn');
        const messagesContainer = document.getElementById('chatbot-messages');
        const input = document.getElementById('chatbot-input');

        if (!chatbotIcon || !chatbotWindow || !closeBtn || !sendBtn || !messagesContainer || !input) {
            // If any chatbot element is missing, don't run the script.
            console.warn('Chatbot elements not found. Chatbot initialization skipped.');
            return;
        }

        const knowledgeBase = {
            'default': "I'm not sure how to answer that. Could you ask about Cynthia's experience, skills, or career goals?",
            'greeting': "Hello! How can I help you learn more about Cynthia's professional background?",
            'experience': "Cynthia has hands-on experience developing end-to-end machine learning pipelines from her bootcamp capstone project. She also completed a data science project focused on deep learning for image classification, achieving over 95% accuracy.",
            'skills': "Cynthia's technical skills include C#, .NET Core, Python, Git, and various database technologies like MS SQL Server and PostgreSQL. She is also proficient in web technologies such as HTML, CSS, JavaScript, and Bootstrap.",
            'objectives': "Cynthia's career objective is to apply her expertise in machine learning and data science to develop innovative AI solutions that solve real-world problems. She is seeking to contribute to a dynamic AI team.",
            'aspirations': "She aspires to grow into a senior machine learning role, with a future focus on advanced topics like Generative AI and MLOps. She is also passionate about ethical AI and aims to promote responsible AI development.",
            'contact': "You can get in touch with Cynthia via the contact form on this website or connect with her on LinkedIn. You'll find the links in the footer."
        };

        const toggleChatWindow = () => {
            const isOpen = !chatbotWindow.classList.contains('hidden');
            
            if (isOpen) {
                chatbotWindow.classList.add('hidden');
                chatbotIcon.style.opacity = '1';
                chatbotIcon.style.transform = 'scale(1)';
            } else {
                chatbotWindow.classList.remove('hidden');
                chatbotIcon.style.opacity = '0';
                chatbotIcon.style.transform = 'scale(0)';
            }
        };
        
        // Initial state: hide the chatbot window and show the icon
        chatbotWindow.classList.add('hidden');
        chatbotIcon.style.opacity = '1';
        chatbotIcon.style.transform = 'scale(1)';

        const getBotResponse = (userInput) => {
            const lowerInput = userInput.toLowerCase();
            if (lowerInput.includes('hello') || lowerInput.includes('hi')) return knowledgeBase.greeting;
            if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('project')) return knowledgeBase.experience;
            if (lowerInput.includes('skill') || lowerInput.includes('technolog')) return knowledgeBase.skills;
            if (lowerInput.includes('objective') || lowerInput.includes('goal')) return knowledgeBase.objectives;
            if (lowerInput.includes('aspiration') || lowerInput.includes('future')) return knowledgeBase.aspirations;
            if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach out')) return knowledgeBase.contact;
            return knowledgeBase.default;
        };

        const appendMessage = (text, sender) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat-message', `${sender}-message`);
            messageDiv.innerHTML = `<p>${text}</p>`;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        const handleSendMessage = () => {
            const userInput = input.value.trim();
            if (userInput === '') return;

            appendMessage(userInput, 'user');
            input.value = '';

            setTimeout(() => {
                const botResponse = getBotResponse(userInput);
                appendMessage(botResponse, 'bot');
            }, 500);
        };
        
        chatbotIcon.addEventListener('click', toggleChatWindow);
        closeBtn.addEventListener('click', toggleChatWindow);
        sendBtn.addEventListener('click', handleSendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }

    // Initialize all scripts
    initializeHeroCanvas();
    revealOnScroll();
    initializeCursorGlow();
    initializeChatbot(); // Ensures the chatbot logic runs
});