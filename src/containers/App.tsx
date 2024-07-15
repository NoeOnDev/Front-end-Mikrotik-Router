import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../components/pages/LoginPage";
import { AddUsersPage } from "../components/pages/AddUsersPage";
import { ThemeProvider } from "../context/ThemeContext";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/add-users" element={<AddUsersPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
