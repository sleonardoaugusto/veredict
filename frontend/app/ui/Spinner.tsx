import React from 'react'

interface SpinnerProps {
  size?: number
}

export default function Spinner({ size = 4 }: SpinnerProps) {
  return (
    <div
      className={`
        w-${size} h-${size}
        border-2 border-t-transparent
        border-accent
        rounded-full animate-spin
      `}
    />
  )
}
