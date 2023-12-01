import React, { useEffect } from "react";
import Header from "../header/header";
import Sort from "../sort/sort";
import Filters from "../filters/filters";
import styles from "./app.module.css";
import TableBody from "../table-body/table-body";
import fontStyles from "../../fonts/fonts.module.css";
import { useDispatch } from "react-redux";
import { getItems, getNames } from "../../services/actions/actions";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNames());
    dispatch(getItems());
  }, []);

  const handleClick = (e) => console.log(e.target.textContent)

  return (
    <body className={styles.page}>
      <Header />
      <main className={styles.main}>
        <ul className={styles.table_header}>
          <Filters />
          <Sort />
        </ul>
        <div className={styles.choose_line_container}>
          <div className={styles.choose_container}>
            <label
              className={`${styles.choose_header} ${fontStyles.light_italic}`}
              for="choose"
            >
              -choose
            </label>
            <input type="checkbox" name="" id="" value="choose" />
          </div>
          <ul
            className={`${styles.quantity_container} ${fontStyles.light_italic}`}
          >
            <li className={styles.quantity} onClick={handleClick}>
              10
            </li>
            <li className={styles.quantity}>20</li>
            <li className={styles.quantity}>50</li>
            <li className={styles.quantity}>100</li>
            <li className={styles.quantity}>all</li>
          </ul>
        </div>
        <TableBody />
      </main>
    </body>
  );
}

export default App;
