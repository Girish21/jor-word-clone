import React from "react";

function Banner({ showBanner, status, guesses, answer }) {
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
    </div>
  );
}

export default Banner;
