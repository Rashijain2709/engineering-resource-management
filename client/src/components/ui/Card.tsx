import { ReactNode } from 'react';

const Card = ({ children }: { children: ReactNode }) => (
    <div className="bg-white p-6 rounded shadow w-full max-w-md">{children}</div>
);

export default Card;
