import React from 'react';
import styles from "./button.module.css";
import fontStyles from "../../fonts/fonts.module.css";

function Button({ buttonText, handleClick }) {
  return (
    <button className={styles.button} onClick={handleClick}><p className={`${styles.button_text} ${fontStyles.bold}`}>{buttonText}</p></button>
  )
}

export default Button