interface Props {
    allocated: number;
    max: number;
}

const CapacityBar = ({ allocated, max }: Props) => {
    const percentage = (allocated / max) * 100;
    return (
        <div className="w-full bg-gray-200 rounded h-4">
            <div className="bg-green-500 h-4 rounded" style={{ width: `${percentage}%` }} />
        </div>
    );
};

export default CapacityBar;  