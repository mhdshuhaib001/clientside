import React from 'react'

interface CustomAmberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large' | 'custom'
  customWidth?: string
  customHeight?: string
}

const CustomAmberButton: React.FC<CustomAmberButtonProps> = ({ 
  children, 
  className = '', 
  size = 'medium',
  customWidth,
  customHeight,
  ...props 
}) => {
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    custom: ''
  }

  const widthClass = customWidth ? `w-${customWidth}` : ''
  const heightClass = customHeight ? `h-${customHeight}` : ''

  return (
    <button
      className={`
        ${sizeClasses[size]}
        ${widthClass}
        ${heightClass}
        bg-amber-200 
        hover:bg-amber-300 
        text-amber-900 
        border border-amber-200
        rounded-md
        font-medium
        focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-amber-50
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

// Example usage
const ButtonExample: React.FC = () => {
  return (
    <div className="p-4 bg-amber-50 flex flex-col items-center space-y-4">
      <CustomAmberButton size="small" onClick={() => alert('Small button clicked!')}>
        Small Button
      </CustomAmberButton>
      <CustomAmberButton onClick={() => alert('Medium button clicked!')}>
        Medium Button
      </CustomAmberButton>
      <CustomAmberButton size="large" onClick={() => alert('Large button clicked!')}>
        Large Button
      </CustomAmberButton>
      <CustomAmberButton 
        size="custom" 
        customWidth="64" 
        customHeight="16" 
        onClick={() => alert('Custom size button clicked!')}
      >
        Custom Size Button
      </CustomAmberButton>
    </div>
  )
}

export { CustomAmberButton, ButtonExample }