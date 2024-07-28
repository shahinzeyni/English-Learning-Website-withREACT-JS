import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import { minValidator } from "./../../../validators/rules";
import Editor from "../../../Components/Form/Editor";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState("-1");
  const [articleCover, setArticleCover] = useState({});
  const [articleBody, setArticleBody] = useState("");

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllArticles();

    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, []);

  function getAllArticles() {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => {

        setArticles(allArticles);
      });
  }

  const removeArticle = (articleID) => {
    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مقاله اطمینان دارید؟`",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/articles/${articleID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageDate.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "مقاله مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllArticles();
            });
          }
        });
      }
    });
  };

  const createArticle = (event) => {
    event.preventDefault();
    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    fetch(`http://localhost:4000/v1/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت ایجاد شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          getAllArticles();
        });
      }
    });
  };
  const saveArticleAsDraft = (event) => {
    event.preventDefault();
    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    fetch(`http://localhost:4000/v1/articles/draft`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت پیش نویس شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          getAllArticles();
        });
      }
    });
  };

  return (
    <>
      <div className="container-fluid sec_course" id="home-content">
        <div className="container">
          <div className="home-title titleAdmin">
            <span className="titleAdmin2">افزودن مقاله جدید</span>
          </div>
          <form className="form">
            <div className="col-md-6 col-12">
              <div className="name input">
                <div className="input-group">
                  <label className="input-group__label">عنوان مقاله</label>
                  <Input
                    element="input"
                    type="text"
                    id="title"
                    onInputHandler={onInputHandler}
                    validations={[minValidator(8)]}
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="name input">
                <div className="input-group">
                  <label
                    className="input-group__label"
                    style={{ display: "block" }}
                  >
                    لینک
                  </label>
                  <Input
                    element="input"
                    type="text"
                    id="shortName"
                    onInputHandler={onInputHandler}
                    validations={[minValidator(5)]}
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>

                <Input
                  element="textarea"
                  type="text"
                  id="description"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  className="article-textarea"
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  محتوا
                </label>
                <Editor value={articleBody} setValue={setArticleBody} />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="file fileUploadBox">
                <label className="input-title ">آپلود عکس دوره </label>
                <div className="uploadInp">
                  <input
                    className="fileInpuploader"
                    type="file"
                    id="file"
                    onChange={(event) => {
                      setArticleCover(event.target.files[0]);
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M12 15V2m0 0l3 3.5M12 2L9 5.5"
                      />
                      <path d="M8 22h8c2.828 0 4.243 0 5.121-.878C22 20.242 22 18.829 22 16v-1c0-2.828 0-4.242-.879-5.121c-.768-.768-1.946-.865-4.121-.877m-10 0c-2.175.012-3.353.109-4.121.877C2 10.758 2 12.172 2 15v1c0 2.829 0 4.243.879 5.122c.3.3.662.497 1.121.627" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="name input ">
                <div className="input-group select-group2">
                  <label className="input-group__label">دسته بندی</label>
                  <select
                    className="select-group select-group"
                    onChange={(event) => setArticleCategory(event.target.value)}
                  >
                    <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                    {categories.map((category) => (
                      <option value={category._id}>{category.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="mainTickBtnArticles">
                <div className=" tickBtnOk">
                  <div className="tickBtnOkmake tickBtnOk ticket-form__btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        <path d="M14.25 8.75c-.5 2.5-2.385 4.854-5.03 5.38A6.25 6.25 0 0 1 3.373 3.798C5.187 1.8 8.25 1.25 10.75 2.25" />
                        <path d="m5.75 7.75l2.5 2.5l6-6.5" />
                      </g>
                    </svg>
                    <input
                      type="submit"
                      value="انتشار"
                      className="m-2 ticket-form__btn2"
                      onClick={createArticle}
                    />
                  </div>
                </div>
                <div className="m-3 tickBtnOk">
                  <div className="tickBtnOkmake tickBtnOk ticket-form__btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="m29.707 19.293l-3-3a1 1 0 0 0-1.414 0L16 25.586V30h4.414l9.293-9.293a1 1 0 0 0 0-1.414M19.586 28H18v-1.586l5-5L24.586 23zM26 21.586L24.414 20L26 18.414L27.586 20zM8 16h10v2H8zm0-6h12v2H8z"
                      />
                      <path
                        fill="currentColor"
                        d="M26 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13a10.98 10.98 0 0 0 5.824 9.707L13 29.467V27.2l-4.234-2.258A8.99 8.99 0 0 1 4 17V4h20v9h2Z"
                      />
                    </svg>
                    <input
                      type="submit"
                      value="پیش‌نویس"
                      className=" ticket-form__btn2"
                      onClick={saveArticleAsDraft}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="مقاله‌ها">
        <table className="table">
          <thead className="table_th">
            <tr className="table_tr1">
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>وضعیت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr className="table_tr">
                <p className="table_tdIndex">{index + 1}</p>
                <td>{article.title}</td>
                <td className="table_colorText">{article.shortName}</td>

                <td className="table_colorText">{article.creator.name}</td>
                <td>{article.publish === 1 ? "منتشر شده" : "پیش‌نویس"}</td>
                <td className="tableCheck">
                  {article.publish === 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <Link
                      to={`draft/${article.shortName}`}
                      className="btn btn-primary edit-btn btn-primaryBg"
                    >
                      ادامه نوشتن
                    </Link>
                  )}
                </td>
                <td>
                  <button type="button" className="btn btn-edit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        <path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56" />
                        <path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.362 1.362 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.361 1.361 0 0 1-.953.395H8.197a1.362 1.362 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086" />
                      </g>
                    </svg>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-trash"
                    onClick={() => removeArticle(article._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
