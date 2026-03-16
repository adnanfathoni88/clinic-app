import Sidebar from "@/src/features/public/components/Sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-[#161B21] text-white scheme-dark">

            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <main className="flex-1 py-8 px-12">
                {children}
            </main>

        </div>
    )
}