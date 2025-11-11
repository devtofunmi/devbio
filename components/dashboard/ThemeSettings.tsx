import React, { useState } from 'react';

const themes = [
  { id: 'basics', name: 'Basics', preview: 'bg-white shadow-inner border border-gray-200' },
  { id: 'carbon', name: 'Carbon', preview: 'bg-gray-900' },
  { id: 'monokai', name: 'Monokai', preview: 'bg-gradient-to-br from-[#272822] via-[#49483e] to-[#f92672] border border-[#f8f8f2]' },
  { id: 'dracula', name: 'Dracula', preview: 'bg-gradient-to-br from-[#282a36] via-[#44475a] to-[#bd93f9] border border-[#6272a4]' },
  { id: 'nord', name: 'Nord', preview: 'bg-gradient-to-br from-[#2e3440] via-[#4c566a] to-[#88c0d0] border border-[#81a1c1]' },
  { id: 'gruvbox', name: 'Gruvbox', preview: 'bg-gradient-to-br from-[#282828] via-[#504945] to-[#fabd2f] border border-[#b8bb26]' },
  { id: 'one-dark', name: 'One Dark', preview: 'bg-gradient-to-br from-[#282c34] via-[#3a3f4b] to-[#61afef] border border-[#98c379]' },
  { id: 'github-dark', name: 'GitHub Dark', preview: 'bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#238636] border border-[#30363d]' },
  { id: 'solarized-dark', name: 'Solarized Dark', preview: 'bg-gradient-to-br from-[#002b36] via-[#073642] to-[#b58900] border border-[#586e75]' },
  { id: 'christmas', name: 'Christmas', preview: 'bg-green-700' },
  { id: 'pride', name: 'Pride', preview: 'bg-gradient-to-b from-pink-500 via-yellow-400 to-green-500' },
  { id: 'winter', name: 'Winter', preview: 'bg-gradient-to-b from-blue-100 to-blue-300' },
  { id: 'chameleon', name: 'Chameleon', preview: 'bg-gradient-to-tr from-green-500 to-lime-400' },
  { id: 'rainy-night', name: 'Rainy Night', preview: 'bg-gradient-to-b from-gray-800 via-blue-900 to-gray-800' },
];

const ThemeSettings = () => {
    const [selectedTheme, setSelectedTheme] = useState('basics');

    return (
        <section className="bg-white rounded-lg md:border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${selectedTheme === theme.id ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
                            }`}
                    >
                        <div className={`w-full h-36 rounded-2xl mb-3 flex items-center justify-center ${theme.preview}`}>
                            <div className="flex flex-col gap-2 w-2/3">
                                <div className="h-4 rounded-full bg-white/80" />
                                <div className="h-4 rounded-full bg-white/80" />
                                <div className="h-4 rounded-full bg-white/80" />
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-800">{theme.name}</p>
                    </button>
                ))}
            </div>
        </section>
    )
}

export default ThemeSettings;