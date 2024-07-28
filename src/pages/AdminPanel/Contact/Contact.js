import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, []);

  function getAllContacts() {
    fetch("http://localhost:4000/v1/contact")
      .then((res) => res.json())
      .then((allContacts) => {

        setContacts(allContacts);
      });
  }

  const showContactBody = (body) => {
    swal({
      title: body,
      buttons: "تایید",
    });
  };

  const sendAnwserToUser = (contactEmail) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "متن پاسخ را وارد کنید",
      content: "input",
      buttons: "ارسال ایمیل",
    }).then((value) => {


      const anwserInfo = {
        email: contactEmail,
        answer: value,
      };

      fetch("http://localhost:4000/v1/contact/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: JSON.stringify(anwserInfo),
      })
        .then((res) => {

          if (res.ok) {
            getAllContacts()
            return res.json();
          }
        })
        .then((result) => console.log(result));
    });
  };

  const removeContact = (contactID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/contact/${contactID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "پیغام مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllContacts();
            });
          }
        });
      }
    });
  };

  return (
    <>
    <div className="container-fliud main_container-fliud">
      <div className="container">
        
      <DataTable title="پیغام‌ها">
        <table className="table " >
          <thead className="table_th">
            <tr className="table_tr1">
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr className="table_tr">
                <td
                  className={contact.answer === 1 ? 'answer-contact' : 'no-answer-contact'}
                >{index + 1}</td>
                <td className="table_colorText">{contact.name}</td>
                <td className="table_colorText">{contact.email}</td>
                <td className="table_colorText">{contact.phone}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showContactBody(contact.body)}
                  >
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => sendAnwserToUser(contact.email)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-trash"
                    onClick={() => removeContact(contact._id)}
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
      </div>
    </div>
    </>
  );
}
