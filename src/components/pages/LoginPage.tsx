import React from "react";
import styles from "../../css/loginStyles.module.css";
import logo from "../../assets/MikroTik-Logo.png";

export const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src={logo} alt="MikroTik" />
        </div>
        <p>
          Bienvenido al portal de acceso del enrutador MikroTik. Por favor,
          ingrese sus credenciales para administrar el dispositivo. Si no posee
          las credenciales o el dispositivo no le pertenece, contacte a su
          administrador de red.
        </p>
        <form className={styles.formLogin}>
          <label>
            Conectar a (IP/DNS):
            <input type="text" name="connect" className={styles.inputField} />
          </label>
          <label>
            Acceso (Nombre):
            <input type="text" name="login" className={styles.inputField} />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              className={styles.inputField}
            />
          </label>
          <button type="submit" className={styles.loginButton}>
            Login
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
