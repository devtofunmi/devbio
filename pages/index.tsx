import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-[#f7f9fb] flex flex-col`}>
      {/* Hero Section - Product Style */}
      <section className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white border-b border-gray-100">
        <Image src="/file.svg" alt="DevBio Logo" width={64} height={64} className="mb-6" />
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-gray-900">devbio</h1>
        <p className="text-lg sm:text-2xl text-gray-600 max-w-2xl mb-8">Your professional developer profile, all in one link. Connect, share, and grow your presence with a beautiful, customizable page.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/signup" className="inline-block rounded-full bg-blue-600 text-white px-8 py-3 font-semibold text-lg shadow hover:bg-blue-700 transition">Get Started Free</a>
          <a href="/login" className="inline-block rounded-full border border-blue-600 text-blue-600 px-8 py-3 font-semibold text-lg shadow hover:bg-blue-50 transition">Log In</a>
        </div>
        <div className="flex items-center justify-center gap-2 mt-8">
          <Image src="/globe.svg" alt="Globe" width={20} height={20} />
          <span className="text-sm text-gray-400">Trusted by 10,000+ developers</span>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 max-w-5xl mx-auto my-24">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border border-gray-100">
          <Image src="/window.svg" alt="Showcase" width={40} height={40} className="mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Professional Presence</h2>
          <p className="text-gray-500">Stand out with a personalized page that highlights your skills, projects, and achievements.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border border-gray-100">
          <Image src="/next.svg" alt="Fast" width={40} height={40} className="mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Easy Integration</h2>
          <p className="text-gray-500">Connect GitHub, LinkedIn, portfolio, and more. One link, endless possibilities.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border border-gray-100">
          <Image src="/vercel.svg" alt="Secure" width={40} height={40} className="mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Secure & Reliable</h2>
          <p className="text-gray-500">Your data is protected. Fast, reliable hosting for your profile, always online.</p>
        </div>
      </section>

      {/* Social Proof / Testimonial Section */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <div className="bg-white rounded-xl shadow p-8 border border-gray-100 flex flex-col items-center">
          <p className="text-xl text-gray-700 italic mb-4">“devbio helped me land my dream job by showcasing my work in a professional way.”</p>
          <div className="flex items-center gap-3">
            <Image src="/avatar.png" alt="User" width={40} height={40} className="rounded-full" />
            <span className="text-gray-900 font-semibold">Alex Johnson</span>
            <span className="text-gray-500 text-sm">Full Stack Developer</span>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center py-16 px-6 bg-blue-50">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Ready to grow your developer brand?</h2>
        <p className="text-lg mb-8 text-gray-600">Create your devbio profile and join thousands of developers building their online presence.</p>
        <a href="/signup" className="inline-block rounded-full bg-blue-600 text-white font-semibold px-8 py-3 text-lg shadow hover:bg-blue-700 transition">Sign Up Free</a>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm bg-white border-t border-gray-100">
        © {new Date().getFullYear()} devbio. All rights reserved.
      </footer>
    </div>
  );
}
