import React, { useEffect, useState } from "react";
import Header from "../header/header";
import Sort from "../sort/sort";
import Filters from "../filters/filters";
import styles from "./app.module.css";
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
  const indexLastPost = currentPage * actualPostsPerPage;
  const indexFirstPost = indexLastPost - actualPostsPerPage;
  const currentPosts = postsArray.slice(indexFirstPost, indexLastPost);

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
        <div className={styles.filter_line}>
          <Filters
            setPostsArray={setPostsArray}
            posts={posts}
            setCurrentPage={setCurrentPage}
            postsArray={postsArray}
          />
          <Sort />
        </div>
        <div className={styles.choose_line_container}>
          <ChooseAll postsArray={postsArray} />
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
        <Posts posts={currentPosts} />
      </main>
    </div>
  );
}

export default App;
