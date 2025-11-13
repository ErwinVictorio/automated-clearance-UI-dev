import { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Announcement {
    id: number;
    author: string;
    role: string;
    message: string;
    created_at: string;
    avatar?: string;
}

function AnnouncementPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 🔥 TEST DATA (No API yet)
        const sampleData: Announcement[] = [
            {
                id: 1,
                author: "Mrs. Santos",
                role: "Grade 10 Teacher",
                message: "Tomorrow, please bring your project for final checking.",
                created_at: "2025-11-05",
            },
            {
                id: 2,
                author: "Registrar's Office",
                role: "Office Announcement",
                message: "Enrollment for the next semester is now officially open.",
                created_at: "2025-11-05",
            },
            {
                id: 3,
                author: "Mr. Reyes",
                role: "School Principal",
                message: "General assembly will be held this Friday in the covered court.",
                created_at: "2025-11-06",
            },
        ];

        setTimeout(() => {
            setAnnouncements(sampleData);
            setLoading(false);
        }, 800); // delay para may loading effect
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
                            key={item.id}
                            className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="font-semibold">{item.author}</p>
                                    <span className="text-sm text-gray-500">{item.role}</span>
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
