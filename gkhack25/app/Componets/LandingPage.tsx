import React, { useState } from 'react'
import { LandingPageProps } from '@/lib/types'
import { AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Navbar from './Navbar'
import { langData } from './LangData'
import HowItWorksCard from './HowItWorksCard'
import PricingCard from './PricingCard'
import FeatureCard from './FeatureCard'
import { LucideIconName } from './DynamicLucideIcon'

function LandingPage({ index}: LandingPageProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
     <main className="overflow-hidden">
      <section className="w-screen h-screen flex flex-col font-poppins  items-center justify-center overflow-hidden bg-gradient-to-b from-black to-green-900 text-[#ececec] " id="Home">
        <div className="w-full border-[#eaeaea] flex justify-between items-center rounded-md relative z-40  p-4">
          <h1 className=" font-medium text-[#eaeaea] text-lg ">Spartan Sentinel</h1>
          <div className="flex flex-row space-x-2 items-cente justify-center pr-4">
            <Menu
              className={`cursor-pointer ${isOpen ? "hidden" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            />
            <X
              className={`cursor-pointer ${isOpen ? "mx-2" : "hidden"}`}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isOpen ? <Navbar /> : null}
        </AnimatePresence>
        <div className="flex flex-1 flex-col lg:flex-row justify-center  md:place-content-end md:items-start md:p-10 space-y-9 p-8 z-10 lg:justify-items-end lg:items-start lg:p-10 lg:w-full lg:justify-between lg:h-full lg:gap-10 lg:space-x-8">
          <div className="lg:justify-self-end lg:place-self-end lg:w-1/2 ">
            <h1 className="text-4xl md:text-5xl lg:text-5xl lg:max-w-screen-sm font-poppins font-medium">
              {langData[index].heroSection.subHeadline}
            </h1>
          </div>

          <div className="lg:p-10 space-y-4 lg:justify-self-center  lg:justify-center lg:items-center lg:place-self-end-safe lg:justifyself-end lg:place-content-end lg:w-1/2s">
            <div>
              <h2 className="text-md md:text-md font-poppins font-medium w-full lg:w-1/2 lg:place-self-end">
                {langData[index].heroSection.headline}
              </h2>
            </div>
            <div className="lg:place-self-end max-w-screen-sm lg:w-1/2 ">
              {" "}
             <Link href="/Auth/SignUp">
              <button className="w-full hover:cursor-pointer p-4 text-center bg-lime-400 text-black lg:place-self-end justify-self-end    lg:place-content-end">
                {langData[index].heroSection.callToAction}
              </button>
             </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        className="w-screen   h-screen sm:h-screen flex flex-col p-10 md:p-16 lg:p-32 space-y-6 lg:justify-center"
        id="About"
      >
        <div className="lg:pl-16">
          <h1 className="text-muted-foreground text-md   lg:text-md  ">
            {langData[index].aboutSection.title}
          </h1>
        </div>
        <div className="lg:pl-16">
          <h2 className="text-3xl lg:text-4xl font-normal">
            {langData[index].aboutSection.whoWeAre}
          </h2>
        </div>
        <div className="text-pretty text-md  font-normal space-y-4 my-auto md:my-11 lg:my-my-11 lg:pr-24  lg:flex ">
          <div className="hidden lg:flex lg:w-1/2"></div>{" "}
          <div className="flex flex-col space-y-4 lg:space-y-7 justify-self-end lg:w-1/2 my-auto text-md font-poppins">
            <p>{langData[index].aboutSection.ourStory}</p>
            <p>{langData[index].aboutSection.ourMission}</p>
            <p>{langData[index].aboutSection.ourMission}</p>
          </div>
        </div>
      </section>
      <section className="w-screen h-fit items-center  p-10 lg:p-28 space-y-8  " id="Getstarted">
        <div className="w-full">
          {" "}
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold w-full">
             {langData[index].getStartedSection.heading}
            </h1>
          </div>
          <div className="w-2/3">
            <p className="text-lg md:text-md lg:text-xl mt-4">
             {langData[index].getStartedSection.subHeading}
            </p>
          </div>
        </div>
        <HowItWorksCard steps={langData[index].getStartedSection.steps} />
      </section>
      <section className="w-screen h-fit justify-center items-center  flex flex-col space-y-9  p-10 lg:p-32">
        <div className="w-full" id="Pricing">
          {" "}
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold w-full">
              {langData[index].aboutSection.whyChooseUsSection.subtitle}
            </h1>
          </div>
          <div className="w-2/3">
            <p className="text-lg md:text-md lg:text-xl mt-4">
              {langData[index].aboutSection.whyChooseUsSection.description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:gap-5 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {Object.values(langData[index].Pricing).map((plan, idx) => (
            <PricingCard
              key={idx}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              idx={idx}
              buttonText={langData[index].heroSection.callToAction}
            />
          ))}
        </div>
      </section>
      <section
        className="w-screen h-fit    flex flex-col items-center p-10 lg:p-32 justify-center  space-y-8 mx-auto my-auto"
        id="Features"
      >
        <div className="w-full">
          {" "}
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold w-full">
              {langData[index].aboutSection.whyChooseUsSection.subtitle}
            </h1>
          </div>
          <div className="w-2/3">
            <p className="text-lg md:text-md lg:text-xl mt-4">
              {langData[index].aboutSection.whyChooseUsSection.description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3   gap-3.5 p-1  ">
          {langData[index].services.map((items,i) => (
            <FeatureCard
              icon={items.icon as LucideIconName}
              heading={items.heading}
              description={items.paragraph}
              key={i}
            />
          ))}
        </div>
      </section>
      

      <section className="w-screen h-[80vh] lg:h-[68vh] flex flex-col lg:flex p-4  justify-center   md:p-6  space-y-2 md:space-y-6">
        <div className="pt-3.5 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1  ">
          <div className="col-span-2 flex flex-col space-y-4">
            <div className="w-full border-t-2 h-2 border-neutral-600/65"></div>
          </div>
          <div className="flex space-x-2  col-span-1">
            <h3>Spartan Sentinel</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 gap-x-20 md:justify-self-center ">
            <div className="flex flex-col space-y-2 lg:space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="flex flex-col space-y-2 lg:space-y-5">
                <li>About Us</li>
                <li>Services</li>
                <li>Pricing</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div className="flex flex-col space-y-2 lg:space-y-4">
              <h4 className="font-semibold">Spartans</h4>
              <ul className="flex flex-col space-y-2 lg:space-y-4">
                <li>Ahmed </li>
                <li>Sanele</li>
                <li>Muhammad</li>
                <li>Sibusiso</li>
              </ul>
            </div>
          </div>
          <div className="col-span-2 flex justify-between md:items-end text-xs md:text-md lg:p-3 ">
            <div>
              {" "}
              <p>
                &copy; 2025 Spartan Sentinel by{" "}
                <span className="text-lime-400 text-sm md:text-lg">
                  Spartans
                </span>
                .
              </p>
            </div>

            <div>
              <p>Made with care and plenty coffee</p>
            </div>
          </div>
        </div>
      </section>
    
    </main>
  )
}

export default LandingPage