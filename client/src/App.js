// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './style/main.css';
import './style/reset.css';
import Header from './components/Header/Header.js';
import Main from './pages/Main/Main.js';
import Footer from './components/Footer/Footer.js';

import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';
import FilmPage from './pages/Film/FilmPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, RequireAuth, RequireAdmin } from './context/Auth';
import { Navigate } from 'react-router-dom';
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
              <Route path="/Admin" element={<RequireAdmin><Admin/></RequireAdmin>} />

              <Route path="/profile/" element={<RequireAuth><Profile/></RequireAuth>} />
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
