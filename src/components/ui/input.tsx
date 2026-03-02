// components/ui/input.tsx
import { InputHTMLAttributes } from 'react'

export default function SimpleInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
      {...props}
    />
  )
}