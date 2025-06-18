# CRM Dashboard (Next.js + Express + MongoDB)

🔥 Сучасна CRM система для управління компаніями, акціями, категоріями та статистикою. Підтримує адмін-панель, REST API та інтеграцію з базою даних MongoDB.

## ⚙️ Технології

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS
- **Backend**: Express.js + MongoDB
- **База даних**: MongoDB Atlas / local MongoDB
- **API**: RESTful (Node.js + Express)
- **Стейт**: Zustand / Redux Toolkit
- **Форми**: Formik + Yup
- **Клієнтський HTTP**: `fetch` / React Query
- **Карта**: React Leaflet
- **Адмін-панель**: `/admin` маршрути

---

## 🧱 Структура проєкту

crm/
├── app/ # Next.js App Router
│ ├── (admin)/ # Admin-панель
│ │ ├── dashboard/
│ │ └── companies/
│ ├── components/ # UI-компоненти
│ ├── lib/ # API-клієнт, утиліти
│ └── styles/
├── backend/ # Express-сервер
│ ├── models/ # Mongoose схеми
│ ├── routes/ # API маршрути
│ └── server.js # Точка входу
├── public/
├── .env.local # ENV-змінні
├── README.md
└── package.json
