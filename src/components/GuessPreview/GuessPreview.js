import { animated, useTrail } from "@react-spring/web";
import React from "react";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { range } from "../../utils";

const GUESSES = range(NUM_OF_GUESSES_ALLOWED);
const CELLS = range(5);

function RowImpl({ children }) {
  return <div className="guess">{children}</div>;
}
const Row = React.memo(RowImpl);

function CellImpl({ instance, style, ...rest }) {
  const status = instance?.status;
  const letter = instance?.letter;

  return (
    <animated.span {...rest} className={`cell ${status ?? ""}`.trim()}>
      <animated.span
        style={{ rotateX: style.rotateX.to((x) => 180 - x) }}
        className={`back-face ${status ?? ""}`.trim()}
      >
        {letter}
      </animated.span>
      <animated.span
        style={{ rotateX: style.rotateX.to((x) => x) }}
        className="front-face"
      />
    </animated.span>
  );
}
const Cell = React.memo(CellImpl);

function CellsImpl({ status }) {
  const revealed = React.useRef(false);
  const [trails, api] = useTrail(status.length, () => ({
    rotateX: 0,
    config: {
      tension: 400,
      friction: 30,
    },
  }));

  React.useEffect(() => {
    if (!revealed.current && typeof status?.[0] !== "number") {
      api.start({ rotateX: 180 });
      revealed.current = true;
    }
  }, [api, status]);

  return trails.map((style, i) => (
    <Cell key={i} style={style} instance={status?.[i]} />
  ));
}
const Cells = React.memo(CellsImpl);

function GuessPreview({ guesses }) {
  return (
    <div className="guess-results">
      {GUESSES.map((i) => (
        <Row key={i}>
          <Cells status={guesses[i]?.status ?? CELLS} />
        </Row>
      ))}
    </div>
  );
}

export default GuessPreview;
