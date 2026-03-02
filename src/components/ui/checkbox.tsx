// components/ui/checkbox.tsx
import { InputHTMLAttributes } from 'react'

export default function SimpleCheckbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
      {...props}
    />
  )
}