import React, { useRef, useState } from "react";
import fontStyles from "../../../fonts/fonts.module.css";
import { useSelector } from "react-redux";
import styles from "./name-filter.module.css";
import arrow from "../../../images/ref-arrow-down.svg";
import check from "../../../images/check.svg";

function NameFilter({ posts, postsArray, setPostsArray }) {
  const users = useSelector((state) => state.users.array);

  const [open, setOpen] = useState(false);
  let ref = useRef();

  const onNameClick = (e) => {
    const checkedIcon = e.target.lastChild;

    const chooseName = () => {
      setOpen(false);

      checkedIcon.classList.add(styles.checked_active);

      if (ref.current) {
        ref.current.classList.remove(styles.checked_active);
      }

      ref.current = checkedIcon;
    };

    if (e.target.textContent === "-all") {
      setPostsArray(posts);
      chooseName();
    } else {
      const user = users.find((u) => u.name === e.target.textContent);
      const filteredByName = postsArray.filter((i) => i.userId === user.id);

      setPostsArray(filteredByName);
      chooseName();
    }
  };

  const closeOnBackgroundClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <li>
      <div
        className={`${fontStyles.regular} ${styles.user_name_select}`}
        title="click to choose"
        onClick={() => {
          setOpen(!open);
          setPostsArray(posts);
        }}
      >
        <span>User name</span>
        <img
          src={arrow}
          className={open ? styles.arrow_up : styles.arrow}
          alt="arrow"
        />
      </div>
      <div
        className={
          open ? styles.menu_container : styles.menu_container_inactive
        }
      >
        <div
          className={styles.overlay}
          id="overlay"
          onClick={closeOnBackgroundClick}
        ></div>
        <ul className={styles.names_menu}>
          <li
            key="0"
            className={`${styles.name} ${styles.all}`}
            onClick={onNameClick}
          >
            -all
            <img src={check} alt="checked" className={styles.checked} />
          </li>
          {users.map((user) => (
            <li key={user.id} className={styles.name} onClick={onNameClick}>
              {user.name}
              <img src={check} alt="checked" className={styles.checked} />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default NameFilter;
