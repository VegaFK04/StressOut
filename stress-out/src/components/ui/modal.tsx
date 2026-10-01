import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@/utils/format'
import { Button } from '@/components/ui/button'

const Modal = AlertDialogPrimitive.Root
const ModalTrigger = AlertDialogPrimitive.Trigger
const ModalPortal = AlertDialogPrimitive.Portal

const ModalContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ModalPortal>
    <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card p-6 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    />
  </ModalPortal>
))
ModalContent.displayName = 'ModalContent'

const ModalHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} ref={ref} {...props} />
  )
)
ModalHeader.displayName = 'ModalHeader'

const ModalTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title className={cn('text-lg font-semibold leading-none tracking-tight', className)} ref={ref} {...props} />
  )
)
ModalTitle.displayName = 'ModalTitle'

const ModalDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />
  )
)
ModalDescription.displayName = 'ModalDescription'

const ModalFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn('flex justify-end gap-2', className)} ref={ref} {...props} />
  )
)
ModalFooter.displayName = 'ModalFooter'

const ModalAction = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Action ref={ref} className={cn('', className)} {...props} />
  )
)
ModalAction.displayName = 'ModalAction'

const ModalCancel = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel ref={ref} className={cn('mt-2 sm:mt-0', className)} {...props} />
  )
)
ModalCancel.displayName = 'ModalCancel'

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalAction,
  ModalCancel,
}