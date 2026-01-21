import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

/* Auth */
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyEmail from "./components/VerifyEmail";

/* Chat */
import Chats from "./pages/Chats";
import Chat from "./pages/Chat";

/* My Buys */
import MyBuys from "./pages/MyBuys";
import BoughtProducts from "./pages/BoughtProducts";
import RentedProducts from "./pages/RentedProducts";

import Wishlist from "./pages/Wishlist";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />

          {/* Chats */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* My Buys */}
          <Route
            path="/my-buys"
            element={
              <ProtectedRoute>
                <MyBuys />
              </ProtectedRoute>
            }
          />
          <Route
          path="/wishlist"
          element={
          <ProtectedRoute>
            <Wishlist />
            </ProtectedRoute>
          }
          />

          <Route
            path="/my-buys/bought"
            element={
              <ProtectedRoute>
                <BoughtProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-buys/rented"
            element={
              <ProtectedRoute>
                <RentedProducts />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
