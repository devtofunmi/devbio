import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';

const animation = { duration: 20000, easing: (t: number) => t }

const CRACKED_DEVS = [
    {
        name: "John Doe",
        handle: "@johndoe",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/20.jpg"
    },
    {
        name: "Jane Smith",
        handle: "@janesmith",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/21.jpg"
    },
    {
        name: "Peter Jones",
        handle: "@peterjones",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/22.jpg"
    },
    {
        name: "Mary Jane",
        handle: "@maryjane",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/23.jpg"
    },
    {
        name: "Chris Lee",
        handle: "@chrislee",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/29.jpg"
    },
    {
        name: "Patricia Williams",
        handle: "@patriciawilliams",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/25.jpg"
    },
    {
        name: "Alex Costa",
        handle: "@alexcosta",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/26.jpg"
    },
    {
        name: "Emily White",
        handle: "@emilywhite",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/27.jpg"
    }
]

interface CrackedDevCardProps {
    name: string;
    handle: string;
    avatar: string;
}

const CrackedDevCard: React.FC<CrackedDevCardProps> = ({ name, handle, avatar }) => (
    <div className="relative w-64 h-64 rounded-md overflow-hidden">
        <Image
            src={avatar}
            alt={`${name}'s avatar`}
            width={160}
            height={160}
            className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
            <p className="text-white font-semibold text-sm">{name}</p>
            <p className="text-gray-300 text-xs">{handle}</p>
        </div>
    </div>
);

const CrackedDevs: React.FC = () => {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        renderMode: "performance",
        created(s) {
            s.moveToIdx(5, true, animation)
        },
        updated(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
        animationEnded(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
        slides: {
            perView: "auto",
            spacing: 30,
        },
    })
    return (
        <section className="py-20 bg-[#0a0a0a] text-white">
            <div className=" mx-auto">
                <h2 className="text-5xl font-extrabold text-center mb-12">
                    Loved by <span className="text-blue-400">Cracked Devs</span>
                </h2>
                <div ref={sliderRef} className="keen-slider">
                    {CRACKED_DEVS.map((dev, index) => (
                        <div className="keen-slider__slide" key={index} style={{ minWidth: "180px", maxWidth: "180px" }}>
                            <CrackedDevCard {...dev} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CrackedDevs;