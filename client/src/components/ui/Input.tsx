import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={clsx(
                'w-full px-3 py-2 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500',
                className
            )}
            {...props}
        />
    );
});

export default Input;
