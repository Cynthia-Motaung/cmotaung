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

        const knowledgeBase = {
            'default': "I'm sorry, I don't have an answer for that. You can ask me about my skills, projects, career goals, or experience to get to know me better!",
            // Updated greeting to be more conversational and inviting
            'greeting': "Hi there! I'm Cynthia, a software developer. What can I tell you about my skills and experience?",
            'background': "I'm a full-stack developer with a strong foundation in C#, ASP.NET Core, and SQL Server. I am actively expanding my skills in AI and machine learning with Python, Pandas, and TensorFlow.",
            'techStack': "My tech stack includes:\n\n" +
                        "**Backend:** C#, ASP.NET Core, Entity Framework Core\n" +
                        "**Frontend:** HTML, CSS, JavaScript, React (basic)\n" +
                        "**Databases:** SQL Server, PostgreSQL\n" +
                        "**AI/ML:** Python, Pandas, TensorFlow, OpenAI APIs\n" +
                        "**Tools:** Git & GitHub, Azure DevOps, Visual Studio",
            'personality': "I'm a naturally curious, focused, and methodical problem-solver. I'm driven by a sense of purpose and a commitment to lifelong learning, which I see as essential for growth.",
            'academicGoals': "I am passionate about continuous education and plan to pursue a Master’s or PhD to bridge the gap between software development, AI, and education. My long-term goal is to combine technical expertise with a strong teaching and mentoring role.",
            'projectsAndGoals': "I am currently focused on mastering full-stack ASP.NET Core and integrating AI into my applications. My projects demonstrate my ability to combine productivity, personal growth, and intelligent automation.",
            'educationalBackground': "I hold a Diploma in Software Development, which provided me with a strong foundation in object-oriented programming and web development principles. I also continue to learn through real-world projects and courses.",
            'teachingPhilosophy': "I believe in a 'Learn One, Do One, Practice One, Teach One, Create & Innovate One' philosophy. This cycle ensures deep understanding and fosters continuous growth and innovation.",
            'softSkills': "My soft skills are a key part of how I work. I excel at clear communication, teamwork, and taking initiative. I'm highly adaptable and organized, with a strong attention to detail that ensures high-quality solutions.",
            'hobbies': "Outside of my work, I enjoy hiking, reading, and running. These hobbies help me stay balanced, creative, and disciplined.",
            'firstEncounterWithAI': "I initially feared AI might replace developers, but I've come to see it as a powerful tool. I'm focused on learning how to responsibly integrate AI and build the infrastructure around it, seeing it as a way to expand our capabilities.",
            'debuggingMindset': "I approach challenges with a 'failing forward' mindset. I see every bug as an opportunity to learn, which builds my confidence and capability as a developer.",
            'howIGotIntoTech': "I started my journey in tech with an interest in cybersecurity. However, I found my true passion in software engineering—building systems rather than just testing them. This shift drives my work today.",
            'whyILoveCoding': "I love software development because it offers endless potential and a path of lifelong learning. The ability to solve real-world problems with creativity and logic is what keeps me engaged.",
            'careerObjective': "Yes, I am actively seeking a Junior Developer position or internship. I am looking for a role that aligns with my current tech stack (C#, ASP.NET Core, Python) and offers opportunities for mentorship and growth.",
            'contact': "You can get in touch with me via the contact form on this website or connect with me on LinkedIn."
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
    if (lowerInput.includes('yourself') || lowerInput.includes('about you') || lowerInput.includes('who are you')) return knowledgeBase.background;
    if (lowerInput.includes('stack') || lowerInput.includes('tech') || lowerInput.includes('technologies') || lowerInput.includes('skills') || lowerInput.includes('languages') || lowerInput.includes('frameworks')) return knowledgeBase.techStack;
    if (lowerInput.includes('projects') || lowerInput.includes('work') || lowerInput.includes('demonstrate') || lowerInput.includes('built') || lowerInput.includes('portfolio')) return knowledgeBase.projectsAndGoals;
    if (lowerInput.includes('looking for') || lowerInput.includes('career') || lowerInput.includes('role') || lowerInput.includes('position') || lowerInput.includes('hire') || lowerInput.includes('opportunities') || lowerInput.includes('vacancy')) return knowledgeBase.careerObjective;
    if (lowerInput.includes('soft skills') || lowerInput.includes('communication') || lowerInput.includes('teamwork') || lowerInput.includes('team')) return knowledgeBase.softSkills;
    if (lowerInput.includes('education') || lowerInput.includes('diploma') || lowerInput.includes('background')) return knowledgeBase.educationalBackground;
    if (lowerInput.includes('goals') || lowerInput.includes('academic') || lowerInput.includes('teach')) return knowledgeBase.academicGoals;
    if (lowerInput.includes('how i got into tech') || lowerInput.includes('story') || lowerInput.includes('journey')) return knowledgeBase.howIGotIntoTech;
    if (lowerInput.includes('why coding') || lowerInput.includes('love development') || lowerInput.includes('passionate')) return knowledgeBase.whyILoveCoding;
    if (lowerInput.includes('debugging') || lowerInput.includes('motivated') || lowerInput.includes('challenges')) return knowledgeBase.debuggingMindset;
    if (lowerInput.includes('ai') || lowerInput.includes('artificial intelligence')) return knowledgeBase.firstEncounterWithAI;
    if (lowerInput.includes('hobbies') || lowerInput.includes('outside coding') || lowerInput.includes('passions')) return knowledgeBase.hobbies;
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach out')) return knowledgeBase.contact;
    return knowledgeBase.default;
};

        const appendMessage = (text, sender) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat-message', `${sender}-message`);
            messageDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
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