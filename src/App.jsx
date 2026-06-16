import styles from "./App.module.css";
import { Routes, Route } from "react-router";
import Header from "./shared/Header";
import RequireAuth from "./components/RequireAuth.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import TodosPage from "./pages/TodosPage";
import Footer from "./shared/Footer.jsx";

export default function App() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContentWrapper}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/todos" element={<TodosPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
