import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import Form from "../Form";
import GuessPreview from "../GuessPreview";
import Banner from "../Banner";
import Keyboard from "../Keyboard";

function Game() {
  const [answer, setAnswer] = React.useState(() => sample(WORDS));
  const [guesses, setGuesses] = React.useState([]);
  const resetState = React.useRef({});

  React.useEffect(() => {
    console.info({ answer });
  }, [answer]);

  const correctGuess = guesses.some((guess) =>
    guess.status.every((cell) => cell.status === "correct")
  );
  const running = guesses.length < NUM_OF_GUESSES_ALLOWED && !correctGuess;

  const resetGame = () => {
    setGuesses((state) =>
      state.map((prevState) => ({ ...prevState, close: true }))
    );
  };

  const resetCallback = (id, value) => {
    if (!resetState.current[id]) {
      resetState.current[id] = [];
    }
    resetState.current[id] = [...resetState.current[id], value];

    if (Object.keys(resetState.current).length !== guesses.length) {
      return;
    }
    const done = Object.keys(resetState.current).every(
      (rowId) =>
        resetState.current[rowId].length === 5 &&
        resetState.current[rowId].every((status) => status)
    );
    if (done) {
      setAnswer(sample(WORDS));
      setGuesses([]);
      resetState.current = {};
    }
  };

  return (
    <>
      <GuessPreview guesses={guesses} resetCallback={resetCallback} />
      <Form answer={answer} setGuesses={setGuesses} running={running} />
      <Banner
        answer={answer}
        guesses={guesses.length}
        showBanner={!running}
        status={correctGuess ? "happy" : "sad"}
        resetGame={resetGame}
      />
      <Keyboard guesses={guesses} />
    </>
  );
}

export default Game;
