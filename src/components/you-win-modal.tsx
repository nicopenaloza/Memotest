import PrimaryButton from "./primary-button";
import Spinner from "./spinner";

export default function YouWinModal({
  score,
  onSubmit,
}: {
  score: number;
  onSubmit: () => void;
}) {
  return (
    <div className="absolute transition-all w-1/6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col justify-center items-center bg-gray-100 py-5 px-6 rounded-xl">
      <h1 className="text-2xl text-center font-bold">You Win!</h1>
      <div className="flex flex-col items-start py-5">
        {score ? (
          <p className="text-4xl text-violet-900">{score}</p>
        ) : (
          <Spinner />
        )}
      </div>
      <PrimaryButton label="Home" onClick={onSubmit} />
    </div>
  );
}
