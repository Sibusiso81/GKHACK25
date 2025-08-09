import React from 'react'
import * as LucideIcons from 'lucide-react'

export type LucideIconName = keyof typeof LucideIcons;

interface DynamicLucideIconProps extends React.ComponentProps<'svg'> {
  name: LucideIconName;
}

const DynamicLucideIcon = ({ name, ...props }: DynamicLucideIconProps) => {
  const LucideIcon = LucideIcons[name];

  const isValidLucideComponent =
    typeof LucideIcon === "function" ||
    (typeof LucideIcon === "object" && LucideIcon !== null && "$$typeof" in LucideIcon);

  if (
    !LucideIcon ||
    (typeof LucideIcon === "function" && LucideIcon.length > 1) ||
    LucideIcon === LucideIcons ||
    !isValidLucideComponent
  ) {
    console.error(`Icon ${name} not found in lucide-react or is not a valid component`);
    return null;
  }
  const LucideIconComponent = LucideIcon as React.ElementType;
  return <LucideIconComponent {...props} />;
};

export default DynamicLucideIcon