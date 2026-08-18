// Flower shape component with various sizes and colors
export function OrganicShape({ 
  className = "", 
  color = "#2F4538",
  size = "medium"
}: { 
  className?: string; 
  color?: string;
  size?: "small" | "medium" | "large" | "xlarge";
}) {
  // Center color based on main color
  const centerColor = color === "#2F4538" ? "#F4D03F" : 
                      color === "#8BA888" ? "#FFE66D" :
                      color === "#5C6F5F" ? "#F4D03F" : "#FFF9A6";
  
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(60, 60)">
        {/* Petal 1 - Top (0°) */}
        <ellipse 
          cx="0" 
          cy="-30" 
          rx="14" 
          ry="20" 
          fill={color}
        />
        
        {/* Petal 2 - 72° */}
        <ellipse 
          cx="0" 
          cy="-30" 
          rx="14" 
          ry="20" 
          fill={color}
          transform="rotate(72)"
        />
        
        {/* Petal 3 - 144° */}
        <ellipse 
          cx="0" 
          cy="-30" 
          rx="14" 
          ry="20" 
          fill={color}
          transform="rotate(144)"
        />
        
        {/* Petal 4 - 216° */}
        <ellipse 
          cx="0" 
          cy="-30" 
          rx="14" 
          ry="20" 
          fill={color}
          transform="rotate(216)"
        />
        
        {/* Petal 5 - 288° */}
        <ellipse 
          cx="0" 
          cy="-30" 
          rx="14" 
          ry="20" 
          fill={color}
          transform="rotate(288)"
        />
        
        {/* Center of flower */}
        <circle cx="0" cy="0" r="12" fill={centerColor} />
      </g>
    </svg>
  );
}

// Export variant components for easy use
export function SmallFlower({ className = "", color = "#8BA888" }: { className?: string; color?: string }) {
  return <OrganicShape className={className} color={color} size="small" />;
}

export function MediumFlower({ className = "", color = "#2F4538" }: { className?: string; color?: string }) {
  return <OrganicShape className={className} color={color} size="medium" />;
}

export function LargeFlower({ className = "", color = "#5C6F5F" }: { className?: string; color?: string }) {
  return <OrganicShape className={className} color={color} size="large" />;
}

export function XLargeFlower({ className = "", color = "#3D4F40" }: { className?: string; color?: string }) {
  return <OrganicShape className={className} color={color} size="xlarge" />;
}
