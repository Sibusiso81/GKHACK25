"use client";
import { AgriculturalDashboard } from "@/app/Componets/AgricultureDashbard";
import { main } from "@/app/Gemini/propmts";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);
  const [, setResponse] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const result = await main();
        if (result) {
          setData(result);
          setResponse(result); // keep if you actually need response separately
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []); // run once on mount

  return <AgriculturalDashboard data={data||[]} />;
}
