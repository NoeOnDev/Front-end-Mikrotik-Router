import React from "react";
import styles from "../../css/ThemeToggleButton.module.css";

interface ThemeToggleButtonProps {
  onClick: () => void;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  onClick,
}) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onClick={onClick} />{" "}
      <span className={styles.slider}></span>
    </label>
  );
};
