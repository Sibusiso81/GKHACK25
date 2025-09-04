import { HowToProps } from '@/lib/types';
import React from 'react'

function HowItWorksCard(steps: HowToProps) {
    const array = Object.values(steps)[0] as Array<{ step: string; subHeading: string; description: string }>;
  return (
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {
                array && array.map((step,i) => (
                    <div className="p-2    flex flex-col space-y-8" key={i}>
                        <div className="flex space-x-8 items-center">
                            <div className='rounded-full bg-green-950 w-8 h-8  items-center justify-center flex'>
                                <h2 className="  text-md text-lime-400 font-bold">{step.step}</h2>
                            </div>
                        
                            <div className='border border-neutral-200 w-2/3'/>
                             </div>
                            <div className='space-y-3'>
                            <h3 className="text-2xl text-wrap w-2/3 font-semibold">{step.subHeading}</h3>
                            <p>{step.description}</p>
                        </div>
                        
                       
                       
                    </div>
                ))
            }
        </div>
  )
}

export default HowItWorksCard