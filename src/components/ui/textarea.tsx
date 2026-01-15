import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          "rounded-md overflow-hidden border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <textarea
          className="w-full h-[120px] min-h-[120px] max-h-[120px] bg-transparent border-0 rounded-none px-3 py-2 text-sm leading-6 placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed resize-none overflow-y-auto overflow-x-hidden"
          ref={ref}
          disabled={disabled}
          {...props}
        />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
