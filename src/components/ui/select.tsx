// components/ui/select.tsx
import { SelectHTMLAttributes } from 'react'

type Option = {
  value: string
  label: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[]
}

export default function SimpleSelect({ options, ...props }: SelectProps) {
  return (
    <select
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}