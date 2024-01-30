import { Game, GameSession } from "@/interfaces/game";
import { useRouter } from "next/navigation";
import PrimaryButton from "./primary-button";
import client from "@/graphql/apollo-client";
import { CREATE_GAME_SESSION } from "@/graphql/game-session.graphql";

export function ListItem({
  game,
  session,
}: {
  game?: Game;
  session?: GameSession;
}) {
  const router = useRouter();

  const startGame = async () => {
    const { data } = await client.mutate({
      mutation: CREATE_GAME_SESSION,
      variables: { id: game?.id },
    });
    router.push("/play/game-session/" + data?.createGameSession?.id);
  };

  const resumeGame = async () => {
    router.push("/play/game-session/" + session?.id);
  };

  return (
    <div
      key={game?.id ?? session?.id}
      className="
      shadow-xl 
      p-3 
      rounded-lg 
      select-none 
      mx-5 
      mb-10 
      aspect-w-2 
      aspect-h-4 
      h-64
      flex 
      flex-col 
      justify-between
      "
    >
      <div
        className="
      shadow 
      h-2/3 
      rounded-xl 
      overflow-hidden 
      flex 
      flex-row 
      justify-center 
      items-center
      "
      >
        <img
          src={game?.image ?? session?.game?.image}
          alt={game?.name ?? session?.game?.name}
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="font-semibold">
          {game?.name ?? session?.game?.name}{" "}
          {session?.id && (
            <span className="text-xs">({session?.updated_at})</span>
          )}
        </p>
        <PrimaryButton
          label={session ? "Resume Game" : "Start Game"}
          onClick={() => (game?.id ? startGame() : resumeGame())}
        />
      </div>
    </div>
  );
}
