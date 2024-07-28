import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
      });
  }, []);

  const showTicketBody = (body) => {
    swal({
      title: body,
      buttons: "تایید",
    });
  };

  const setAnswerToTicket = (ticketID) => {
    swal({
      title: "لطفا پاسخ مورد نظر را وارد کنید:",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then((value) => {
      if (value) {
        const ticketAnswerInfos = {
          ticketID,
          body: value,
        };

        fetch(`http://localhost:4000/v1/tickets/answer`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketAnswerInfos),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "پاسخ مورد نظر با موفقیت ثبت شد",
              icon: "success",
              buttons: "خیلی هم عالی",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title="تیکت‌ها">
        <table className="table">
          <thead className="table_th">
            <tr className="table_tr1">
              <th>شناسه</th>
              <th>کاربر</th>
              <th>عنوان</th>
              <th>نوع تیکت</th>
              <th>دوره</th>
              <th>اولویت</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr className="table_tr" key={ticket._id}>
                <p className="table_tdIndex">{index + 1}</p>
                <td className="table_colorText" >{ticket.user}</td>
                <td className="table_colorText">{ticket.title}</td>
                <td className="table_colorText">{ticket.departmentSubID}</td>
                <td className="table_colorText">{ticket.course ? ticket.course : "---"}</td>
                <td className="table_colorText">
                  {ticket.priority === 1 && "بالا"}
                  {ticket.priority === 2 && "متوسط"}
                  {ticket.priority === 3 && "کم"}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => setAnswerToTicket(ticket._id)}
                  >
                    پاسخ
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
