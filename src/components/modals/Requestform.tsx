"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosClient from "@/lib/axiosClient";
import { getXsrfToken } from "@/lib/crf_token";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// --------------------------
//  ZOD Schema (Your Schema)
// --------------------------
export const formSchema = z.object({
  studentName: z.string().min(1, "Required"),
  course: z.string().min(1, "Required"),
  teacherOffice: z.string().min(1, "Required"),
  requirement: z.string().min(1, "Required"),
  driveLink: z.string().url("Must be a valid link"),
  image: z.any().optional(),
  section: z.string().nonempty({
    message: "section is required"
  })
});

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TeachersOrOffice {
  full_name: string;
  course: string;
  section: string;
  id: string;
}

export function RequestForm({ open, onOpenChange }: DialogProps) {
  const [teacherList, setTeacherList] = useState<TeachersOrOffice[]>([]);
  const [requirements, setRequirements] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false)

  // --------------------------
  // FORM INSTANCE
  // --------------------------
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      course: "",
      teacherOffice: "",
      requirement: "",
      driveLink: "",
      section: "",
      image: undefined,
    },
  });

  // --------------------------
  // GET TEACHER LIST
  // --------------------------
  useEffect(() => {
    axiosClient.get("/sanctum/csrf-cookie");

    axiosClient({
      method: "GET",
      url: "api/student/teacher-list",
      responseType: "json",
      headers: { "X-XSRF-TOKEN": getXsrfToken() ?? "" },
    }).then((res) => {
      setTeacherList(res.data.teacher || []);
    });
  }, []);

  // --------------------------
  // GET TEACHER REQUIREMENTS
  // --------------------------
  async function GetTeacherRequirments(teacherId: string) {
    setLoading(true)
    try {
      await axiosClient({
        method: "GET",
        url: `api/student/requirment/${teacherId}`,
        responseType: "json",
        headers: { "X-XSRF-TOKEN": getXsrfToken() ?? "" },
      }).then((res) => {
        setRequirements(res.data.list || []);
      });
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  // --------------------------
  // SUBMIT FORM
  // --------------------------
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🔥 SUBMITTED:", values);

    const formData = new FormData();

    formData.append("requestor_name", values.studentName);
    formData.append("section", values.section);
    formData.append("course", values.course);
    formData.append("drive_link", values.driveLink);
    //  get the tehacher id
    const teacherId = values.teacherOffice.split("_")[1];
    formData.append("teacher_id", teacherId);

    if (values.image) formData.append("image", values.image);

    console.log(formData)


    await axiosClient({
      method: "POST",
      url: "api/student/submit-requirment",
      data: formData,
      responseType: "json",
      headers: {
        "X-XSRF-TOKEN": getXsrfToken() ?? ""
      }
    }).then((res) => {
      console.log(res)
    })

  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl bg-white p-6 rounded-xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Submit Requirements
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col justify-between"
              noValidate
            >
              <div className="space-y-4">

                {/* NAME */}
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* COURSE */}
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input placeholder="BSIT, BSHM..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input placeholder="Your section" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* TEACHER / OFFICE */}
                <FormField
                  control={form.control}
                  name="teacherOffice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Teacher or Office</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          const id = value.split("_")[1];
                          GetTeacherRequirments(id);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose one..." />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {teacherList.map((t, i) => (
                            <SelectItem
                              key={i}
                              value={`${t.full_name} (${t.course})_${t.id}`}
                            >
                              {`${t.full_name} (${t.course})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* REQUIREMENT */}
                <FormField
                  control={form.control}
                  name="requirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Requirement</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose requirement" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {requirements.map((req, i) => (
                            <SelectItem key={i} value={req.title}>
                              {req.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DRIVE LINK */}
                <FormField
                  control={form.control}
                  name="driveLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Drive Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Paste your Google Drive URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* IMAGE UPLOAD */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Submit
              </Button>
            </form>
          </Form>

          {/* RIGHT SIDE PANEL */}
          <Card className="border shadow-sm bg-gray-50 h-full">
            <CardHeader>
              <CardTitle className="text-lg text-gray-700">
                Requirements
              </CardTitle>
            </CardHeader>


            {isLoading && <Loader2 className="text-gray-500 text-center" />}

            {isLoading ? "Loading..." : (

              <CardContent className="space-y-2 text-sm text-gray-700">
                {requirements.length === 0 && (
                  <p className="text-gray-500">No requirements loaded.</p>
                )}

                {requirements.map((req, i) => (
                  <div key={i} className="p-2 border rounded">
                    <strong>{req.title}</strong>
                    <p>{req.detail}</p>
                    <small className="text-gray-500">{req.subject}</small>
                  </div>
                ))}
              </CardContent>
            )}


          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RequestForm;
