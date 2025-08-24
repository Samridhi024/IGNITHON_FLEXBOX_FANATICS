# WellEd 🌱

*A student-focused platform for learning & well-being*

---

## 🚀 Overview

**WellEd** is a web platform designed to help students balance **education** and **mental health** focusing on two major **SDGs**: SDG 3- Good health and Well being and SDG 4- Quality Education.
It provides:

* 📊 A **Dashboard** with motivational content, recommended lessons, and quizzes.
* 🤖 A **Chatbot (Welly)** powered by **Google Gemini API**, offering stress relief tips, study hacks, and motivational support.

---

## 🛠️ Tech Stack

| Layer               | Technology                                                       |
| ------------------- | ---------------------------------------------------------------- |
| **Frontend**        | React.js, Bootstrap, CSS                                         |
| **Backend**         | FastAPI (Python), Google Generative AI (Gemini)                  |
| **APIs**            | Gemini API                                                       |
| **Deployment**      | Vercel/Netlify (Frontend)                                        |
| **Database**        | Firebase Firestore                                               |
| **Auth**            | Firebase Authentication                                          |
| **Version Control** | Git + GitHub                                                     |

---

## 🖼️ Features

### Dashboard

* ✨ Dynamic typing effect (motivational quotes)
* 📱 Responsive navigation with login/register
* 🎨 Hero section with illustration & content
* 💬 Integrated Welly chatbot widget
* ⭐ Reviews & Recommendations

### Chatbot

* Endpoint: `POST /ask`
* Input: `{ "message": "string" }`
* Output: `{ "response": "string" }`
* Empathetic, supportive responses for students

---

## 📂 Project Structure

```

  ├── src/
  │   ├── App.js           # Root app entry
  │   └── components/      # AuthForm, Quiz, StudyMeth, etc.
  |         ├── dashboard.js     # Dashboard UI
  │         ├── dashboard.css    # Styling
  │         ├── welly-react.js   # Chatbot UI component

```

---


### API Keys

* Gemini API Key → `GEMINI_API_KEY`
  ⚠️ Store keys in `.env` (not in code).

---

## 🚀 Deployment

* **Frontend** → Vercel / Netlify
* **Backend** → Render / Heroku
* Ensure backend URL (e.g., `https://welly-chatbot.onrender.com/ask`) is updated in `welly-react.js`.

---

## 📈 Future Enhancements

* 🔑 User authentication (JWT / OAuth)
* 🗄️ Database (PostgreSQL/MongoDB) for user progress
* 🎮 Gamified quizzes & learning modules
* 📊 Admin dashboard for monitoring chatbot usage

---

## 👨‍💻 Team

**Group Name:** FLEXBOX FANATICS
**Group Members:** Siddhi, Samridhi Sinha, Kajal Yadav

* Project Date: *24th August, 2025*
