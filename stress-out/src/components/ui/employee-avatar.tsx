import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { cn } from '@/utils/format'

interface EmployeeAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  name: string
  status?: 'active' | 'on-leave' | 'offboarded'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  src?: string
}

const statusDotColors = {
  active: 'bg-emerald-500',
  'on-leave': 'bg-amber-500',
  offboarded: 'bg-gray-400',
} as const

const sizeClasses = {
  sm: 'h-8 w-8 text-[10px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-12 w-12 text-sm',
} as const

const EmployeeAvatar = React.forwardRef<HTMLDivElement, EmployeeAvatarProps>(
  ({ name, status, size = 'md', className, src, ...props }, ref) => {
    const initials = name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

    return (
      <div className='relative inline-block'>
        <Avatar
          className={cn('rounded-full', sizeClasses[size], className)}
          ref={ref}
          {...props}
        >
          <AvatarImage src={src} alt={name} />
          <AvatarFallback className='bg-primary text-primary-foreground font-semibold'>
            {initials}
          </AvatarFallback>
        </Avatar>
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card',
              statusDotColors[status]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    )
  }
)
EmployeeAvatar.displayName = 'EmployeeAvatar'

export { EmployeeAvatar }
