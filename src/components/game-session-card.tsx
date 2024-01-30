import { GameSession } from "@/interfaces/game";

export default function GameSessionCard({ session }: { session: GameSession }) {
  return <div className="
  w-4/5
  border-b-2 
  shadow-md 
  py-5
  ">{session.game.name}</div>;
}
