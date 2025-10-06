"use client";

import { useRouter } from "next/navigation";

export default function TaskFilters({
    currentFilter,
}: {
    currentFilter: string;
}) {
    const router = useRouter();

    const handleFilterChange = (filter: string) => {
        router.push(`/dashboard?filter=${filter}`);
    };

    return (
        <div className="flex justify-center space-x-4 mt-6">
            <button
                onClick={() => handleFilterChange("all")}
                className={`px-4 py-2 rounded-md ${currentFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                    }`}
            >
                All
            </button>
            <button
                onClick={() => handleFilterChange("pending")}
                className={`px-4 py-2 rounded-md ${currentFilter === "pending"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                    }`}
            >
                Pending
            </button>
            <button
                onClick={() => handleFilterChange("completed")}
                className={`px-4 py-2 rounded-md ${currentFilter === "completed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                    }`}
            >
                Completed
            </button>
        </div>
    );
}