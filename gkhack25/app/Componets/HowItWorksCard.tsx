import { HowToProps } from '@/lib/types';
import React from 'react'

function HowItWorksCard(steps: HowToProps) {
    const array = Object.values(steps)[0] as Array<{ step: string; subHeading: string; description: string }>;
  return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {
                array && array.map((step,i) => (
                    <div className="p-10  bg-white shadow  flex flex-col space-y-4" key={i}>
                        <div className="">
                            <h2 className="  text-lg text-green-600">{step.step}</h2>
                        </div>
                        <div>
                            <h3 className="text-2xl text-wrap w-1/2 font-semibold">{step.subHeading}</h3>
                        </div>
                        <div>
                            <p>{step.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
  )
}

export default HowItWorksCard