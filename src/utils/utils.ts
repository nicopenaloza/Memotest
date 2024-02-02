import client from "@/graphql/apollo-client";
import {
  END_GAME_SESSION,
  GET_GAME_SESSION,
  MAKE_AN_ATTEMPT,
  MATCH_CARD,
} from "@/graphql/game-session.graphql";
import { GameCardSession, GameSession } from "@/interfaces/game";

export const turnCard = (
  actionsBlocked: boolean,
  currentCards: GameCardSession[],
  setAttempts: (args: number) => void,
  setCurrentCards: (args: GameCardSession[]) => void,
  attempts: number,
  makeAnAttempt: () => void,
  validateState: () => void,
  sessionId: string | string[],
  index: number
) => {
  if (!actionsBlocked) {
    let newCards = [...currentCards];
    const currentCard = newCards[index];

    let previousCardIndex = -1;
    const previousCard = newCards.find((card: any, index: number) => {
      if (card.active) {
        previousCardIndex = index;
        return true;
      }
    });

    if (previousCard && previousCardIndex !== index) {
      if (previousCard.card.id === currentCard.card.id) {
        newCards[index].hidden = true;
        newCards[previousCardIndex].hidden = true;
        newCards[index].active = false;
        newCards[previousCardIndex].active = false;
        validateState();
        matchPair(currentCard.card.id, sessionId);
      } else {
        newCards = newCards.map((card: any) => ({ ...card, active: false }));
        newCards[index].active = true;
      }

      makeAnAttempt();
      setAttempts(attempts + 1);
    } else {
      newCards[index].active = !newCards[index].active;
    }

    setCurrentCards(newCards);
  }
};

export const retrieveSessionInfo = async (
  id: string | string[],
  callback: (args: GameSession) => void
) => {
  const { data }: { data: { retrieveGameSession: GameSession } } =
    await client.query({
      query: GET_GAME_SESSION,
      variables: { id: id },
    });
  callback(data?.retrieveGameSession);
};

export const endSession = async (
  id: string | string[],
  callback: (args: GameSession) => void
) => {
  const { data } = await client.mutate({
    mutation: END_GAME_SESSION,
    variables: { id: id },
  });
  callback(data?.endGameSession);
};

export const makeAttempt = async (id?: string | string[]) => {
  await client.mutate({
    mutation: MAKE_AN_ATTEMPT,
    variables: {
      id: id,
    },
  });
};

export const matchPair = async (
  card_id: number,
  session_id: string | string[]
) => {
  await client.mutate({
    mutation: MATCH_CARD,
    variables: {
      card_id: card_id,
      session_id: session_id,
    },
  });
};
