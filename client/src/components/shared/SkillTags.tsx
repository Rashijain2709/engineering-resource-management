interface Props {
    skills: string[];
}

const SkillTags = ({ skills }: Props) => (
    <div className="flex flex-wrap gap-1">
        {skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 text-xs px-2 py-1 rounded">
                {skill}
            </span>
        ))}
    </div>
);

export default SkillTags;
