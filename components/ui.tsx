
import React, { ReactNode } from 'react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-yellow-600 focus:ring-secondary',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary',
  };
  const sizeStyles = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Card ---
interface CardProps {
  children: ReactNode;
  className?: string;
}
export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
        {footer && <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">{footer}</div>}
      </div>
    </div>
  );
};


// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input id={id} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" {...props} />
    </div>
  );
};

// --- Textarea ---
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}
export const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea id={id} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" {...props}></textarea>
        </div>
    );
};

// --- Badge ---
interface BadgeProps {
  children: ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  className?: string;
}
export const Badge: React.FC<BadgeProps> = ({ children, color = 'blue', className }) => {
  const colorStyles = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorStyles[color]} ${className}`}>{children}</span>;
};

// --- Avatar ---
interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md' }) => {
  const sizeStyles = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-20 w-20',
    xl: 'h-32 w-32',
  };
  return <img className={`rounded-full object-cover ${sizeStyles[size]}`} src={src} alt={alt} />;
};

// --- Spinner ---
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'}> = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'h-5 w-5',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };
    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClasses[size]}`}></div>
        </div>
    );
}

// --- Toast ---
export const Toast: React.FC<{ message: string, type: 'success' | 'error', onDismiss: () => void }> = ({ message, type, onDismiss }) => {
    const baseClasses = 'fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg text-white animate-fade-in-down';
    const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    React.useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button onClick={onDismiss} className="ml-4 text-xl font-semibold">&times;</button>
            </div>
        </div>
    );
};
