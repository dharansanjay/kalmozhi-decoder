
# Ancient Tamil Manuscript Converter

[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini-blue.svg)](https://ai.google.dev/)

An AI-powered web application that converts ancient Tamil Brahmi script from images into modern, readable Tamil text. This tool leverages the multimodal capabilities of Google's Gemini model to perform Optical Character Recognition (OCR) and script conversion.

![App Screenshot](https://github.com/Balaji1304/Ancient-Tamil-Manuscript-Translator/blob/main/old-tamil-script-converter.png)

---

## ✨ Features

- **Secure API Key Handling**: Prompts for an API key if not provided, storing it only for the current session.
- **Intuitive Image Upload**: Supports both drag-and-drop and traditional file selection.
- **Instant Image Preview**: See the uploaded image directly in the interface before conversion.
- **AI-Powered Conversion**: Utilizes the Google Gemini API for accurate OCR and script transformation.
- **Side-by-Side View**: Compare the original image with the generated modern Tamil text.
- **Copy to Clipboard**: Easily copy the converted text with a single click.
- **Responsive Design**: Fully functional on both desktop and mobile devices.
- **Clear User Feedback**: Displays loading states during processing and handles potential errors gracefully.

---

## 🛠️ Technology Stack

- **Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Model**: [Google Gemini API (`gemini-2.5-flash`)](https://ai.google.dev/) via `@google/genai` SDK
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Bundling/Imports**: ES Modules with Import Maps (no build step required)

---

## 🚀 How It Works

The application follows a simple yet powerful workflow:

1.  **API Key Setup**: The app first checks for a Gemini API key. If not found, it prompts the user to enter one.
2.  **Image Upload**: The user selects an image containing Old Tamil script.
3.  **Client-Side Processing**: The browser converts the image file into a Base64-encoded string.
4.  **API Request**: The Base64 image data and the user-provided API key are sent to the Google Gemini API.
5.  **Gemini's Magic**: The `gemini-2.5-flash` model processes the request:
    - It performs OCR on the image to recognize the Brahmi-derived characters.
    - Guided by the prompt, it acts as a Tamil linguistics expert to convert the recognized characters into their Modern Tamil Unicode equivalents.
    - It preserves the original word spacing and layout.
6.  **Display Result**: The API returns the converted text, which is then displayed in the UI for the user to read and copy.

---

## ⚙️ Getting Started

To run this project, you'll need a Google Gemini API key.

### Prerequisites

- A modern web browser.
- A **Google Gemini API key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/old-tamil-converter.git
    cd old-tamil-converter
    ```

2.  **Run a local web server:**
    Since this project uses ES modules, you need to serve the files from a local server.
    ```bash
    # If you have Python 3
    python -m http.server
    ```
    Or use a simple Node.js package:
    ```bash
    # Install with: npm install -g serve
    serve .
    ```

3.  **Open and Configure:**
    - Navigate to `http://localhost:8000` (or the URL provided by your server) in your browser.
    - The app will prompt you to enter your Gemini API key. This key is stored in your browser's memory and is gone when you close the tab.

### Local Development (Optional)

For a quicker local development workflow, you can create an `env.js` file to avoid entering the key on every page load.

1.  Create a new file named `env.js` in the project's root directory.

    **⚠️ Important**: This file is listed in `.gitignore` and **must not** be committed to version control.

2.  Add the following content to `env.js`, replacing the placeholder with your actual key:
    ```javascript
    // env.js
    window.process = {
      env: {
        API_KEY: 'YOUR_GEMINI_API_KEY_HERE'
      }
    };
    ```
    The app will automatically detect and use this key when you run it locally.

---

## 📂 Project Structure
```
/
├── components/
│   ├── ApiKeySetup.tsx      # Securely prompts for API key
│   ├── Header.tsx           # Page header component
│   ├── Icons.tsx            # SVG icon components
│   ├── ImageUploader.tsx    # Handles image selection and preview
│   ├── Loader.tsx           # Loading spinner component
│   └── ResultDisplay.tsx    # Displays the converted text or status
│
├── services/
│   └── geminiService.ts     # Logic for interacting with the Gemini API
│
├── .gitignore               # Ensures sensitive files are not committed
├── App.tsx                  # Main application component, manages state
├── env.js                   # Local environment variables (DO NOT COMMIT)
├── index.html               # HTML entry point
├── index.tsx                # React application root
├── metadata.json            # Application metadata
└── README.md                # Project documentation
```
