import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { cn } from '@/utils/format'

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  name: string
  src?: string
  className?: string
}

const AvatarComp = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ name, src, className, ...props }, ref) => (
    <Avatar className={cn('h-10 w-10 rounded-full', className)} ref={ref} {...props}>
      {src ? (
        <AvatarImage src={src} alt={name} />
      ) : (
        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
          {name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  )
)
AvatarComp.displayName = 'Avatar'

export { AvatarComp as Avatar }
