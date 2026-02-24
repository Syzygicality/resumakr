import { ObjectId } from 'mongodb';

interface Item {
    _id: ObjectId;
    itemType: string;
    itemName: string;
    starred: boolean;
    tags: string[];
}

export interface Link {
    _id: ObjectId;
    linkType: "contact" | "project";
    linkName?: string;
    link: string;
}

interface SkillList {
    _id: ObjectId;
    listName: string;
    skills: Item[];
    tags: string[];
}

interface ExperienceSubsection {
    _id: ObjectId;
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    bulletPoints: Item[];
    tags: string[];
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
    tags: string[];
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
    tags: string[];
}

interface BaseSection {
    _id: ObjectId;
    type: "skills" | "profile" | "experience" | "projects" | "education";
    header?: string;
}

interface SkillSection extends BaseSection {
    skills: SkillList[];
}

interface ProfileSection extends BaseSection {
    profile: Item[];
}

interface ExperienceSection extends BaseSection {
    experience: ExperienceSubsection[];
}

interface ProjectsSection extends BaseSection {
    projects: ProjectSubsection[];
}

interface EducationSection extends BaseSection {
    education: EducationSubsection[];
}

interface ResumeItem {
    _id: ObjectId;
    ref: ObjectId;
}

interface ResumeList {
    _id: ObjectId;
    items: ResumeItem[];
}

interface ResumeSubsection {
    _id: ObjectId;
    ref: ObjectId;
    primaryItems: ResumeList[];
    secondaryItems?: ResumeList[];
}

interface ResumeSection {
    _id: ObjectId;
    ref: ObjectId;
    subsections: ResumeSubsection[];
}

interface Resume {
    _id: ObjectId;
    resumeSections: ResumeSection[];
}

interface APIKey {
    _id: ObjectId;
    hash: string;
    iv: string;
    authTag: string;
    created_at: Date;
    disabled: boolean;
}

export interface User {
    _id: string;
    name: string;
    preferredName?: string;
    email: string;
    phoneNumber?: string;
    creationDate: Date;
    tags: string[];
    links: Link[];
    sections: BaseSection[];
    resumes: Resume[];
    APIKey?: APIKey;
}

export type UserPatch = Partial<
    Pick<User, 'name' | 'preferredName' | 'email' | 'phoneNumber' >
>;