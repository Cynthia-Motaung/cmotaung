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
            console.warn('Chatbot elements not found. Chatbot initialization skipped.');
            return;
        }

        // --- NEW CODE: Add this function ---
        function toggleChatWindow() {
            const isHidden = chatbotWindow.classList.contains('hidden');
            chatbotWindow.classList.toggle('hidden');
            chatbotIcon.classList.toggle('hidden', !isHidden);
            
            if (isHidden) {
                input.focus();
            }
        }
        // ------------------------------------

        const knowledgeBase = {
            'default': {
                responses: [
                    "I'm sorry, I don't have an answer for that. You can ask me about my skills, projects, career goals, or experience to get to know me better!",
                    "That's a bit outside my current knowledge base. Try asking about my tech stack or projects.",
                    "Hmm, I'm not sure how to answer that. What else can I tell you?"
                ]
            },
            'greeting': {
                responses: [
                    "Hi there! I'm Cynthia, a software developer. What can I tell you about my skills and experience?"
                ]
            },
            'background': {
                responses: [
                    "I'm a full-stack developer with a strong foundation in C#, ASP.NET Core, and SQL Server. I am actively expanding my skills in AI and machine learning with Python, Pandas, and TensorFlow."
                ]
            },
            'techStack': {
                responses: [
                    "My tech stack includes:\n- **Languages**: C#, Python, SQL, JavaScript, HTML, CSS\n- **Frameworks/Libraries**: ASP.NET Core, React, Tailwind CSS, Pandas, TensorFlow\n- **Databases**: SQL Server, SQLite\n- **Tools**: Git, Docker"
                ]
            },
            'projects': {
                responses: [
                    "I have worked on several projects, including a full-stack e-commerce application, a sentiment analysis tool, and an educational chatbot. You can find more details in my portfolio."
                ]
            },
            'skills': {
                responses: [
                    "My core skills are in backend development with C# and ASP.NET Core, but I'm also proficient in Python for data analysis and AI. I have experience with SQL databases and modern front-end frameworks like React."
                ]
            },
            'contact': {
                responses: [
                    "You can get in touch with me through the contact form on this page or by connecting with me on LinkedIn."
                ]
            },
        };

        function getBotResponse(userInput) {
            const lowerCaseInput = userInput.toLowerCase();
            const greetings = ['hi', 'hello', 'hey', 'greetings', 'what\'s up'];
            const techTerms = ['tech', 'stack', 'technologies', 'languages', 'frameworks'];
            const projectTerms = ['project', 'work', 'portfolio', 'built'];
            const skillTerms = ['skill', 'skills', 'expertise', 'proficient'];
            const contactTerms = ['contact', 'email', 'get in touch', 'connect'];

            for (const term of greetings) {
                if (lowerCaseInput.includes(term)) return knowledgeBase.greeting;
            }
            for (const term of techTerms) {
                if (lowerCaseInput.includes(term)) return knowledgeBase.techStack;
            }
            for (const term of projectTerms) {
                if (lowerCaseInput.includes(term)) return knowledgeBase.projects;
            }
            for (const term of skillTerms) {
                if (lowerCaseInput.includes(term)) return knowledgeBase.skills;
            }
            for (const term of contactTerms) {
                if (lowerCaseInput.includes(term)) return knowledgeBase.contact;
            }

            return knowledgeBase.default;
        }

        function appendMessage(text, sender) {
            const messageElement = document.createElement('div');
            messageElement.className = `chat-message ${sender}-message`;

            const avatarElement = document.createElement('div');
            avatarElement.className = `${sender}-avatar-container`;

            const avatarImage = document.createElement('img');
            avatarImage.className = `${sender}-avatar`;

            if (sender === 'user') {
                avatarImage.src = 'data:image/jpeg;base64,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'; // CHANGE THIS TO YOUR IMAGE
                avatarImage.alt = 'User avatar';
            } else {
                avatarImage.src = './assets/Media.jpg'; // CHANGE THIS TO YOUR BOT IMAGE
            }

            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.innerHTML = `<p>${text}</p>`;

            messageElement.appendChild(avatarElement);
            avatarElement.appendChild(avatarImage);
            messageElement.appendChild(messageContent);
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        const handleSendMessage = () => {
            const userInput = input.value.trim();
            if (userInput === '') return;

            appendMessage(userInput, 'user');
            input.value = '';

            const typingIndicator = document.createElement('div');
            typingIndicator.id = 'typing-indicator';
            typingIndicator.className = 'chat-message bot-message';
            typingIndicator.innerHTML = `
                <div class="typing">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            messagesContainer.appendChild(typingIndicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            setTimeout(() => {
                const botResponse = getBotResponse(userInput);
                const randomResponse = botResponse.responses[
                    Math.floor(Math.random() * botResponse.responses.length)
                ];
                
                messagesContainer.removeChild(typingIndicator);
                appendMessage(randomResponse, 'bot');
                
            }, 1000);
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
    initializeChatbot();
});