import React, { useEffect, useState } from "react";
import Header from "../header/header";
import Sort from "../sort/sort";
import Filters from "../filters/filters";
import styles from "./app.module.css";
import fontStyles from "../../fonts/fonts.module.css";
import { useDispatch } from "react-redux";
import { getItems, getNames } from "../../services/actions/actions";
import { useSelector } from "react-redux";
import Pagination from "../pagination/pagination";
import AmountOnPage from "../pagination/amount-on-page/amount-on-page";
import Posts from "../posts/posts";
import ChooseAll from "../choose-all/choose-all";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.array);

  const [postsArray, setPostsArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [postIsChecked, setPostIsChecked] = useState(false);

  useEffect(() => {
    dispatch(getNames());
    dispatch(getItems());

    const currentPageStr = localStorage.getItem("currentPage");
    const postsPerPageStr = localStorage.getItem("postsPerPage");
    if (currentPageStr) {
      setCurrentPage(Number(currentPageStr));
    }
    if (postsPerPageStr) {
      setPostsPerPage(Number(postsPerPageStr));
    }
  }, []);

  useEffect(() => {
    setPostsArray(posts);
  }, [posts]);

  const actualPostsPerPage =
    postsPerPage == -1 ? postsArray.length : postsPerPage;
  const indexOfLastPost = currentPage * actualPostsPerPage;
  const indexOfFirstPost = indexOfLastPost - actualPostsPerPage;
  const currentPosts = postsArray.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
  };

  const setPosts = (newPostsPerPage) => {
    if (newPostsPerPage != postsPerPage) {
      setCurrentPage(1);
      localStorage.setItem("currentPage", 1);
    }
    setPostsPerPage(newPostsPerPage);
    localStorage.setItem("postsPerPage", newPostsPerPage);
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <ul className={styles.table_header}>
          <Filters
            setPostsArray={setPostsArray}
            posts={posts}
            setCurrentPage={setCurrentPage}
            postsArray={postsArray}
          />
          <Sort />
        </ul>
        <div className={styles.choose_line_container}>
          <ChooseAll setPostIsChecked={setPostIsChecked} />
          <Pagination
            postsPerPage={actualPostsPerPage}
            totalPosts={postsArray.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <AmountOnPage
            setPostsPerPage={setPosts}
            posts={posts}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
        <Posts posts={currentPosts} setPostIsChecked={setPostIsChecked} postIsChecked={postIsChecked} />
      </main>
    </div>
  );
}

export default App;
