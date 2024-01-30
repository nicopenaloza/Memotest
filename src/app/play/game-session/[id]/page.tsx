"use client";

import { useParams } from "next/navigation";

interface IGameSessionProps {
  id: string;
  [key: string]: any;
}

export default function GameSession() {
  const { id }: IGameSessionProps = useParams<IGameSessionProps>();
  /*
  gameSession(id:1) {
    points
    game {
      name
      gameCards {
        id
        image
      }
    }
  }
  */
  return <p>124124</p>;
}
