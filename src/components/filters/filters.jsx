import React, { useState } from "react";
import styles from "./filters.module.css";
import fontStyles from "../../fonts/fonts.module.css";
import { useSelector } from "react-redux";
import NameFilter from "./name-filter/name-filter";

function Filters({ setPostsArray, posts, setCurrentPage, postsArray }) {
  const favoritePosts = [];
  const favorites = useSelector((state) => state.favorites.ids);

  const [filterByTitle, setFilterByTitle] = useState("");

  const filteredByTitle = postsArray.filter((i) =>
    i.title.includes(filterByTitle)
  );

  const handleClick = (e) => {
    if (e.target.checked) {
      postsArray.forEach((i) => {
        if (favorites.includes(i.id)) {
          favoritePosts.push(i);
          setPostsArray(favoritePosts);
          setCurrentPage(1);
        }
      });
    } else {
      setPostsArray(posts);
      setCurrentPage(1);
    }
  };

  return (
    <div className={styles.filters_container}>
      <p className={`${styles.filters_header} ${fontStyles.light_italic}`}>
        filter by:
      </p>
      <ul className={styles.filters}>
        <NameFilter
          postsArray={postsArray}
          setPostsArray={setPostsArray}
          posts={posts}
        />
        <li>
          <input
            className={fontStyles.regular}
            placeholder="Title"
            type="search"
            value={filterByTitle}
            title="start to type"
            onChange={(e) => {
              setFilterByTitle(e.target.value);
              if (e.target.value === "") {
                setPostsArray(posts);
              } else {
                setPostsArray(filteredByTitle);
              }
            }}
          ></input>
        </li>
        <li className={styles.favorites_container}>
          <label htmlFor="favorites">Favorite</label>
          <input
            type="checkbox"
            name="favorites"
            title="added to Favorites"
            id="favorites"
            value="favorites"
            onClick={handleClick}
            className={styles.favorites_checkbox}
          />
        </li>
      </ul>
    </div>
  );
}

export default Filters;
