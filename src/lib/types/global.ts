export interface Subject {
    Subject_name: string,
    id: string
}


export interface Anoouncement {

    created_at: Date,
    message: string,
    title: string,
    user:{
        course: string,
        full_name: string,
        section: string,
        yearlavel: string
    }
}