import { GameCardSession } from "@/interfaces/game";

export default function GameCard({
  content,
  index,
  onClick,
}: {
  content: GameCardSession;
  index: number;
  onClick: (params: any) => void;
}) {
  return (
    <div
      className={`
        select-none
        card-container 
        ${(content.active || content.hidden) && "active-card"} 
        mx-5 my-10
        cursor-pointer
        transition-all
        rounded-xl
        overflow-hidden
        hover:scale-105
        hover:drop-shadow-[0_15px_15px_rgba(50,55,255,0.25)]
  `}
      onClick={() => {
        if (!content.hidden) onClick(index);
      }}
    >
      <div className="card-content">
        <div
          className="
        card-front 
        flex 
        flex-col 
        h-full 
        justify-center 
        items-center 
        bg-violet-900"
        >
          <h1 className="text-9xl font-semibold text-white">{index + 1}</h1>
        </div>
        <div className="card-back bg-custom-secondary-color text-white">
          <img
            src={content.card.image}
            alt="Card Front"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
