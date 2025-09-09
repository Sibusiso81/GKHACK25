"use client"; // if you're using Next.js App Router (app directory)

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // function to format time as HH:MM:SS
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formatted);
    };

    updateTime(); // run immediately
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="font-mono ">
      <p className="lg:text-md xl:text-lg">Johannesburg : {time} </p>
    </div>
  );
}
