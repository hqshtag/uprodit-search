export interface SearchTDO {
    keyword: string
    startIndex: number
    maxResults: number
    usecase: string
}

export interface UproditUser {
    id: string
    denomination: string
    anonymous_denomination: string
    name: string
    surname: string
    gender: string
    image_id: number
    image?: any
    target?: any
    usecase: string
    profile_type: string
    email?:any
    telephone?: any
    cin?: any
    location?: any
    tjm?: any
    specialities: [string]
    skills: [UproditSkill]
    achievements: [UproditAchievement]
    stars_count: number
    picture_direction: number
    y: number
    x: number
    dateUpdate: number
    document_id?: any
    document?: any
    targetDoc: any
}

interface UproditSkill {
    id?: string
    name: string
    level: string
    stars: number
    precentage: string
}

interface UproditAchievement {
    name: string,
    stars: number
}

export interface UprodiImageResponse {
    id: number
    profileId: number
    fileId: number
    searchId: number
    x: number
    y: number
    direction: number
    b64Content: string
    mimeType: string
    usingSearchId: boolean
}

export type StateType = {data: {user: UproditUser, image: UprodiImageResponse}[]}