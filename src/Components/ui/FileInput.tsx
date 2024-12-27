import { forwardRef, InputHTMLAttributes } from 'react'

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="file"
        className={`w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
        file:text-sm file:font-semibold file:bg-violet-100 file:text-violet-700 
        hover:file:bg-violet-200 text-sm text-gray-500
        focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent
        ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

FileInput.displayName = 'FileInput'

