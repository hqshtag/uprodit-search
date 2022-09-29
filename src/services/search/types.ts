export interface UproditUser {
    id: string;
    denomination: string;
    anonymous_denomination: string;
    name: string;
    surname: string;
    gender: Gender;
    image_id: string;
    usecase: string;
    profile_type: string;
    tjm: null | string;
    specialities: string[];
    skills: Skill[];
    achievements: Achievement[];
    stars_count: number;
    picture_direction: number;
    y: number;
    x: number;
    dateUpdate: number;
  }
  
  export interface Achievement {
    name: string;
    stars: number;
  }
  
  export enum Gender {
    Man = "man",
    Woman = "woman",
  }
  
  export interface SearchQuerySettings {
    startIndex: number;
    maxResults: number;
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
    isFreelance?: boolean;
    specialites?: string;
    allSkillsStr?: string;
    onlyWithTjm?: boolean;
    terms?: string;
  }
  
  export interface Skill {
    name: string;
    level: null | string;
    stars: number;
    percentage: null | string;
  }

  
