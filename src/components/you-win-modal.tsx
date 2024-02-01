import PrimaryButton from "./primary-button";

export default function YouWinModal({
  onChange,
  onSubmit,
}: {
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="absolute transition-all -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col justify-center items-center bg-gray-100 py-5 px-6 rounded-xl">
      <h1 className="text-2xl text-center font-bold">You Win!</h1>
      <div className="flex flex-col items-start py-5">
        <label className="text-left font-semibold">Username:</label>
        <input
          onChange={(el) => onChange(el.target.value!)}
          className="rounded-lg py-1 px-2 shadow-md"
        />
      </div>
      <PrimaryButton label="Send" onClick={onSubmit}/>
    </div>
  );
}
