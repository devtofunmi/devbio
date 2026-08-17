import React from "react";
import Head from "next/head";
import AdminSidebar from "./AdminSidebar";

const AdminLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
        <Head>
            <title>{title} · DevBio Admin</title>
            <meta name="robots" content="noindex" />
        </Head>
        <AdminSidebar />
        <main className="flex-1 w-full min-w-0 relative z-10 overflow-y-auto xl:ml-80">
            {/* pb repeated per variant: Tailwind emits media-query utilities after
                unprefixed ones, so a bare pb-32 would be reset by md:p-8 */}
            <div className="max-w-6xl mx-auto p-6 pb-32 md:p-8 md:pb-32 xl:p-12 xl:pb-32">{children}</div>
        </main>
    </div>
);

export default AdminLayout;
