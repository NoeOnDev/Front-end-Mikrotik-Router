// src/components/pages/LoginPage.tsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/LoginStyles.module.css";
import logoNegro from "../../assets/logo-black.svg";
import logoBlanco from "../../assets/logo-white.svg";
import {
  FaNetworkWired,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { ThemeToggleButton } from "../utils/ThemeToggleButton";
import { ThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import useLogin from "../hooks/useLogin";

export const LoginPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const { login, loading } = useLogin(isDarkMode);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await login(ip, username, password);
    if (response && response.status === "OK") {
      authLogin(response.token ?? "valorPorDefecto", 3600);
      navigate("/add-users");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.themeToggleButton}>
        <ThemeToggleButton onClick={toggleTheme} isDarkMode={isDarkMode} />
      </div>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <a href="https://mikrotik.com/">
            <img src={isDarkMode ? logoNegro : logoBlanco} alt="MikroTik" />
          </a>
        </div>
        <p>
          Bienvenido al portal de acceso del enrutador MikroTik. Por favor,
          ingrese sus credenciales para administrar el dispositivo. Si no posee
          las credenciales o el dispositivo no le pertenece, contacte a su
          administrador de red.
        </p>
        <form className={styles.formLogin} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <FaNetworkWired className={styles.inputIcon} />
            <input
              required
              type="text"
              name="connect"
              className={styles.inputField}
              placeholder="Conectar a (IP/DNS)"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <FaUser className={styles.inputIcon} />
            <input
              required
              type="text"
              name="login"
              className={styles.inputField}
              placeholder="Acceso (Nombre)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <FaLock className={styles.inputIcon} />
            <input
              required
              type={passwordVisible ? "text" : "password"}
              name="password"
              className={styles.inputField}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Conectando..." : "Conectar"}
          </button>
        </form>
        <div className={styles.links}>
          <a href="https://mt.lv/winbox64">Winbox</a>
          <a href="#">Graphs</a>
          <a href="http://www.realco.com.tw/help/license.html">License</a>
          <a href="https://help.mikrotik.com/docs/">Help</a>
        </div>
      </div>
    </div>
  );
};
