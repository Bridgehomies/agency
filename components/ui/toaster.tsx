"use client"

import * as ToastPrimitive from "@radix-ui/react-toast"
import { useToast } from "@/components/ui/use-toast"
// import { ToastProps } from "@/types" // or inline the type if needed

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastPrimitive.Provider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <ToastPrimitive.Root key={id} {...props}>
          <ToastPrimitive.Title>{title}</ToastPrimitive.Title>
          <ToastPrimitive.Description>{description}</ToastPrimitive.Description>
          {action && <ToastPrimitive.Action altText="Dismiss">{action}</ToastPrimitive.Action>}
          <ToastPrimitive.Close />
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  )
}