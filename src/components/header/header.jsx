import React from "react";
import logo from "../../images/logo.svg";
import styles from "./header.module.css";
import Button from "../button/button";

function Header() {
  const handleNewPostButtonClick = (e) => {
    e.preventDefault();
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <img className={styles.logo} src={logo} alt="logo" />
        <Button
          buttonText="New post"
          handleClick={handleNewPostButtonClick}
        />
      </div>
    </header>
  );
}

export default Header;
