import React from 'react'

import '../styles/Chart.css'

type Chart = {
  percent: number
  color: string
  count: number
  text: string
}

export default function ({ percent, color, count, text }: Chart) {
  return (
    <svg
      viewBox="0 0 36 36"
      className="block"
      style={{
        maxWidth: '250px',
      }}
    >
      <path
        className="circle"
        strokeDasharray={percent + ', 100'}
        stroke={color}
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="50%" y="50%" textAnchor="middle" className="font-small">
        <tspan x="50%" y="43%">
          {count}
        </tspan>
        <tspan x="50%" y="57%">
          {text}
        </tspan>
      </text>
    </svg>
  )
}
