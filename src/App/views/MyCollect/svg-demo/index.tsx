import React, { useState } from 'react'
import style from './style.module.css'

function Entry() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const handleMouseOver = (region: string) => {
    console.log('Mouse over region:', region)
    setActiveRegion(region)
  }

  const handleMouseLeave = () => {
    console.log('Mouse leave')
    setActiveRegion(null)
  }

  return (
    <>
      <svg className={style.wrap} version='1.1' baseProfile='full' width='300' height='200' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M 10 10 L 150 10 L 100 100 Z'
          fill={activeRegion === 'region1' ? 'blue' : 'red'}
          onMouseOver={() => handleMouseOver('region1')}
          onMouseLeave={handleMouseLeave}
        />
        <path
          d='M 150 10 L 290 10 L 200 100 Z'
          fill={activeRegion === 'region2' ? 'blue' : 'green'}
          onMouseOver={() => handleMouseOver('region2')}
          onMouseLeave={handleMouseLeave}
        />
        <path
          d='M 100 100 L 200 100 L 150 190 Z'
          fill={activeRegion === 'region3' ? 'blue' : 'orange'}
          onMouseOver={() => handleMouseOver('region3')}
          onMouseLeave={handleMouseLeave}
        />

        <text x='150' y='125' fontSize='20' textAnchor='middle' fill='white'>
          SVG
        </text>
      </svg>
    </>
  )
}

export default Entry
