export default function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-60 bg-purple-800">
      <h1 className="select-none text-6xl font-bold text-center text-white">
        Welcome to the Memory Game!
      </h1>
      <p className="select-none text-xl text-center text-white">
        Match the cards to win the game.
      </p>
    </div>
  );
}
