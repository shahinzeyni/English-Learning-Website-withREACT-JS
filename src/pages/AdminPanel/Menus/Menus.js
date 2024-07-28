import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import { minValidator } from "../../../validators/rules";

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [menuParent, setMenuParent] = useState("-1");

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllMenus();
  }, []);

  function getAllMenus() {
    fetch("http://localhost:4000/v1/menus/all")
      .then((res) => res.json())
      .then((allMenus) => {
        setMenus(allMenus);

      });
      
  }

  const removeMenu = (menuID) => {
    swal({
      title: "آیا از حذف منو اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/menus/${menuID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "منوی مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllMenus();
            });
          }
        });
      }
    });
  };

  const createMenu = (event) => {
    event.preventDefault();

    const newMenuInfo = {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent: menuParent === "-1" ? undefined : menuParent
    };

    fetch(`http://localhost:4000/v1/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMenuInfo)
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "منوی جدید ایجاد شد.",
          icon: "success",
          buttons: "تمام"
        }).then(() => {
          getAllMenus();
        });
      }
    });
  };

  return (
    <>
      <div className="container ">
        <div className="home-title titleAdmin">
          <span className=" titleAdmin2">افزودن کاربر جدید</span>
        </div>
        <form className="form">
          <div className="col-md-6 col-12">
            <div className="name input">
              <div className="input-group">
                <label className="input-group__label">عنوان</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  id="title"
                  type="text"
                  isValid="false"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="name input">
              <div className="input-group">
                <label className="input-group__label">Url</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  id="href"
                  type="text"
                  isValid="false"
                  validations={[minValidator(5)]}
                  placeholder="لطفا Url را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="name input">
              <div className="input-group">
                <label className="input-group__label">انتخاب</label>
                <select
                  className="select-group"
                  onChange={(event) => setMenuParent(event.target.value)}
                >
                  <option value="-1">جدید</option>
                  {menus.map((menu) => (
                    <>
                      {!Boolean(menu.parent) && (
                        <option value={menu._id}>{menu.title}</option>
                      )}
                    </>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form tickBtnOk">
              <div  className= "tickBtnOkmake tickBtnOk ticket-form__btn">
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
                <input className=" ticket-form__btn2" type="submit" value="افزودن" onClick={createMenu} />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title="منوها">
        <table className="table">
          <thead className="table_th">
            <tr className="table_tr1">
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>فرزند ...</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr className="table_tr">
                <p className="table_tdIndex">{index + 1}</p>
                <td>{menu.title}</td>
                <td className="table_colorText">{menu.href}</td>
                <td
                  className=" 
                tableCheck
                "
                >
                  {menu.parent ? (
                    menu.parent.title
                  ) : (
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
                    onClick={() => removeMenu(menu._id)}
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
