import React, { useEffect, useState } from 'react'
import "./CounterWatch.css";
export default function CounterWatch() {
    const [day,setDay] = useState(6)
    const [hour,setHour] = useState(24)
    const [minute,setMinutes] = useState(60)
    const [second,setSecond] = useState(3)


    useEffect(() => {
      let time = setInterval(() => {
        setSecond((prev) => prev - 1);
        if (second == 0) {
            setMinutes(prev => prev - 1)
            setSecond(60)
        }else if (minute === 0){
            setHour(prev => prev - 1)
            setMinutes(60)
        }else if (hour === 0){
            setDay(prev => prev - 1)
            setHour(24)
        }else if(second === 0 && minute === 0 && hour === 0 && day === 0){
            return clearInterval(time)
        }
        
      }, 1000);

      return () => {
        clearInterval(time);
      };
    },[second])
  return (
    <div className="timeCounter">
      <span>
        {second}
        <p className="timeLine">ثانیه</p>
      </span>
      <span>
        {minute}
        <p className="timeLine">دقیقه</p>
      </span>
      <span>
        {hour}
        <p className="timeLine">ساعت</p>
      </span>
      <span>
      
        {day}
        <p className="timeLine">روز</p>
      </span>
    </div>
  );
}
