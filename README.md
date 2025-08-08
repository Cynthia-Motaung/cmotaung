# Interactive Developer Portfolio

This repository contains the source code for a modern, interactive developer portfolio. It is a single-page application designed to showcase professional experience, projects, and skills through a sleek user interface and dynamic animations.

**Live Demo:** [https://your-portfolio-link.vercel.app/](https://your-portfolio-link.vercel.app/)

![Portfolio Screenshot](./assets/images/screenshot.png)
*(To add a screenshot, capture an image of the final portfolio, name it `screenshot.png`, and place it in the `/assets/images/` folder.)*

---

## ✨ Features

* **Modern User Interface**: A professional, dark-themed design with a clean and organized layout.
* **Interactive Hero Section**: Features an animated 3D object rendered with **Three.js**.
* **Dynamic Animations**: Subtle "reveal on scroll" animations for all content sections to enhance user engagement.
* **Timeline Resume**: An elegant timeline format to display professional experience and education chronologically.
* **Visual Skills Section**: Displays technical skills with official logos for quick recognition.
* **Project Showcase**: A grid layout for projects, complete with technology tags and links to live demos and source code.
* **Functional Contact Form**: Integrated with **Formspree** for reliable email forwarding without a backend.
* **Custom Chatbot**: A rule-based chatbot, built with JavaScript, capable of answering questions about the owner's professional background.
* **Fully Responsive**: Optimized for a seamless experience on all devices, from mobile phones to desktops.

---

## 🛠️ Tech Stack

This project is built with modern web technologies and services, requiring no backend infrastructure.

* **HTML5**
* **CSS3**
* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
* **JavaScript (ES6+)**: Powers all interactivity, animations, and the chatbot logic.
* **Three.js**: A 3D graphics library for the hero section animation.
* **Font Awesome**: For high-quality icons.
* **Formspree**: For contact form functionality.
* **Vercel**: For deployment and hosting.

---

## 🚀 Getting Started

To get a local copy up and running, follow the steps below.

### Prerequisites

A modern web browser is required. A code editor such as [VS Code](https://code.visualstudio.com/) is recommended for customization.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd your-repo-name
    ```
3.  **Open `index.html` in your browser.**
    * For the best local development experience, it is recommended to use a simple local server. The [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code is an excellent option.

---

## 🎨 Customization

This portfolio is designed to be easily personalized. To use this project as a template, follow this guide to modify the content.

### 1. Connecting the Contact Form (Formspree)

To receive messages from the contact form, it must be connected to a Formspree endpoint.

1.  Create a free account at [Formspree.io](https://formspree.io/).
2.  Create a "New Form" to receive a unique endpoint URL.
3.  Open **`index.html`** and locate the `<form>` tag within `<section id="contact">`.
4.  Replace the placeholder `action` URL with your unique Formspree endpoint URL.

    ```html
    <form class="space-y-6" ... action="[https://formspree.io/f/YOUR_UNIQUE_ID](https://formspree.io/f/YOUR_UNIQUE_ID)" method="POST">
    ```

### 2. Text Content (Bio, Experience, Projects)

All professional information, such as the biography, resume details, and project descriptions, is located directly in **`index.html`**. Edit the text within the relevant sections to update the content.

### 3. Images and Resume PDF

All static assets are located in the `/assets/` directory.

* **Profile Photo**: Replace `profile-photo.jpg` in `/assets/images/`.
* **Project Images**: Replace `project-1.jpg`, `project-2.jpg`, etc., in `/assets/images/`.
* **Resume PDF**: Place your resume file in the `/assets/` directory and ensure the link in the "Download Full Resume" button points to the correct filename.

### 4. Skills Section

The skills section is located in **`index.html`**. Each skill is a `<div>` block that can be added, removed, or modified.

* Logos are sourced from [Simple Icons](https://simpleicons.org/). To add or change a logo, construct a new URL using the format: `https://cdn.simpleicons.org/BRANDNAME/HEXCOLOR`.

### 5. Chatbot Knowledge Base

The chatbot's responses are controlled by the `knowledgeBase` object in **`main.js`**.

* Locate the `initializeChatbot` function.
* Modify the string values within the `knowledgeBase` object to update the chatbot's knowledge with your professional details.

    ```javascript
    const knowledgeBase = {
        'default': "I am unable to answer that question at this time. Please ask about skills or experience.",
        'greeting': "Hello. How can I provide information about [Your Name]?",
        'experience': "[Your detailed experience summary here...]",
        'skills': "[Your skills summary here...]",
        // ... etc.
    };
    ```

---

## ☁️ Deployment

This static site is optimized for deployment on platforms like **Vercel**.

1.  **Push your finalized code to a GitHub repository.**
2.  **Sign up for a free account at [Vercel](https://vercel.com/).**
3.  From the Vercel dashboard, select **"Add New... > Project"**.
4.  **Import your GitHub repository.**
5.  Vercel will automatically detect the project as a static site. No build configuration is necessary.
6.  Click **"Deploy"**. Your website will be live at a Vercel-provided URL.
