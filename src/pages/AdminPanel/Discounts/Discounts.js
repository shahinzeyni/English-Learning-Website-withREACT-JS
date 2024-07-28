import React, { useState } from "react";
import swal from 'sweetalert'

export default function Discounts() {
  const [discount, setDiscount] = useState("");

  const setDiscounts = (event) => {
    event.preventDefault();
    const reqBody = {
      discount,
    };

    fetch(`http://localhost:4000/v1/offs/all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
          if(res.ok) {
              swal({
                  title: 'کمپین با موفقیت ایجاد شد',
                  icon: 'success',
                  buttons: "تایید"
              })
          }
      })
  };

  return (
    <>
      <div className="container-fluid sec_course sec_course1" d="home-content">
        <div className="container">
          <div className="home-title titleAdmin ">
            <span className="titleAdmin2"> برگزاری کمپین جدید </span>
          </div>
          <form className="form">
            <div className="col-md-6 col-12">
              <div className="name input">
              <div className="input-group">

                <label className="input-group__label">درصد تخفیف</label>
                <input
                  type="text"
                  value={discount}
                  placeholder="لطفا درصد تخفیف همگانی را وارد کنید..."
                  onChange={(event) => setDiscount(event.target.value)}
                />
                <span className="error-message text-danger"></span>
              </div>
              </div>
            </div>

            <div className="col-12">
              <div className="bottom-form tickBtnOk">
                <div className= "tickBtnOkmake tickBtnOk ticket-form__btn">
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
                  className=" ticket-form__btn2" 
                    type="submit"
                    value="ایجاد کمپین"
                    onClick={setDiscounts}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
