import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb";
import ArticleBox from "./../../Components/ArticleBox/ArticleBox";
import Pagination from "./../../Components/Pagination/Pagination";

import "./Articles.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [shownArticles, setShownArticles] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        setArticles(allArticles);

      });
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb title="دوره ها" name="مقالات" />

      {/* <!--------------------------------  Articles-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownArticles.filter(article => article.publish === 1).map((article) => (
                  <ArticleBox key={article._id} {...article} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={articles}
            itemsCount={5}
            pathname="/articles"
            setShownCourses={setShownArticles}
          />
        </div>
      </section>


      <Footer />
    </>
  );
}
