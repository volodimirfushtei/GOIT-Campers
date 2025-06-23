# 🚌 GOIT Campers

GOIT Campers — це веб-застосунок для пошуку, перегляду та бронювання кемперів (будинків на колесах) по Україні. Ви можете фільтрувати транспорт за локацією, типом, обладнанням, трансмісією та типом двигуна.

## 🔗 Demo

[Live App on Vercel](https://goit-campers-ten.vercel.app)

## 🛠 Технології

- **Frontend**: React, Redux Toolkit, React Router, FontAwesome, CSS Modules, Vite
- **Backend**: Express, MongoDB, Mongoose, CORS
- **Deployment**: Vercel (frontend)

## 🚀 Функціонал

- 🔎 Пошук кемперів по містах України
- 🧰 Фільтрація за обладнанням, типом двигуна, трансмісією
- 🧭 Підключення до бази даних MongoDB
- 🗺 Інтерактивна мапа з локаціями кемперів
- 💬 Форма контактів
- ⚙️ Адмін-панель (у розробці)

## 📁 Структура проєкту

src/
├── assets/
├── components/
├── pages/
├── redux/
│ ├── Vans/
│ ├── filters/
│ └── store.js
├── data/
├── constants/
└── App.jsx
