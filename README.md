🏺 **Kalmozhi Decoder**

Ancient Tamil Inscription Translator & Analysis System

Kalmozhi Decoder is an web application that translates and analyzes ancient Tamil inscriptions from images into modern Tamil and English text. It combines OCR and generative AI to not only convert scripts but also provide meaningful interpretation.

---

📌 Overview

Ancient Tamil inscriptions are difficult to read and interpret due to their historical script variations.
Kalmozhi Decoder simplifies this process by allowing users to upload inscription images and receive:

* Modern Tamil translation
* Script interpretation
* Basic contextual understanding

---

🚀 Features

* 📸 Upload ancient inscription images
* 🔍 OCR-based text extraction
* ⚡ Fast and user-friendly interface

---

🧠 Key Capabilities

* Script decoding (ancient → modern)
* Text cleaning and reconstruction
* Context-aware interpretation 
* Supports image-based input

---

🛠 Tech Stack

Frontend

* React.js
* TypeScript
* Vite

Backend

* Python (Flask)

AI & Tools

* Google Gemini API
* Tesseract OCR

---

📂 Project Structure

```
kalmozhi-decoder/
│
├── backend/
│   ├── app.py
│   ├── predict_period.py
│   ├── train_period_model.py
│   ├── requirements.txt
│   └── uploads/
│
├── components/
├── services/
├── public/
├── src/
│
├── App.tsx
├── index.html
├── package.json
├── README.md
└── .gitignore
```

---

⚙️ Installation & Setup

1️⃣ Clone Repository

```bash
git clone https://github.com/dharansanjay/kalmozhi-decoder.git
cd kalmozhi-decoder
```
2️⃣ Frontend Setup

```bash
npm install
npm run dev
```
3️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```
4️⃣ Environment Variables

Create `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

---

📸 How It Works

1. User uploads an inscription image
2. OCR extracts raw text
3. System processes and converts script
4. System provides modern Tamil and English output + analysis

---

## 🌍 Future Improvements

* 📱 Mobile optimization
* 🎯 Higher OCR accuracy for damaged texts
* 📊 Advanced inscription analysis (period detection)
* 🌐 Multi-language translation

---

## 🧑‍💻 Author

DHARAN SANJAY M
B.Sc Data Science

GitHub: https://github.com/dharansanjay

---

⭐ Acknowledgements

* Google Gemini API
* Tesseract OCR
* Open-source community

---

📜 License

This project is licensed under the MIT License.
