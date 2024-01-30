export default function GameCard({
  card,
  index,
  onClick,
}: {
  card: any;
  index: number;
  onClick: (params: any) => void;
}) {
  return (
    <div
      className={`
        flip-card 
        ${(card.active || card.hidden) && "active-card"} 
        mx-5 my-10
        cursor-pointer
        transition-all
        rounded-xl
        overflow-hidden
        hover:scale-105
        hover:drop-shadow-[0_15px_15px_rgba(50,55,255,0.25)]
  `}
      onClick={() => {
        if (!card.hidden) onClick(index);
      }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front flex flex-col h-full justify-center items-center bg-violet-900">
          <h1 className="text-9xl font-semibold text-white">{index + 1}</h1>
        </div>
        <div className="flip-card-back bg-custom-secondary-color text-white">
          <img
            src={card.image}
            alt="Card Front"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
