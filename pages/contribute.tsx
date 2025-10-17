import { GoRocket  } from 'react-icons/go';
import { SiGithub } from 'react-icons/si';

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const Contribute: React.FC = () => {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-gray-50 p-8 sm:p-12 md:p-16`}>
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:gap-8">
          {/* Left Column */}
          <div className="lg:w-1/3 lg:fixed lg:top-16 lg:h-screen lg:overflow-y-auto">
            <div className="flex flex-col items-start space-y-4">
              <div className="bg-blue-400 h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-50 lg:w-50 rounded-full"></div>
              <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
                Build with us <GoRocket />
              </h1>
              <p className="text-2xl text-gray-600 max-w-sm">
                DevBio is open-source and community-driven. We welcome contributions of all kinds, from bug reports to new features. Help us build the best link-in-bio tool for developers.
              </p>
              <div className="flex items-center space-x-4 pt-4 mb-16">
                <a
                  href="https://github.com/devtofunmi/devbio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 cursor-pointer text-white font-semibold bg-blue-400 rounded-xl shadow-lg hover:bg-blue-500 transition duration-150 flex items-center gap-2"
                >
                  <SiGithub /> View on GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:w-1/3"></div>

          {/* Right side content (Middle and Right columns) */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 lg:mt-0">
            {/* Middle Column */}
            <div className="md:col-span-1 space-y-8">
              {/* Card: Report a Bug */}
              <div tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
                <div className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
                  <div className="flex items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Report a Bug</h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Found something that isn&apos;t working as expected? Create a detailed issue on GitHub so we can fix it.
                  </p>
                  <a href="https://github.com/devtofunmi/devbio/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition duration-150">
                    Create Issue
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card: Code Contributions */}
              <div tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
                <div className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
                  <div className="flex items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Code Contributions</h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Ready to write some code? Fork the repo, create a new branch, and submit a pull request. We appreciate all contributions, big or small.
                  </p>
                  <a href="https://github.com/devtofunmi/devbio/pulls" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition duration-150">
                    View Pull Requests
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card: Code of Conduct */}
              <div tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
                <div className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
                  <div className="flex items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Code of Conduct</h2>
                  </div>
                  <p className="text-gray-600">
                    We are committed to a welcoming and inclusive community. Please read and follow our Code of Conduct to ensure a positive environment for everyone.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-1 space-y-8">
              {/* Card: Suggest a Feature */}
              <div tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
                <div className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
                  <div className="flex items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Suggest a Feature</h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Have a great idea for a new feature? We&apos;d love to hear it. Open an issue to start a discussion with the community.
                  </p>
                  <a href="https://github.com/devtofunmi/devbio/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEAT%5D" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition duration-150">
                    Request Feature
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card: Improve Documentation */}
              <div tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
                <div className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
                  <div className="flex items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Improve Documentation</h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Good documentation is key. If you see a typo, a missing explanation, or an area for improvement, please let us know or submit a PR.
                  </p>
                  <a href="https://github.com/devtofunmi/devbio/tree/main/docs" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition duration-150">
                    View Docs
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card: Join the Community */}
              <div tabIndex={0} className="relative group transition-transform duration-300 ease-in-out hover:-rotate-2 focus:-rotate-2 rounded-2xl overflow-hidden">
                <div className="relative bg-white rounded-2xl p-6 shadow-xl group-hover:shadow-none transition-shadow border border-gray-200 w-full h-full">
                  <div className="flex items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Join the Community</h2>
                  </div>
                  <p className="text-gray-600">
                    Join our community on GitHub Discussions to ask questions, share ideas, and connect with other contributors.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;