import { LabelHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> { }

const Label: FC<LabelProps> = ({ className, children, ...props }) => (
    <label className={clsx('block text-sm font-medium mb-1', className)} {...props}>
        {children}
    </label>
);

export default Label;
