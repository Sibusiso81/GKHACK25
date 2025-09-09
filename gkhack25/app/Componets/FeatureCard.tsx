import React from 'react'
import DynamicLucideIcon from './DynamicLucideIcon'
import { FeatureCardProps } from '@/lib/types'

function FeatureCard({icon,heading,description}:FeatureCardProps) {
  return (
   <div className='flex flex-col p-4 md:p-7 lg:p-5 rounded-lg bg-[#fff] space-y-6 text-green-950'>
        <div className='w-fit  p-3  stroke-lime-400 border rounded-full border-lime-950 '>
          <DynamicLucideIcon name={icon} stroke={'lime-600'} />
          
        </div>
        <div><h2 className='text-lg md:text-xl lg:text-2xl  font-medium'>{heading}</h2></div>
        <div className='text-md lg:text-lg'>
            {description}
        </div>
        </div>
  )
}

export default FeatureCard