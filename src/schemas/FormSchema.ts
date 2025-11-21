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

      message: z.string().nonempty({
        message: "Desription is required"
    }),
})




export const Register = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().refine((val) => val.length > 8, {
        message: "Password must be at least 8 characters long"
    }),

    fullname: z.string().nonempty('Name is required'),

    course: z.string().nonempty('course is required'),

    section: z.string().nonempty('section is required'),

    yearLavel: z.string().nonempty('yearLavel is required')
})




export  const formSchema = z.object({
  studentName: z.string().min(2, "Student name is required."),
  course: z.string().min(2, "Course is required."),
  teacherOffice: z.string().min(1, "Select a teacher or office."),
  requirement: z.string().min(1, "Select a requirement."),
  title: z.string().min(2, "Title is required."),
  driveLink: z.string().url("Enter a valid Google Drive link."),
  image: z.any().optional(),
  uploads: z.record(z.string(), z.any()).optional(),
});