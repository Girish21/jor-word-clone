import React from "react";

const KEYBOARD = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const rank = {
  correct: [],
  misplaced: ["correct"],
  incorrect: ["correct", "misplaced"],
};

const canOverrider = (status, nextStatus) => rank[status].includes(nextStatus);

function Keyboard({ guesses }) {
  const map = React.useMemo(() => {
    const map = {};
    guesses.forEach((guess) => {
      guess.status.forEach((cell) => {
        if (map[cell.letter] && !canOverrider(map[cell.letter], cell.status)) {
          return;
        }
        map[cell.letter] = cell.status;
      });
    });

    return map;
  }, [guesses]);

  return (
    <div className="keyboard">
      {KEYBOARD.map((row, i) => (
        <div key={i} className="row">
          {row.map((letter, j) => (
            <div key={j} className={`key ${map[letter]}`.trim()}>
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
