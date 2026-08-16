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
        <main className="flex-1 w-full relative z-10 overflow-y-auto lg:ml-80">
            <div className="max-w-6xl mx-auto p-6 md:p-12 md:pb-32">{children}</div>
        </main>
    </div>
);

export default AdminLayout;
