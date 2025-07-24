export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'manager' | 'engineer';
    skills?: string[];
    seniority?: 'junior' | 'mid' | 'senior';
    maxCapacity?: number;
    currentCapacity?: number;
}

export interface Project {
    _id: string;
    name: string;
    description: string;
    requiredSkills: string[];
    status: string;
}

export interface Assignment {
    _id: string;
    engineerId: string;
    projectId: string;
    role: string;
    allocationPercentage: number;
    startDate: string;
    endDate: string;
}
