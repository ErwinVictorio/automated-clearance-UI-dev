

import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Building2, User } from "lucide-react";
import imageLogo from '../../../public/download.png'
function HomePage() {
    const portals = [
        {
            title: "Student Login",
            description: "Access your clearance status and documents",
            icon: <GraduationCap size={24} />,
            color: "blue",
            link: "/login",
        },
        {
            title: "Teacher / Staff",
            description: "Approve student clearance requests",
            icon: <Building2 size={24} />,
            color: "green",
            link: "/login",
        },
        {
            title: "Administrator",
            description: "Manage system",
            icon: <User size={24} />,
            color: "blue",
            link: "/login",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            {/* Logo */}
            <img
                src={imageLogo}
                alt="Siena College Tigaon Logo"
                className="w-28 h-28 mb-4"
            />

            <h1 className="text-xl font-semibold text-center">SIENA COLLEGE TIGAON</h1>
            <h2 className="text-2xl font-bold text-center mb-1">CLEARANCE PORTAL</h2>
            <p className="text-gray-600 text-center mb-8 max-w-sm">
                Secure digital clearance system for students and staff
            </p>

            {/* Cards */}
            <div className="flex flex-col gap-4 w-full max-w-md">
                {portals.map((portal) => (
                    <Link key={portal.title} to={portal.link}>
                        <Card
                            className={`
                border border-${portal.color}-200
                hover:border-${portal.color}-400
                hover:shadow-md
                transition-all duration-200
                cursor-pointer
              `}
                        >
                            <CardContent className="p-4 flex text-start gap-4">
                                <div
                                    className={`p-3 rounded-full bg-${portal.color}-100 text-${portal.color}-600`}
                                >
                                    {portal.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{portal.title}</h3>
                                    <p className="text-sm text-gray-600">{portal.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HomePage
