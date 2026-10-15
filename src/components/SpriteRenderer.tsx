import React from 'react';
import { AzuroIcon } from './AzuroIcon';
import { CustomIcons } from './CustomSpriteIcons';

interface SpriteRendererProps {
  isAzuro?: boolean;
  iconName?: string;
  color?: string;
  emoji?: string;
  size?: number;
  costume?: number;
  className?: string;
  customImage?: string;
}

export const SpriteRenderer: React.FC<SpriteRendererProps> = ({ 
  isAzuro, 
  iconName, 
  color = '#000', 
  emoji, 
  size = 40, 
  costume = 1,
  className = '',
  customImage
}) => {
  if (customImage) {
    return <img src={customImage} referrerPolicy="no-referrer" crossOrigin="anonymous" className={className} style={{ width: size, height: size, objectFit: 'contain', pointerEvents: 'none' }} draggable="false" alt="Custom sprite" />;
  }

  if (isAzuro) {
    return <AzuroIcon className={className} costume={costume} style={{ width: size, height: size }} />;
  }

  if (iconName) {
    const IconComponent = CustomIcons[iconName];
    if (IconComponent) {
      return <IconComponent className={className} color={color} size={size} />;
    }
  }

  if (emoji) {
    return <div className={className} style={{ fontSize: size * 0.8, lineHeight: 1 }}>{emoji}</div>;
  }

  return null;
};
