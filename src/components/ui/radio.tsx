// components/ui/radio.tsx
import { InputHTMLAttributes } from 'react'

export default function SimpleRadio(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="radio"
      className="w-4 h-4 text-yellow-500 border-gray-300 focus:ring-yellow-500"
      {...props}
    />
  )
}