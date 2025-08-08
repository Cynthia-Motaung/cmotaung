# Interactive Developer Portfolio Website

A sleek, modern, and fully responsive single-page portfolio designed to showcase professional experience, projects, and skills. This portfolio is packed with animations and interactive elements, including a custom chatbot, to create a memorable user experience.

**Live Demo:** (https://cmotaung.vercel.app/)

![Portfolio Screenshot](./assets/images/screenshot.png)
*(To add a screenshot, take a picture of your finished portfolio, name it `screenshot.png`, and place it in the `/assets/images/` folder.)*

---

## ✨ Features

* **Sleek User Interface**: Modern, dark-themed design with a clean and professional layout.
* **Interactive Hero Section**: Features an animated 3D object using **Three.js**.
* **Dynamic Animations**: Subtle "reveal on scroll" animations for all content sections.
* **Timeline Resume**: An elegant timeline format to display professional experience and education.
* **Visual Skills Section**: Displays technical skills with official logos for instant recognition.
* **Project Showcase**: A grid layout for projects, complete with tech tags and links.
* **Functional Contact Form**: Integrated with **Formspree** for easy and reliable email forwarding.
* **Custom Chatbot**: A rule-based chatbot that can answer questions about your professional background.
* **Fully Responsive**: Looks great on all devices, from mobile phones to desktops.

---

## 🛠️ Technologies Used

This project is built with modern web technologies and services.

* **HTML5**
* **CSS3**
* **Tailwind CSS**: For utility-first styling.
* **JavaScript (ES6+)**: For all interactivity, animations, and chatbot logic.
* **Three.js**: For the 3D animation in the hero section.
* **Font Awesome**: For icons used throughout the site.
* **Formspree**: For contact form functionality.
* **Vercel**: For deployment.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You just need a modern web browser. A code editor like [VS Code](https://code.visualstudio.com/) is recommended for making customizations.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone (https://github.com/Cynthia-Motaung/cmotaung.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd your-repo-name
    ```
3.  **Open the `index.html` file in your browser.**
    * For the best experience, it's recommended to use a simple local server. The [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code is a great option for this.

---

## 🎨 Customization Guide

This portfolio is designed to be easily personalized. All content is located in the `index.html` and `main.js` files.

### 1. Connecting the Contact Form (Formspree)

First, let's get your contact form working.

1.  Go to [Formspree.io](https://formspree.io/) and create a free account.
2.  Create a "New Form" and give it a name (e.g., "Portfolio Contact").
3.  You will be given a unique endpoint URL that looks something like `https://formspree.io/f/your_unique_id`.
4.  Open **`index.html`** and find the `<form>` tag inside `<section id="contact">`.
5.  Replace the placeholder `action` URL with your unique Formspree URL.

    ```html
    <form class="space-y-6" ... action="[https://formspree.io/f/your_form_id](https://formspree.io/f/your_form_id)" ...>

    <form class="space-y-6" ... action="[https://formspree.io/f/YOUR_UNIQUE_ID](https://formspree.io/f/YOUR_UNIQUE_ID)" ...>
    ```

### 2. Text Content (Bio, Experience, Projects)

* Open **`index.html`**.
* Find the relevant section (e.g., `<section id="about">`).
* Edit the text directly in the HTML.

### 3. Images and Resume

* **Profile Photo**: Replace `profile-photo.jpg` in the `/assets/images/` folder with your own photo.
* **Project Images**: Replace `project-1.jpg`, `project-2.jpg`, etc., in the `/assets/images/` folder.
* **Resume PDF**: Place your resume file (e.g., `Cynthia-M-Resume.pdf`) in the `/assets/` folder and make sure the link in the "Download Full Resume" button in `index.html` points to the correct filename.

### 4. Skills Section

* Open **`index.html`** and navigate to `<section id="skills">`.
* Each skill is a `<div>` block. You can add, remove, or edit these blocks.
* To change a logo, find a new one from [Simple Icons](https://simpleicons.org/). Click on an icon, and copy its brand name and hex color to construct the URL like this: `https://cdn.simpleicons.org/BRANDNAME/HEXCOLOR`.

### 5. Chatbot Knowledge Base

* Open **`main.js`**.
* Find the `initializeChatbot` function.
* Inside, you will see a `knowledgeBase` object. Edit the string values to match your own professional details.

    ```javascript
    const knowledgeBase = {
        'default': "I can't answer that. Ask me about experience or skills.",
        'greeting': "Hello! How can I help you learn more about [Your Name]?",
        'experience': "[Your detailed experience summary here...]",
        'skills': "[Your skills summary here...]",
        // ... and so on
    };
    ```

---

## ☁️ Deployment with Vercel

This static site can be deployed for free using Vercel.

1.  **Push your final code to a GitHub repository.**
2.  **Sign up for a free account at [Vercel](https://vercel.com/).**
3.  From your Vercel dashboard, click **"Add New... > Project"**.
4.  **Import your GitHub repository.**
5.  Vercel will automatically detect that it's a static site (it will show "Framework Preset: Other"). You don't need to change any settings.
6.  Click **"Deploy"**.
7.  Your site will be live at a Vercel-provided URL in under a minute!

---