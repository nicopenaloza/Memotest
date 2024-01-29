"use client";

import { carLogo, dogsLogo, foodLogo, kitchenLogo } from "@/assets/images";
import HomeSection from "@/components/home-section";
import PrimaryButton from "@/components/primary-button";
import WelcomeMessage from "@/components/welcome-message";
import { useRouter } from "next/navigation";

const debugGames = [
  {
    id: "afb1",
    name: "Kitchen utensils",
    image_src: kitchenLogo.src,
    imagesCount: 2,
  },
  {
    id: "afb2",
    name: "Cars",
    image_src: carLogo.src,
    imagesCount: 6,
  },
  {
    id: "afb3",
    name: "Food",
    image_src: foodLogo.src,
    imagesCount: 5,
  },
  {
    id: "afb4",
    name: "Dogs",
    image_src: dogsLogo.src,
    imagesCount: 9,
  },
];

export default function Home() {
  const router = useRouter();
  const startGame = (id: string) => {
    router.push("/play/new-game/" + id);
  };

  const resumeGame = (id: string) => {
    router.push("/play/resume-game/" + id);
  };

  return (
    <main className="flex flex-col h-screen">
      <WelcomeMessage />
      <HomeSection title="Create a new game">
        {debugGames.map((game) => (
          <div
            key={game.id}
            className="w-1/6 shadow-xl p-3 rounded-lg select-none mx-5 mb-10"
          >
            <img
              className="shadow rounded-xl mb-2"
              src={game.image_src}
              alt={game.name}
            />
            <p className="font-semibold">{game.name}</p>
            <p className="text-sm font-semibold text-neutral-800">
              Total images: {game.imagesCount}
            </p>
            <PrimaryButton label="Start Game" onClick={() => startGame(game.id)} />
          </div>
        ))}
      </HomeSection>
      <HomeSection title="Resume a previous game" loading></HomeSection>
    </main>
  );
}
