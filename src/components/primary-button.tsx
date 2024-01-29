export default function PrimaryButton({
  label,
  disabled,
  onClick,
}: Readonly<{
  label: string;
  disabled?: boolean;
  onClick: () => void;
}>) {
  const bgColor = disabled ? "bg-purple-200" : "bg-purple-700";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full text-white font-bold py-2 mt-2 rounded-xl hover:scale-105 active:scale-95 ${bgColor}`}
    >
      {label}
    </button>
  );
}
