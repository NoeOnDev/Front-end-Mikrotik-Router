import React, { useState, useEffect } from "react";
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

export const LoginPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" ? true : false;
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "light" : "dark");
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, [isDarkMode]);

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
        <form className={styles.formLogin}>
          <div className={styles.inputContainer}>
            <FaNetworkWired className={styles.inputIcon} />
            <input
              type="text"
              name="connect"
              className={styles.inputField}
              placeholder="Conectar a (IP/DNS)"
            />
          </div>
          <div className={styles.inputContainer}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              name="login"
              className={styles.inputField}
              placeholder="Acceso (Nombre)"
            />
          </div>
          <div className={styles.inputContainer}>
            <FaLock className={styles.inputIcon} />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className={styles.inputField}
              placeholder="Contraseña"
            />
            <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button type="submit" className={styles.loginButton}>
            Conectar
          </button>
        </form>
        <div className={styles.links}>
          <a href="#">Winbox</a>
          <a href="#">Graphs</a>
          <a href="#">License</a>
          <a href="https://help.mikrotik.com/docs/">Help</a>
        </div>
      </div>
    </div>
  );
};
