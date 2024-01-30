import { Game } from "@/interfaces/game";
import { useRouter } from "next/navigation";
import PrimaryButton from "./primary-button";
import client from "@/graphql/apollo-client";
import { CREATE_GAME_SESSION } from "@/graphql/game-session.graphql";

export function GameCard({ game }: { game: Game }) {
  const router = useRouter();

  const startGame = async (id: string) => {
    const { data } = await client.mutate({
      mutation: CREATE_GAME_SESSION,
      variables: { id: id },
    });
    router.push("/play/game-session/" + data?.createGameSession?.id);
  };

  return (
    <div
      key={game.id}
      className="shadow-xl p-3 rounded-lg select-none mx-5 mb-10 aspect-w-2 aspect-h-4 flex flex-col justify-between"
    >
      <div className="shadow h-2/3 rounded-xl overflow-hidden flex flex-row justify-center items-center">
        <img
          src={game.image}
          alt={game.name}
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="font-semibold">{game.name}</p>
        <PrimaryButton label="Start Game" onClick={() => startGame(game.id)} />
      </div>
    </div>
  );
}
