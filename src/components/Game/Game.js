import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import Form from "../Form";
import GuessPreview from "../GuessPreview";
import Banner from "../Banner";
import Keyboard from "../Keyboard";

function Game() {
  const [answer] = React.useState(() => sample(WORDS));
  const [guesses, setGuesses] = React.useState([]);

  React.useEffect(() => {
    console.info({ answer });
  }, [answer]);

  const correctGuess = guesses.some((guess) =>
    guess.status.every((cell) => cell.status === "correct")
  );
  const running = guesses.length < NUM_OF_GUESSES_ALLOWED && !correctGuess;

  return (
    <>
      <GuessPreview guesses={guesses} />
      <Form answer={answer} setGuesses={setGuesses} running={running} />
      <Banner
        answer={answer}
        guesses={guesses.length}
        showBanner={!running}
        status={correctGuess ? "happy" : "sad"}
      />
      <Keyboard guesses={guesses} />
    </>
  );
}

export default Game;
