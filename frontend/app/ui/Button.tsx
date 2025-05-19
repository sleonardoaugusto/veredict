import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClickAction?: () => void
}

export default function Button({
  children,
  onClickAction,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const handleClick = () => {
    if (!disabled && onClickAction) onClickAction()
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={clsx(
          'inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded transition border',
          disabled
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none'
            : 'bg-foreground text-white border-foreground hover:bg-dark-blue hover:border-dark-blue cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}
