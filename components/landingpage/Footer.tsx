import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
    <footer className="py-12 text-center text-gray-400 text-sm ">
        

        <div className="flex justify-center gap-6 text-lg  text-gray-500">
            <Link href="/about" className="hover:text-white">About us</Link>
            <Link href="/contribute" className="hover:text-white">Contribute</Link>
        </div>
        <p className="mt-6">© {new Date().getFullYear()} devbio. All rights reserved.</p>
    </footer>
);

export default Footer;