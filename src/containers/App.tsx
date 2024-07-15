import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../components/pages/LoginPage";
import { AddUsersPage } from "../components/pages/AddUsersPage";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/add-users" element={<AddUsersPage />} />
      </Routes>
    </BrowserRouter>
  );
};
