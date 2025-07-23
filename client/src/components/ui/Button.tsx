import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline';
}

const Button: FC<ButtonProps> = ({ children, className, variant = 'default', ...props }) => {
    return (
        <button
            className={clsx(
                'px-4 py-2 rounded font-medium',
                variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
                variant === 'outline' && 'border border-gray-300 text-gray-700',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
