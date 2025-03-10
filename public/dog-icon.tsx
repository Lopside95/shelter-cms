interface DogIconProps {
  className?: string
  width?: number
  height?: number
  color?: string
}

export function DogIcon({ className = "", width = 24, height = 24, color = "currentColor" }: DogIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 15
           C30 15 15 30 15 50
           C15 70 30 85 50 85
           C70 85 85 70 85 50
           C85 30 70 15 50 15
           M35 45
           C35 40 25 25 15 35
           C15 45 25 45 35 45
           M65 45
           C65 40 75 25 85 35
           C85 45 75 45 65 45
           M50 60
           C45 60 40 65 40 70
           C40 75 45 80 50 80
           C55 80 60 75 60 70
           C60 65 55 60 50 60
           M40 45
           C40 45 35 45 35 50
           C35 55 40 55 40 55
           M60 45
           C60 45 65 45 65 50
           C65 55 60 55 60 55"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

