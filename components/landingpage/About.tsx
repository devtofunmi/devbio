import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const About = () => {
    return (
        <>
            <div className=" py-16 md:py-24  flex items-center">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                        <div className="md:w-7/12 w-full">
                            <h3 className="font-bold text-4xl md:text-6xl text-white mb-3">All-in-One Link for Developers</h3>
                            <p className="text-white leading-relaxed text-xl ">
                                DevBio is the all-in-one link for developers to showcase their work, stack, and grow their personal brand. Create a beautiful, customizable page that reflects your skills and personality.
                            </p>
                        </div>
                        <div className="md:w-5/12 w-full transform transition-transform duration-500 hover:scale-105">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 w-full">
                                <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">Connect with Us</h3>
                                <div className="space-y-4 mt-4">
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FaGithub className="text-2xl text-gray-800 mr-3" />
                                            <div>
                                                <p className="font-semibold text-lg text-gray-700">Star our repo</p>
                                                <p className="text-sm text-gray-500">on GitHub</p>
                                            </div>
                                        </div>
                                        <a
                                            href="https://github.com/devtofunmi/devbio"
                                            className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-700 transition duration-150"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Star
                                        </a>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FaTwitter className="text-2xl text-blue-400 mr-3" />
                                            <div>
                                                <p className="font-semibold text-lg text-gray-700">Follow on Twitter</p>
                                                <p className="text-sm text-gray-500">@devbio</p>
                                            </div>
                                        </div>
                                        <a
                                            href="https://twitter.com/devbio"
                                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition duration-150"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Follow
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold">Why DevBio?</h3>
                            <p className="text-gray-400">
                                In a crowded digital world, developers struggle to stand out. Your GitHub profile shows your code, but what about the developer behind it? DevBio solves this by providing a single, beautiful page to showcase your projects, your skills, and your story.
                            </p>
                            <p className="text-gray-400">
                                It&apos;s more than just a link-in-bio tool it&apos;s a portfolio, and a personal brand builder, all in one.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl mt-5 font-bold">Our Mission</h3>
                            <p className="text-gray-400">
                                Our mission is to empower developers to take control of their online presence. We believe that a great presentation of your work can make a huge difference in your career. Our theme is designed to be clean, professional, and highly customizable. You can choose from a variety of themes or create your own to perfectly match your personal brand.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold">We created DevBio...</h3>
                                <p className="text-gray-400">
                                    ...because we believe developers deserve a better way to showcase their complete professional identity. While this page tells our story, your DevBio page will tell yours.
                                </p>
                                <p className="text-gray-400">
                                    What else would you like to see here? Maybe a timeline of our journey, more about the team, or a deep dive into our tech stack? Your feedback helps us grow!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
