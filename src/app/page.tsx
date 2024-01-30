"use client";

import GameSessionsSection from "@/components/game-sessions";
import GamesSection from "@/components/games-section";
import WelcomeMessage from "@/components/welcome-message";

export default function Home() {
  return (
    <main>
      <WelcomeMessage />
      <GamesSection />
      <GameSessionsSection />
    </main>
  );
}
