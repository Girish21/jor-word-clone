import React from "react";
import { checkGuess } from "../../game-helpers";

function Form({ setGuesses, answer, running }) {
  const submitHandler = (e) => {
    e.preventDefault();
    const guess = e.target.guess.value;
    setGuesses((guesses) => [
      ...guesses,
      { guess, status: checkGuess(guess, answer), id: crypto.randomUUID() },
    ]);
    e.target.reset();
  };

  return (
    <form className="guess-input-wrapper" onSubmit={submitHandler}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        disabled={!running}
        id="guess-input"
        type="text"
        name="guess"
        required
        pattern="[A-Z]{5}"
        minLength={5}
        maxLength={5}
        onChange={(e) => {
          e.currentTarget.value = e.currentTarget.value.toUpperCase();
        }}
      />
    </form>
  );
}

export default Form;
