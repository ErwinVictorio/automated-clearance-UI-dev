import { z } from "zod"

export const Subject = z.object({
    subject: z.string().nonempty({
        message: 'subject is required'
    })
})


export const CreateTeacherShema = z.object({
    fullName: z.string().nonempty({
        message: 'Name is required'
    }),

    Course: z.string().nonempty({
        message: 'Course is required'
    }),

    Section: z.string().nonempty({
        message: 'Section is required'
    }),

    YearLebel: z.string().nonempty({
        message: 'YearLebel is required'
    }),


    username: z.string().nonempty({
        message: 'username is required'
    }),

    password: z.string()
    .nonempty({
        message: 'password is required'
    })
 
})




export const LoginSchema =  z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().nonempty({
        message: "Password is required"
    })
})


export const RequirmentSchema = z.object({
    requirment: z.string().nonempty({
        message: "Requirement is required"
    }),

    detail: z.string().nonempty({
        message: 'detail is required'
    }),
    subject: z.string().nonempty({
        message: "Please Select Subject"
    })
})



export const AnnouncementForm = z.object({
    title: z.string().nonempty({
        message: "Tile is required"
    }),

      desription: z.string().nonempty({
        message: "Desription is required"
    }),
})