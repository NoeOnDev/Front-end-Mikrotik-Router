import React from "react";
import styles from "../../css/ThemeToggleButton.module.css";

interface ThemeToggleButtonProps {
  onClick: () => void;
  isDarkMode: boolean;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  onClick,
  isDarkMode,
}) => {
  return (
    <label className={styles.switch}>
      <input
        placeholder="Toggle theme"
        type="checkbox"
        onClick={onClick}
        checked={isDarkMode}
        readOnly
      />
      <span className={styles.slider}></span>
    </label>
  );
};
