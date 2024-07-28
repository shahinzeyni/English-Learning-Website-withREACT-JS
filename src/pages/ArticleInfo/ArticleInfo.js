import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb";
import { Link , useParams } from "react-router-dom";
import domPurify from 'dompurify'

import "./ArticleInfo.css";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";



export default function ArticleInfo() {
  const [articleDetails, setArticleDetails] = useState({});
  const [articleCategory, setArticleCategory] = useState({});
  const [articleCreator, setArticleCreator] = useState({});
  const [articleCreateDate, setArticleCreateDate] = useState("");
  const { articleName } = useParams();


  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then((res) => res.json())
      .then((articleInfo) => {
        setArticleDetails(articleInfo);
        setArticleCategory(articleInfo.categoryID);
        setArticleCreator(articleInfo.creator);
        setArticleCreateDate(articleInfo.createdAt);
      });
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb title="دوره ها" name="مقالات" />

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="article">
                <h1 className="article__title title">{articleDetails.title}</h1>
                <div className="article__header">
                  <div className="article-header__category article-header__item">
                    <i className="far fa-folder article-header__icon"></i>
                    <a href="#" className="article-header__text">
                      {articleCategory.title}
                    </a>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-user article-header__icon"></i>
                    <span className="article-header__text">
                      ارسال شده توسط {articleCreator.name}
                    </span>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-eye article-header__icon"></i>
                    <span className="article-header__text">
                      تاریخ انتشار: {articleCreateDate.slice(0, 10)}
                    </span>
                  </div>
                </div>
                <img
                  src="/images/blog/1.jpg"
                  alt="Article Cover"
                  className="article__banner"
                />
                <div className="article__score">
                  <div className="article__score-icons">
                    <i className="fa-solid fa-star article__score-icon "></i>
                    <i className="fa-solid fa-star article__score-icon "></i>
                    <i className="fa-solid fa-star article__score-icon "></i>
                    <i className="fa-solid fa-star article__score-icon "></i>
                    <i className="fa-solid fa-star article__score-icon "></i>
                  </div>
                  <span className="article__score-text">
                    4.9/5 - (5 امتیاز)
                  </span>
                </div>

                <p className="article__paragraph paragraph">
                  هر چه کلمات انگلیسی بیشتری بدانید، بهتر می توانید منظورتان را
                  برسانید. تنها راه بهبود و گسترش دایره لغات، یادگیری کلمات
                  بیشتر است. هر روز یک کلمه جدید انگلیسی یاد بگیرید و از آن
                  استفاده کنید. اگر مطمئن نیستید از کجا شروع کنید، سعی کنید فلش
                  کارت هایی از پرکاربردترین کلمات بسازید. وقتی که اصول اولیه را
                  پوشش دادید، از یک اصطلاح نامه برای تقویت بیشتر دایره لغات تان
                  استفاده و به کارگیری کلمات پیچیده تر را شروع کنید تا بتوانید
                  منظورتان را بهتر برسانید . روش دیگر برای تقویت واژگان انگلیسی،
                  خواندن مقالات سایت ها است. عضو یک سایت شوید ، هر روز صبح چند
                  مقاله بخوانید و کلمات جدید را گردآوری کنید. همچنین می توانید
                  برنامه های تلویزیونی را به زبان انگلیسی با زیرنویس تماشا کنید
                  تا تلفظ کلمات جدید را هم یاد بگیرید.
                </p>

                <div className="article-read">
                  <span className="article-read__title">
                    آنچه در این مقاله خواهید خواند:
                  </span>
                  <ul className="article-read__list">
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">
                        معرفی بهترین سایت ‌های آموزش  زبان انگلیسی:
                      </a>
                    </li>
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">
                        یک راه آسان‌تر، دوره‌ های انگلیسی   !
                      </a>
                    </li>
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">
                        ثبت نام در دوره‌ های انگلیسی
                      </a>
                    </li>
                  </ul>
                </div>
                <p className="article__paragraph paragraph">
                  هر چه کلمات انگلیسی بیشتری بدانید، بهتر می توانید منظورتان را
                  برسانید. تنها راه بهبود و گسترش دایره لغات، یادگیری کلمات
                  بیشتر است. هر روز یک کلمه جدید انگلیسی یاد بگیرید و از آن
                  استفاده کنید. اگر مطمئن نیستید از کجا شروع کنید، سعی کنید فلش
                  کارت هایی از پرکاربردترین کلمات بسازید. وقتی که اصول اولیه را
                  پوشش دادید، از یک اصطلاح نامه برای تقویت بیشتر دایره لغات تان
                  استفاده و به کارگیری کلمات پیچیده تر را شروع کنید تا بتوانید
                  منظورتان را بهتر برسانید . روش دیگر برای تقویت واژگان انگلیسی،
                  خواندن مقالات سایت ها است. عضو یک سایت شوید ، هر روز صبح چند
                  مقاله بخوانید و کلمات جدید را گردآوری کنید. همچنین می توانید
                  برنامه های تلویزیونی را به زبان انگلیسی با زیرنویس تماشا کنید
                  تا تلفظ کلمات جدید را هم یاد بگیرید.
                </p>

                <img
                  src="/images/blog/2.jpg"
                  alt="Article Image"
                  className="article__seconadary-banner"
                />

                <div
                  className="article-section"
                  dangerouslySetInnerHTML={{
                    __html: domPurify.sanitize(articleDetails.body)
                  }}
                >
                  
                </div>

           
              </div>

             
            </div>

            <div className="col-lg-4 col-12">
                <div className="courses-info">
             

                  <div className="course-info_article">
                    <div className="course-info__header-short-url">
                      <i className="fas fa-link course-info__short-url-icon"></i>
                      <span className="course-info__short-url-text">
                        لینک کوتاه
                      </span>
                    </div>
                    <span className="course-info__short-url">
                      https://EnglishLearning.ir/?p=117472
                    </span>
                  </div>

                </div>
              </div>
      
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
