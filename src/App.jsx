import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const TeachersPage = lazy(() => import("./pages/TeachersPage/TeachersPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default App;
