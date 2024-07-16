import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../components/pages/LoginPage";
import { AddUsersPage } from "../components/pages/AddUsersPage";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/utils/ProtectedRoute";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/add-users" element={<AddUsersPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};
