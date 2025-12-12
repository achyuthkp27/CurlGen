# cURL Studio

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0_Alpha-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

**cURL Studio** is a premium, powerful, and intelligent web-based tool designed to simplify the process of building, testing, and debugging API requests. With a sleek, dark-themed UI and real-time cURL command generation, it streamlines your workflow and helps you craft complex requests with ease.

## ✨ Features

- **🚀 Intuitive Request Builder**:  Build requests visually with an easy-to-use interface. Support for GET, POST, PUT, DELETE, PATCH, and more.
- **🛠️ Dynamic Body Support**:
    - **JSON**: Smart editor with prettify and validation.
    - **Form Data**: Key-value editor for multipart/form-data.
    - **x-www-form-urlencoded**: Simple editor for url-encoded data.
    - **Binary**: File path references for binary uploads.
- **⚡ Real-time cURL Generation**: See the equivalent cURL command update instantly as you build your request.
- **🔐 Authentication**: Configuration for various auth methods (Bearer Token, Basic Auth, etc.).
- **🎨 Premium UI/UX**:
    - **Glassmorphism Design**: Modern, translucent aesthetics.
    - **Animations**: Smooth transitions and micro-interactions powered by CSS and Javascript.
    - **Responsive**: Fully optimized for different screen sizes.
- **⚙️ Advanced Configuration**: Fine-tune headers, potential timeouts, and other request specifics.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS (with modern variables and animations), Lucide React (Icons)
- **Syntax Highlighting**: PrismJS
- **Linting**: ESLint

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/curl-studio.git
    cd curl-studio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

You can preview the production build using:

```bash
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by the cURL Studio Team
</p>
