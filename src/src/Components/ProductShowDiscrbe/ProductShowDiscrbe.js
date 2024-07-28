import React, { useEffect, useMemo, useState } from "react";

export default function ProductShowDiscrbe() {
  const [ordersPrices, setOrdersPrices] = useState([]);
  const [countFreePrices, setcountFreePrices] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))
          .token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setOrdersPrices(data);
      });
    }, []);

  const price = useMemo(
    () => {
      let sum = 0;
      ordersPrices.forEach(product => {
        sum += product.course.price;
      });
      return sum;
    },
    [ordersPrices]
  );

  const countFree = useMemo(
    () => {
      let freeProduct = 0;
      ordersPrices.forEach(product => {
        if (product.course.price === 0) {
          freeProduct += 1;
        }
      });
      return freeProduct;
    },
    [ordersPrices]
  );
  return (
    <div className="">
      <div className=" mainBoxShowUserPanel">
        <div className="boxShowUserPanel1 boxShowUserPanel">
          <div className="boxShowUserPanel_icon boxShowUserPanel_icon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M19 4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm1 6H4v7a1 1 0 0 0 .883.993L5 18h14a1 1 0 0 0 .993-.883L20 17zm-3 3a1 1 0 0 1 .117 1.993L17 15h-3a1 1 0 0 1-.117-1.993L14 13zm2-7H5a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1"
                />
              </g>
            </svg>
          </div>
          <div className="boxShowUserPanel_titels">
            <span className="boxShowUserPanel_title">مجموع پرداختی ها</span>
            <div className="boxShowUserPanel_title2">
              {price}تومان
            </div>
          </div>
        </div>

        <div className="  boxShowUserPanel2 boxShowUserPanel">
          <div className="boxShowUserPanel_icon boxShowUserPanel_icon2">
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
                strokeWidth="2"
                d="M17.684 3.603c.521-.659.03-1.603-.836-1.603h-6.716a1.06 1.06 0 0 0-.909.502l-5.082 8.456c-.401.666.103 1.497.908 1.497h3.429l-3.23 8.065c-.467 1.02.795 1.953 1.643 1.215L20 9.331h-6.849z"
              />
            </svg>
          </div>
          <div className="boxShowUserPanel_titels">
            <span className="boxShowUserPanel_title">تعداد کل دوره ها</span>
            <div className="boxShowUserPanel_title2">
              {ordersPrices.length} دوره{" "}
            </div>
          </div>
        </div>

        <div className="  boxShowUserPanel3 boxShowUserPanel">
          <div className="boxShowUserPanel_icon boxShowUserPanel_icon3">
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
                strokeWidth="2"
              >
                <path d="M3.977 9.84A2 2 0 0 1 5.971 8h12.058a2 2 0 0 1 1.994 1.84l.803 10A2 2 0 0 1 18.833 22H5.167a2 2 0 0 1-1.993-2.16z" />
                <path d="M16 11V6a4 4 0 0 0-4-4v0a4 4 0 0 0-4 4v5" />
              </g>
            </svg>
          </div>
          <div className="boxShowUserPanel_titels">
            <span className="boxShowUserPanel_title">دوره های نقدی</span>
            <div className="boxShowUserPanel_title2">
              {countFree} دوره
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
