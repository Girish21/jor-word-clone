import React from "react";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { range } from "../../utils";

function GuessPreview({ guesses }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((i) => (
        <p key={i} className="guess">
          {range(5).map((j) => {
            const instance = guesses[i]?.status[j];
            const status = instance?.status;
            const letter = instance?.letter;

            return (
              <span key={j} className={`cell ${status ?? ""}`.trim()}>
                {letter}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

export default GuessPreview;
