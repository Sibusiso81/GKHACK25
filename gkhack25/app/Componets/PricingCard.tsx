import { Button } from "@/components/ui/button";
import { PricingCardProps } from "@/lib/types";

import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

function PricingCard({
  price,
  description,
  features,
  idx,
  buttonText,
}: PricingCardProps) {
  const plans = ["Free", "Basic", "Pro"];

  return (
    <div
      className={`  flex flex-col p-6   md:p-7 lg:p-5 rounded-lg shadow-sm border  space-y-6 text-emerald-950 ${
        idx === 0
          ? " border-neutral-300"
          : idx === 1
          ? "bg-[#9ce069] text-emerald-950 "
          : " border-neutral-100"
      }`}
    >
      <div className="flex flex-col space-y-4 ">
        <div className="space-y-3 text-lg font-semibold">
          {" "}
          <h1>{plans[idx]}</h1>
          <p
            className={` ${
              idx === 0
                ? " "
                : idx === 1
                ? " "
                : " "
            }`}
          >
            {description}
          </p>
        </div>
        <div className="flex flex-col ">
          <h2 className="text-2xl  font-medium ">{price}</h2>
          <p
            className={` text-lg font-medium`}
          >
           Billed per month 
          </p>
         
        </div>
      </div>
      <div className="w-full h-0.5 bg-neutral-300/30"></div>
      {features &&
        features.map((item, i) => (
          <ul className="flex space-x-4 text-sm items-center text-emerald-950" key={`${item}-${i}`}>
            <Check
              className={` ${
                idx === 0 ? "bg-lime-500 stroke-white  " : idx === 1 ? "bg-emerald-950 stroke-white" : " bg-lime-500 stroke-white"
              }  stroke-black rounded-full w-5 h-5 p-0.5 `}
            />
            <li className="font-medium ">{item}</li>
          </ul>
        ))}

      <Link href={"Auth/SignUp"}>
        <Button
          className={`w-full p-6 rounded-lg cursor-pointer  ${
              idx === 0
                ? " bg-lime-400 hover:bg-[#9ce069] "
                : idx === 1
                ? " bg-emerald-950 "
                : " bg-lime-400 hover:bg-[#9ce069] "
            }`}
         
        >
          <p
            className={`${
              idx === 0
                ? " text-emerald-950 font-medium"
                : idx === 1
                ? "text-white font-medium"
                : " text-emerald-950 font-medium"
            }`}
          >
            {buttonText}
          </p>
        </Button>
      </Link>
    </div>
  );
}

export default PricingCard;
