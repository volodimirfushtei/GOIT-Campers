import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Імпортуємо BrowserRouter
import "./App.css";
import Layout from "./components/Layout/Layout"; // Використовуємо відносний шлях
import Home from "./pages/Home/Home"; // Використовуємо відносний шлях
import Catalog from "./pages/Catalog/Catalog"; // Використовуємо відносний шлях
import Details from "./pages/Details/Details"; // Використовуємо відносний шлях
import { Suspense } from "react";
function App() {
  return (
    <Router>
      {" "}
      {/* Обгортаємо в Router */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="details" element={<Details />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
