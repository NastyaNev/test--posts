import React, { useEffect, useState } from "react";
import styles from "./post.module.css";
import fontStyles from "../../fonts/fonts.module.css";
import trash from "../../images/trash.svg";
import comments from "../../images/comment-dots.svg";
import edit from "../../images/pen-square.svg";
import star from "../../images/star.svg";
import starActive from "../../images/star_active.svg";
import { useSelector } from "react-redux";
import { setToFavorites } from "../../services/reducers/favoritesSlice";
import { useDispatch } from "react-redux";
import { setPostChecked } from "../../services/reducers/chooseSlice";

function Post({ post }) {
  const dispatch = useDispatch();

  // const userInfo = [];

  // useEffect(() => {
  //   userInfo = users.find((i) => i.id === post.userId) || {};
  // }, [users]);
  const users = useSelector((state) => state.users.array);
  const userInfo = users.find((i) => i.id === post.userId) || {};
  const favorites = useSelector((state) => state.favorites.ids);

  const choose = useSelector((state) => state.choose);

  const [starIsActive, setStarIsActive] = useState(star);

  useEffect(() => {
    favorites.includes(post.id)
      ? setStarIsActive(starActive)
      : setStarIsActive(star);
  }, []);

  const handleStarClick = () => {
    dispatch(setToFavorites(post.id));
    if (starIsActive === star) {
      setStarIsActive(starActive);
    } else {
      setStarIsActive(star);
    }
  };

  const handlePostCheckboxClick = (e) => {
    dispatch(setPostChecked(post.id));
    e.target.title = "unchoose post";
  };

  return (
    <div className={styles.card_container}>
      <div className={styles.header_line}>
        <div className={styles.name_container}>
          <span className={`${fontStyles.light_italic} ${styles.id}`}>
            #{post.id}
          </span>
          <p className={`${fontStyles.light_italic} ${styles.name}`}>
            {userInfo.name}
          </p>
        </div>
        <input
          className={styles.post_checkbox}
          type="checkbox"
          name="post_checkbox"
          id="post_checkbox"
          value="post_checkbox"
          title="choose post"
          onChange={handlePostCheckboxClick}
          checked={choose.postsChecked.includes(post.id)}
        />
      </div>
      <h3 className={`${fontStyles.bold} ${styles.post_title}`}>
        {post.title}
      </h3>
      <p className={styles.post_text}>{post.body}</p>
      {/* <span className={`${fontStyles.bold} ${styles.span_button}`}>
        Read more
      </span> */}
      <ul className={styles.icons_container}>
        <li>
          <ul className={styles.main_icons_container}>
            <li>
              <button className={styles.post_button}>
                <img
                  src={comments}
                  alt="comments"
                  className={styles.icon}
                  title="open comments"
                />
              </button>
            </li>
            <li>
              <button className={styles.post_button}>
                <img
                  src={edit}
                  alt="edit"
                  className={styles.icon}
                  title="edit post"
                />
              </button>
            </li>
            <li>
              <button className={styles.post_button}>
                <img
                  src={trash}
                  alt="trash"
                  className={styles.icon}
                  title="delete post"
                />
              </button>
            </li>
          </ul>
        </li>
        <li>
          <button
            className={`${styles.post_button} ${styles.favotites_button}`}
            onClick={handleStarClick}
          >
            <img src={starIsActive} alt="favorite" className={styles.icon} />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Post;
