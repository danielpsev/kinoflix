import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./style/main.css";
import "./style/reset.css";
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import Footer from "./components/Footer/Footer";

import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import AdmEditFilm from "./pages/Admin/AdmEditFilm";
import FilmPage from "./pages/Film/FilmPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, RequireAuth, RequireAdmin } from "./context/Auth";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Main />} />
            <Route path="/film/:filmid" element={<FilmPage />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <Admin />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/film/edit/:filmid"
              element={
                <RequireAdmin>
                  <AdmEditFilm />
                </RequireAdmin>
              }
            />

            <Route
              path="/profile/"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Routes>
          <Footer />
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AuthProvider>
    </div>
  );
}

export default App;
