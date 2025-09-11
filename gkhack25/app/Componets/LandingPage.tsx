'use client'
import React, { useEffect, useState } from "react";
import { LandingPageProps } from "@/lib/types";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, Sprout, X } from "lucide-react";
import Link from "next/link";
import Navbar from "./Navbar";
import { langData } from "./LangData";
import HowItWorksCard from "./HowItWorksCard";
import PricingCard from "./PricingCard";
import FeatureCard from "./FeatureCard";
import { LucideIconName } from "./DynamicLucideIcon";
import { toast, Toaster } from "sonner";
import Clock from "./Clock";

function LandingPage({ index }: LandingPageProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  useEffect(() => {
    localStorage.setItem("Language", langData[index]?.language ?? "");
    toast.success(`Language set to ${langData[index]?.language}`);
  }, [index]);
  return (
    <main className="overflow-hidden ">
      <Toaster position="top-center" />
      <section
        className="w-screen h-screen flex flex-col font-poppins  items-center justify-center overflow-hidden    bg-center bg-cover text-white  "
        id={langData[index]?.Footer?.socialLinks[0]}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src="/AgriAssistSAHomeVideo.mp4"
            type="video/mp4"
         
          />
        </video>
        <div className=" flex justify-between items-center relative z-40  p-5 w-full ">
          <div className="flex justify-between items-center w-32 ">
            <h1 className=" font-medium text-white text-lg ">AgriAssist</h1>
            <Sprout className="w-8 h-8 stroke-lime-400" />
          </div>
          <div className="flex flex-row space-x-2 items-cente justify-between pr-4">
            <Menu
              className={`cursor-pointer stroke-lime-400  w-8 h-8 ${
                isOpen ? "hidden" : ""
              }`}
              onClick={() => setIsOpen(!isOpen)}
            />
            <X
              className={`cursor-pointer stroke-lime-400 w-8 h-8 ${
                isOpen ? "mx-2" : "hidden"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isOpen ? <Navbar /> : null}
        </AnimatePresence>
        <div
          className="flex flex-1 flex-col   place-content-end place-self-start md:w-2/3 lg:w-1/2 md:p-10  space-y-4 p-4 m-4  z-10  
        
          lg:space-y-8"
        >
          {/*  <div className="lg:justify-self-end lg:place-self-end lg:w-1/2 ">
            <h1 className="text-4xl md:text-5xl lg:text-5xl lg:max-w-screen-sm font-poppins font-medium">
              {langData[index]?.heroSection.subHeadline}
            </h1>
          </div> */}
          <div className="flex flex-col space-y-4 lg:spaec-y- lg:max-w-screen-sm font-poppins p-1 rounded-md">
            <h1 className="text-4xl lg:text-4xl font-medium ">
              {langData[index]?.heroSection.headline}
            </h1>
            <h2 className=" font-medium text-sm lg:text-lg">
              {langData[index]?.heroSection.subHeadline}
            </h2>
          </div>
          <Link href="/Auth/SignUp">
            <button className="w-2/3 md:w-1/2 hover:cursor-pointer p-2 lg:p-3 text-center bg-white text-lime-600 place-self-start">
              {langData[index]?.heroSection.callToAction}
            </button>
          </Link>
        </div>
      </section>
      <section
        className="w-screen   h-fit lg:h-screen sm:h-screen flex flex-col p-10 md:p-16 lg:p-32 space-y-6 lg:justify-center text-green-950"
        id={langData[index]?.Footer?.socialLinks[1]}
      >
        <div className="lg:pl-16">
          <h1 className="text-muted-foreground text-md   lg:text-md  ">
            {langData[index]?.aboutSection.title}
          </h1>
        </div>
        <div className="lg:pl-16">
          <h2 className="text-3xl lg:text-4xl font-normal">
            {langData[index]?.aboutSection.whoWeAre}
          </h2>
        </div>
        <div className="text-pretty text-md  font-normal space-y-4 my-auto md:my-11 lg:my-my-11 lg:pr-24  lg:flex ">
          <div className="hidden lg:flex lg:w-1/2"></div>{" "}
          <div className="flex flex-col space-y-4 lg:space-y-7 justify-self-end lg:w-1/2 my-auto text-md font-poppins">
            <p>{langData[index]?.aboutSection.ourStory}</p>
            <p>{langData[index]?.aboutSection.ourMission}</p>
          </div>
        </div>
      </section>
      
      <section className="w-screen h-fit xl:h-[80vh]  flex flex-col  space-y-5 lg:space-y-12 p-6 md:p-16 lg:p-32  text-lime-950" id={langData[index]?.Footer?.socialLinks[2]}>
        <div className="flex flex-col  justify-between">
          <h1 className="text-xl md:text-4xl lg:text-5xl font-bold md:w-2/3">
            {langData[index]?.getStartedSection?.heading}
          </h1>
          <p className="text-md md:text-md lg:text-lg mt-4 md:w-1/2  ">
            {langData[index]?.getStartedSection.subHeading}
          </p>
        </div>
        <div>
          <HowItWorksCard steps={langData[index]?.getStartedSection.steps ?? []} />
        </div>
      </section>
      <section className="w-screem h-fit  p-6 md:p-16  lg:p-32  flex flex-col    space-y-4 text-green-950" id={langData[index]?.Footer?.socialLinks[3]}>
        <div className="flex-col space-y-4 lg:w-1/2 text-green-950">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold w-2/3">
            {langData[index]?.aboutSection.whyChooseUsSection.subtitle}
          </h1>
          <p className="text-lg font-medium  lg:text-xl md:w-4/5">
            {langData[index]?.aboutSection.whyChooseUsSection.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-3.5 p-1 lg:w-full ">
          {langData[index]?.services.map((items, i) => (
            <FeatureCard
              icon={items.icon as LucideIconName}
              heading={items.heading}
              description={items.paragraph}
              key={i}
            />
          ))}
        </div>
      </section>
      <section className="w-screen h-fit p-4 md:p-20 lg:p-32    flex flex-col space-y-8 text-green-950" id={langData[index]?.Footer?.socialLinks[4]}>
        <div className="flex-col space-y-3 lg:mt-10">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold md:w-1/2">
            {langData[index]?.aboutSection.pricing?.subtitle}
          </h1>
          <p className="md:text-md  font-medium  lg:text-xl md:w-2/3">
            {langData[index]?.aboutSection.pricing?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:gap-5 md:grid-cols-2 xl:grid-cols-3 gap-3 ">
          {(langData[index]?.Pricing
            ? Object.values(langData[index]?.Pricing)
            : []
          ).map((plan, idx) => (
            <PricingCard
              key={idx}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              idx={idx}
              buttonText={langData[index]?.heroSection.callToAction ?? ""}
            />
          ))}
        </div>
      </section>
     

      <section className="w-screen flex flex-col min-h-screen mt-20" id={langData[index]?.Footer?.socialLinks[5]}>
      {/* Call to Action */}
      <div className="h-[50vh] bg-[#d5f0a3] flex flex-col justify-center items-center p-4 lg:p-8 space-y-8 text-center">
        <p className="text-3xl  lg:text-4xl md:w-2/3">
          {langData[index]?.Footer?.callToActionDescription}
        </p>
        <button className="flex items-center space-x-2 hover:cursor-pointer">
          <span className="bg-[#122023] text-[#e1fcad] rounded-3xl px-4 py-2 w-32 text-center">
            {langData[index]?.heroSection.callToAction}
          </span>
          <span className="bg-[#122023] text-[#e1fcad] rounded-full p-3">
            <ArrowUpRight />
          </span>
        </button>
      </div>

      {/* Footer Content */}
      <footer className="bg-[#1a2c30] text-[#e1fcad] flex flex-col justify-between h-full p-4 md:p-8 space-y-16 md:space-y-36 lg:space-y-44 mt-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between space-y-8 lg:space-y-0">
          <p className="text-xl font-medium md:w-2/3 lg:w-1/2   xl:text-3xl">
            {langData[index]?.Footer?.footerDescription}
          </p>

          {/* Links */}
          <div className="flex flex-col md:flex-row ">
            <nav className="grid lg:grid-cols-2 gap-y-3 lg:gap-y-0">
              <p>↳ PAGES</p>
              <ul>
                {langData[index]?.Footer?.Pagelinks.map((link: string, _idx: number) => (
                  <Link href={`#${link}`} key={_idx}>
                    <li key={_idx} className="lg:text-md xl:text-xl">
                    {link}
                  </li>
                  </Link>
                ))}
              </ul>
            </nav>

            <nav className="grid lg:grid-cols-2 gap-y-3 lg:gap-y-0 lg:gap-x-4 h-fit">
              <p>↳ SOCIALS</p>
              <ul>
                {langData[index]?.Footer?.socialLinks.map((link: string, _idx: number) => (
                  <li key={_idx} className="lg:text-md xl:text-xl">
                    {link}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid-rows-2 lg:flex lg:justify-between w-full space-y-10 lg:space-y-0 lg:items-end mt-auto">
          <div className="flex space-x-2 items-center w-2/3">
            <Sprout className="w-12 h-12 stroke-lime-400" />
            <h1 className="font-medium text-white text-4xl xl:text-5xl">AgriAssist</h1>
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-4 text-nowrap ">
            <Clock />
            <p className="lg:text-md xl:text-lg">&copy; {langData[index]?.Footer?.Footprint}</p>
          </div>
        </div>
      </footer>
    </section>
    </main>
  );
}

export default LandingPage;
