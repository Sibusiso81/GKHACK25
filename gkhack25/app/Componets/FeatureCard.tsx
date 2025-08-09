import React from 'react'
import DynamicLucideIcon from './DynamicLucideIcon'
import { FeatureCardProps } from '@/lib/types'

function FeatureCard({icon,heading,description}:FeatureCardProps) {
  return (
   <div className='flex flex-col p-6 md:p-7 lg:p-5 rounded-lg bg-lime-400 space-y-4'>
        <div className='rounded-full w-fit bg-green-950 p-4  stroke-white '>
          <DynamicLucideIcon name={icon} stroke={'white'} />
          
        </div>
        <div><h2 className='text-2xl  font-medium'>{heading}</h2></div>
        <div className='text-md lg:text-lg'>
            {description}
        </div>
        </div>
  )
}

export default FeatureCard