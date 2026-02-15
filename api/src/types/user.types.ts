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

interface ExperienceSubsection {
    _id: ObjectId;
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    bulletPoints: Item[];
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

export interface User {
    _id: string;
    name: string;
    preferredName?: string;
    email: string;
    phoneNumber?: string;
    links: Link[];
    sections: BaseSection[]
    resumes: Resume[]
}