import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllComments();
  }, []);

  function getAllComments() {
    fetch("http://localhost:4000/v1/comments")
      .then((res) => res.json())
      .then((allComments) => {
        setComments(allComments)
       
      });
  }

  const removeComment = (commentID) => {
    swal({
      title: "آیا از حذف کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/${commentID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کامنت مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => getAllComments());
          }
        });
      }
    });
  };

  const showCommentBody = (commentBody) => {
    swal({
      title: commentBody,
      buttons: "تایید",
    });
  };

  const banUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از بن مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت بن شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => getAllComments());
          }
        });
      }
    });
  };

  const acceptComment = (commentID) => {
    swal({
      title: "آیا از تایید کامنت اطمینان دارید",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
       
          if (res.ok) {
            swal({
              title: "کامنت مورد نظر با موفقیت تایید شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };

  const rejectComment = (commentID) => {
    swal({
      title: "آیا از رد کامنت اطمینان دارید",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
        
          if (res.ok) {
            swal({
              title: "کامنت مورد نظر با موفقیت رد شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };

  const answerToComment = (commentID) => {
    swal({
      title: "پاسخ مورد نظر را وارد کنید",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then((answerText) => {
      if (answerText) {
        const commentAnswer = {
          body: answerText,
        };

        fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
          body: JSON.stringify(commentAnswer),
        }).then((res) => {
  
          if (res.ok) {
            swal({
              title: "پاسخ مورد نظر با موفقیت ثبت شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };


  return (
    <>
      <DataTable title="کامنت‌ها">
        <table className="table">
          <thead className="table_th">
            <tr className="table_tr1">
              <th>شناسه</th>
              <th>دوره</th>
              <th>امتیاز</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>تایید</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr className="table_tr">
             
                <p
                  className={
                    comment.answer === 1
                      ? "answer-comment"
                      : "no-answer-comment"
                  }
                >
                  {index + 1}
                </p>
        
                <td className="table_colorText">{comment.course}</td>
                <td >
                  {
                    Array(5 - comment.score).fill(0).map(item => (
                      <span className="starIcon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m13.728 3.444l1.76 3.549c.24.494.88.968 1.42 1.058l3.189.535c2.04.343 2.52 1.835 1.05 3.307l-2.48 2.5c-.42.423-.65 1.24-.52 1.825l.71 3.095c.56 2.45-.73 3.397-2.88 2.117l-2.99-1.785c-.54-.322-1.43-.322-1.98 0L8.019 21.43c-2.14 1.28-3.44.322-2.88-2.117l.71-3.095c.13-.585-.1-1.402-.52-1.825l-2.48-2.5C1.39 10.42 1.86 8.929 3.899 8.586l3.19-.535c.53-.09 1.17-.564 1.41-1.058l1.76-3.549c.96-1.925 2.52-1.925 3.47 0" color="currentColor" />
</svg>
                      </span>
                    ))
                  }
                  {
                    Array(comment.score).fill(0).map(item => (
                      <span className="starFillIcon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"></path></svg>
                      </span>
                    ))
                  }
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => answerToComment(comment._id)}
                  >
                    پاسخ
                  </button>
                </td>
                {comment.answer === 1 ? (
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => rejectComment(comment._id)}
                    >
                      رد
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={() => acceptComment(comment._id)}
                    >
                      تایید
                    </button>
                  </td>
                )}
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
                    className="btn  btn-trash"
                    onClick={() => removeComment(comment._id)}
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
                <td>
                  <button
                    type="button"
                    className="btn  btn-ban"
                    onClick={() => banUser(comment.creator._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2M4 18a13.93 13.93 0 0 1 3.43-9.15l19.72 19.72A14 14 0 0 1 4 18m24.57 9.15L8.85 7.43a14 14 0 0 1 19.72 19.72" class="clr-i-outline clr-i-outline-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg>
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
