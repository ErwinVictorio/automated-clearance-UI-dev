"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";



const formSchema = z.object({
  studentName: z.string().min(2, "Student name is required."),
  course: z.string().min(2, "Course is required."),
  teacherOffice: z.string().min(1, "Select a teacher or office."),
  title: z.string().min(2, "Title is required."),
  driveLink: z.string().url("Enter a valid Google Drive link."),
  image: z.any().optional(), // ✅ Optional standalone image upload
  uploads: z.record(z.string(), z.any()).optional(), // ✅ Optional requirement uploads
});

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequestForm({ open, onOpenChange }: DialogProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      course: "",
      teacherOffice: "",
      title: "",
      driveLink: "",
      image: undefined,
      uploads: {},
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values);
    alert("Request submitted successfully!");
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl bg-white p-6 rounded-xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Submit Requirments
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT SIDE FORM */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
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

                <FormField
                  control={form.control}
                  name="teacherOffice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Teacher or Office</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedTeacher(value);
                        }}
                        defaultValue={field.value}
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
                          <SelectItem value="Registrar’s Office">
                            Registrar’s Office
                          </SelectItem>
                          <SelectItem value="Prof. Dizon (Math Department)">
                            Prof. Dizon (Math Department)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="teacherOffice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Requirment</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedTeacher(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose one..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Requirment1">
                            Requirment1
                          </SelectItem>
                          <SelectItem value="Requirment2">
                            Requirment2
                          </SelectItem>
                          <SelectItem value="Requirment3">
                            Requirment3
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                {/*  OPTIONAL IMAGE UPLOAD */}
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
                      <FormDescription className="text-xs text-gray-500">
                        Optional supporting image (ID, screenshot, etc.)
                      </FormDescription>
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

          {/* RIGHT SIDE - OPTIONAL REQUIREMENTS */}
          <Card className="border shadow-sm bg-gray-50 h-full">
            <CardHeader>
              <CardTitle className="text-lg text-gray-700">
                <h1>Requirements Here</h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-700">

            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RequestForm;
