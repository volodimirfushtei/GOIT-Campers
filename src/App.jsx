import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout.jsx";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog.jsx"));
const Details = lazy(() => import("./pages/Details/Details.jsx"));
const VansFeatures = lazy(() =>
  import("./components/VansFeatures/VansFeatures")
);
const VansReviews = lazy(() =>
  import("./components/VansReviews/VansReviews.jsx")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

import "./App.css";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="catalog/:camperId" element={<Details />}>
              <Route path="features" element={<VansFeatures />} />
              <Route path="reviews" element={<VansReviews />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
