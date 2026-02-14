import { ObjectId } from 'mongodb';

interface Item {
    _id: ObjectId;
    itemType: string;
    itemName: string;
    starred: boolean;
}

interface Link {
    _id: ObjectId;
    linkType: string;
    linkName: string;
    link: string;
}

interface SkillList {
    _id: ObjectId;
    listName: string;
    skills: Item[];
}

interface SkillSection {
    _id: ObjectId;
    type: "skills";
    header?: string;
    skills: SkillList[];
}

interface ProfileSection {
    _id: ObjectId;
    type: "profile";
    header?: string;
    profile: Item[];

}

interface ExperienceSubsection {
    _id: ObjectId;
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    bulletPoints: Item[];
}

interface ExperienceSection {
    _id: ObjectId;
    type: "experience";
    header?: string;
    experience: ExperienceSubsection[];
}

interface ProjectSubsection {
    _id: ObjectId;
    projectName: string;
    skills?: Item[];
    delimiter?: string;
    startDate?: Date;
    endDate?: Date;
    link?: Link;
    bulletPoints: Item[];
}

interface ProjectSection {
    _id: ObjectId;
    type: "projects";
    header?: string;
    projects: ProjectSubsection[];
}

interface EducationSubsection {
    _id: ObjectId;
    institution: string;
    documentType: string;
    program: string;
    startDate: Date;
    endDate: Date;
    coursework?: Item[];
    gpa?: number;

}

interface EducationSection {
    _id: ObjectId;
    type: "education";
    education: EducationSubsection[];
}

export interface User {
    _id: string;
    name: string;
    preferred_name?: string;
    email: string;
    phoneNumber?: string;
    links: Link[];
    sections: (SkillSection | ProfileSection | ExperienceSection | ProjectSection | EducationSection)[]
}