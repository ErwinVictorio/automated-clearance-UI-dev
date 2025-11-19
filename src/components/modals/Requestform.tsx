"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
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
import axiosClient from '@/lib/axiosClient';
import { getXsrfToken } from "@/lib/crf_token"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formSchema } from "@/schemas/FormSchema";

// ZOD SCHEMA


interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TeachersOrOffice {

  full_name: string,
  course: string,
  section: string
}

export function RequestForm({ open, onOpenChange }: DialogProps) {


  const [teacherList, setTeacherList] = useState<TeachersOrOffice[]>([])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      course: "",
      teacherOffice: "",
      requirement: "",
      driveLink: "",
      image: undefined
    },
  });


  //    GET THE LIST OF TEACHER OR OFFICE

  useEffect(() => {
    axiosClient.get("/sanctum/csrf-cookie");
    axiosClient({
      method: "GET",
      url: "api/student/teacher-list",
      responseType: "json",
      headers: {
        "X-XSRF-TOKEN": getXsrfToken() ?? ""
      }
    }).then(((res) => {
      console.log(res.data.teacher)
      setTeacherList(res.data.teacher)
    }))

  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values);
    console.log("sss");
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
          {/* LEFT SIDE FORM */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col justify-between"
              noValidate
            >
              <div className="space-y-4">

                {/* Student Name */}
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Course */}
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input placeholder="BSIT, BSHM, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Teacher / Office */}
                <FormField
                  control={form.control}
                  name="teacherOffice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Teacher or Office</FormLabel>
                      <Select
                        value={field.value}            // 🔥 FIXED
                        onValueChange={field.onChange} // 🔥 FIXED

                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose one..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teacherList && teacherList.map((teacher, index) => (
                            <SelectItem key={index} value={`${teacher.full_name} (${teacher.course})}`}>
                              {`${teacher.full_name} (${teacher.course})`}
                            </SelectItem>
                          ))}

                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/*  REQUIRMENT */}
                <FormField
                  control={form.control}
                  name="requirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Requirement</FormLabel>
                      <Select
                        value={field.value}            // 🔥 FIXED
                        onValueChange={field.onChange} // 🔥 FIXED
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose one..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Prof. Santos (IT Department)">
                            Prof. Santos (IT Department)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                {/* Drive Link */}
                <FormField
                  control={form.control}
                  name="driveLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Drive Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Paste your Google Drive link" {...field} />
                      </FormControl>
                      <FormDescription>
                        Ensure link is set to *Anyone with link can view*.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                {/* Optional Image */}
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
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file || undefined);
                          }}
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

          {/* RIGHT SIDE */}
          <Card className="border shadow-sm bg-gray-50 h-full">
            <CardHeader>
              <CardTitle className="text-lg text-gray-700">
                Requirements Here
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-700">
              {/* Add dynamic requirements here */}
            </CardContent>
          </Card>

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RequestForm;
