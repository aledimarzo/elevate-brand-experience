'use client';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'button' | 'div';
}

export function MagneticButton({ children, className = '', onClick, as = 'button' }: MagneticButtonProps) {
  if (as === 'div') {
    return <div className={className} onClick={onClick}>{children}</div>;
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
