import { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import axiosClient from '@/lib/axiosClient';
import { getXsrfToken } from "@/lib/crf_token";
import type { Anoouncement } from "@/lib/types/global";

function AnnouncementPage() {
    const [announcements, setAnnouncements] = useState<Anoouncement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient({
            method: "GET",
            url: "api/student/annoucements",
            responseType: "json",
            headers: {
                "X-XSRF-TOKEN": getXsrfToken() ?? ""
            }
        }).then((res) => {
            setAnnouncements(res.data.announcement);
        }).finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-3xl mx-auto py-6 px-4">
            <h1 className="text-2xl font-bold mb-6">Announcements</h1>

            <Breadcrumb className="p-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/student-portal">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/student-annoucement">Announcements</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {loading ? (
                <p className="text-center text-gray-500">Loading announcements...</p>
            ) : announcements.length === 0 ? (
                <p className="text-center text-gray-500">No announcements available.</p>
            ) : (
                <div className="space-y-4">
                    {announcements.map((item) => (
                        <div
                            key={item.created_at.toString() + item.title} // or use item.id if exists
                            className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="font-semibold">{item.user.full_name}</p>
                                    <span className="text-sm text-gray-500">
                                        {item.user.course} - {item.user.section} ({item.user.yearlavel})
                                    </span>
                                </div>
                            </div>

                            <p className="mt-3 text-gray-800">{item.message}</p>

                            <p className="text-right text-sm text-gray-400 mt-2">
                                {new Date(item.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AnnouncementPage;
