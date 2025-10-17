import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
    <footer className="py-12 text-center text-gray-400 text-sm bg-white border-t border-gray-100">
        

        <div className="flex justify-center gap-6 text-base text-gray-500">
            <Link href="/about" className="hover:text-gray-900">About us</Link>
            <Link href="/contribute" className="hover:text-gray-900">Contribute</Link>
        </div>
        <p className="mt-6">© {new Date().getFullYear()} devbio. All rights reserved.</p>
    </footer>
);

export default Footer;