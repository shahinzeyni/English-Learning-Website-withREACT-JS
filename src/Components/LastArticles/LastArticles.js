import React, { useEffect, useState } from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "./../SectionHeader/SectionHeader";

import "./LastArticles.css";

export default function LastArticles() {
  const [articles, setArticles] = useState([]);
  const [creatorNameArticle,setCreatorNameArticle] = useState("")
  const [createArticle,setCreateArticle] = useState("")


  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        setArticles(allArticles);
        setCreatorNameArticle(allArticles.creator)
        setCreateArticle(allArticles.creator)
      });
  }, []);

  return (
    <section className="articles">
      <div className="containerSize">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          btnHref='articles/1'
        />

        <div className="articles__content">
          <div className="row courseBoxRow">
            {articles.filter(article => article.publish === 1).slice(0, 4).map((article) => (
              <ArticleBox {...article}   key={article._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
