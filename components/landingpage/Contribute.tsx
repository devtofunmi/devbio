import React from 'react';
import { GoRocket } from 'react-icons/go';
import { FaCode, FaBook, FaUsers, FaGavel } from 'react-icons/fa';
const Contribute: React.FC = () => {
    return (
        <> 
            {/* Section 1: Build with us */}
            <div className="bg-gray-800 py-16 md:py-24 flex items-center">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                        <div className="md:w-7/12 w-full">
                            <h3 className="font-bold text-4xl md:text-6xl text-white mb-3 flex items-center gap-3">
                                Build with us <GoRocket />
                            </h3>
                            <p className="text-gray-200 leading-relaxed text-xl md:text-2xl">
                                DevBio is open-source and community-driven. We welcome contributions of all kinds, from bug reports to new features. Help us build the best link-in-bio tool for developers.
                            </p>
                        </div>
                        <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 w-full">
                                <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">Get Started</h3>
                                <div className="space-y-4 mt-4">
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <p className="font-semibold text-lg text-gray-700">Report a Bug</p>
                                        <p className="text-sm text-gray-500 mb-2">Help us find and fix issues.</p>
                                        <a href="https://github.com/devtofunmi/devbio/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-center text-sm hover:bg-gray-800 transition duration-150">
                                            Create Issue
                                        </a>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <p className="font-semibold text-lg text-gray-700">Suggest a Feature</p>
                                        <p className="text-sm text-gray-500 mb-2">Have an idea? We&apos;d love to hear it.</p>
                                        <a href="https://github.com/devtofunmi/devbio/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEAT%5D" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-center text-sm hover:bg-gray-800 transition duration-150">
                                            Request Feature
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Code Contributions */}
            <div className="bg-green-500 py-16 md:py-24 min-h-screen flex items-center">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row-reverse gap-8 lg:gap-12 items-center">
                        <div className="md:w-7/12 w-full">
                            <h3 className="font-bold text-4xl md:text-6xl text-white mb-3">Ready to Write Some Code?</h3>
                            <p className="text-gray-100 leading-relaxed text-xl md:text-2xl">
                                Fork the repo, create a new branch, and submit a pull request. We appreciate all contributions, big or small.
                            </p>
                        </div>
                        <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 w-full text-center">
                                <FaCode className="text-6xl text-green-500 mx-auto mb-4" />
                                <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-4">Code Contributions</h3>
                                <a href="https://github.com/devtofunmi/devbio/pulls" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition duration-150">
                                    View Pull Requests
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Improve Documentation */}
            <div className="bg-purple-600 py-16 md:py-24 min-h-screen flex items-center">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                        <div className="md:w-7/12 w-full">
                            <h3 className="font-bold text-4xl md:text-6xl text-white mb-3">Help Us Improve Our Docs</h3>
                            <p className="text-gray-300 leading-relaxed text-xl md:text-2xl">
                                See a typo or a missing explanation? Please let us know or submit a PR to improve our documentation.
                            </p>
                        </div>
                        <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 w-full text-center">
                                <FaBook className="text-6xl text-purple-600 mx-auto mb-4" />
                                <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-4">Improve Documentation</h3>
                                <a href="https://github.com/devtofunmi/devbio/tree/main/docs" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition duration-150">
                                    View Docs
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Join the Community */}
            <div className="bg-blue-400 py-16 md:py-24 min-h-screen flex items-center">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row-reverse gap-8 lg:gap-12 items-center">
                        <div className="md:w-7/12 w-full">
                            <h3 className="font-bold text-4xl md:text-6xl text-white mb-3">Be a Part of Our Community</h3>
                            <p className="text-gray-100 leading-relaxed text-xl md:text-2xl">
                                Ask questions, share ideas, and connect with other contributors on GitHub Discussions.
                            </p>
                        </div>
                        <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 w-full text-center">
                                <FaUsers className="text-6xl text-blue-400 mx-auto mb-4" />
                                <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-4">Join the Community</h3>
                                <a href="https://github.com/devtofunmi/devbio/discussions" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition duration-150">
                                    Go to Discussions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Section 5: Code of Conduct */}
            <div className="bg-[#860005] py-16 md:py-24 min-h-screen flex items-center">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                        <div className="md:w-7/12 w-full">
                            <h3 className="font-bold text-4xl md:text-6xl text-white mb-3">Our Pledge</h3>
                            <p className="text-gray-200 leading-relaxed text-xl md:text-2xl">
                                We are committed to a welcoming and inclusive community. Please read and follow our Code of Conduct to ensure a positive environment for everyone.
                            </p>
                        </div>
                        <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 w-full text-center">
                                <FaGavel className="text-6xl text-[#860005] mx-auto mb-4" />
                                <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-4">Code of Conduct</h3>
                                <a href="https://github.com/devtofunmi/devbio/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition duration-150">
                                    Read Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default Contribute;