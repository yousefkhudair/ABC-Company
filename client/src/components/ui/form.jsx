import * as React from "react"
import { useForm as useHookForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <form
      ref={ref}
      className={cn("space-y-6", className)}
      {...props}
    />
  )
})
Form.displayName = "Form"

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    />
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => {
  return <div ref={ref} {...props} />
})
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  if (!children) return null

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-red-500", className)}
      {...props}
    >
      {children}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useHookForm as useForm,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
}
