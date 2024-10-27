import React, { useState, useEffect } from "react";

export default function Clock() {
   const [currentTime, setCurrentTime] = useState(new Date());
   useEffect(() => {
      const timer = setInterval(() => {
         setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
   }, []);
   return (
      <div className="text-center text-3xl font-semibold p-2">
         {currentTime.toLocaleTimeString([], { hour12: false })}
      </div>
   );
}
