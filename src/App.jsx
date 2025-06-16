import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import { Toaster } from "react-hot-toast";
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog.jsx"));
const Details = lazy(() => import("./pages/Details/Details.jsx"));
const FavoritesPage = lazy(() =>
  import("./pages/FavoritesPage/FavoritesPage.jsx")
);
const VansFeatures = lazy(() =>
  import("./components/VansFeatures/VansFeatures")
);
const VansReviews = lazy(() =>
  import("./components/VansReviews/VansReviews.jsx")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
import { selectIsLoading } from "./redux/Vans/selectors.js";
import "./App.css";

function App() {
  const IsLoading = useSelector(selectIsLoading);
  return (
    <>
      {IsLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      )}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="catalog/:camperId" element={<Details />}>
              <Route path="features" element={<VansFeatures />} />
              <Route path="reviews" element={<VansReviews />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
              fontSize: "16px",
              padding: "16px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            },
            success: {
              style: {
                background: "#4CAF50",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#f44336",
                color: "#fff",
              },
            },
            loading: {
              style: {
                background: "#2196F3",
                color: "#fff",
              },
            },
            complete: {
              style: {
                background: "#4CAF50",
                color: "#fff",
              },
            },
          }}
        />
      </Suspense>
    </>
  );
}

export default App;
