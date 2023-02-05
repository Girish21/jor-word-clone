import React from "react";

function Banner({ showBanner, status, guesses, answer, resetGame }) {
  if (!showBanner) {
    return null;
  }

  return (
    <div className={`banner ${status}`}>
      {status === "happy" ? (
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>{guesses} guesses</strong>.
        </p>
      ) : (
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      )}
      <button data-reset onClick={resetGame}>
        Play Again
      </button>
    </div>
  );
}

export default Banner;
