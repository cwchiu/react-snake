import useInterval from "@use-it/interval";
import React, { useState } from "react";
// import useKey from 'use-key-hook';
import VirtualKeyboard from "./components/VirtualKeyboard";
import { DIRECTION, DEFAULT_SNAKE, GAME_WIDTH, SNAKE_DELTA_SPEED, SNAKE_LIMITED_SPEED, SPACE } from "./constants";
import { StyledSnakeGame } from "./Styled";

const generateBlocks = (width) => {
  const blocks = [];
  for (let h = 0; h < width; ++h) {
    const rows = [];
    for (let w = 0; w < width; ++w) {
      rows.push({
        id: w + h * width,
        x: w,
        y: h
      });
    }
    blocks.push(rows);
  }

  return blocks;
};

const generateFood = () => {
  const pos = {
    x: Math.floor(Math.random() * GAME_WIDTH),
    y: Math.floor(Math.random() * GAME_WIDTH),
  };

  return pos;
}

function SnakeGame() {

  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(true);
  const [isGameStart, setGameStart] = useState(true);
  const [snake, updateSnake] = useState(DEFAULT_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 0 });

  window._v = snake;

  const checkBound = position => {
    if (position < 0) {
      return GAME_WIDTH;
    } else if (position > GAME_WIDTH - 1) {
      return 0;
    }
    return position;
  };

  const handleOnGameStartClick = () => {
    setScore(0);
    setGameStart(true);
    updateSnake(DEFAULT_SNAKE);
    setFood(generateFood());
    setTimer(true);
  };

  const handleKeyCode = (code) => {
    if (code === SPACE) {
      setTimer(!timer);
      return;
    }

    const snake_direction = snake.direction;
    const after_direection = DIRECTION[code];
    if (!(snake_direction.x * -1 === after_direection.x && snake_direction.y * -1 === after_direection.y)) {
      // 不是反方向
      updateSnake({
        ...snake,
        direction: after_direection
      });
    }

  };

  const handleOnKBClick = (event) => {
    const code = event.currentTarget.getAttribute('data-code');
    handleKeyCode(code);
  };

  const updateGameView = (snake, block, food) => {
    const head = snake.headPosition;
    const body = snake.body;
    if (head.x === block.x && head.y === block.y) {
      return "snake-game__map-block-item snake-game__draw-snake-head";
    } else if (body.length > 0) {
      if (body.find((bodyPos) => bodyPos.x === block.x && bodyPos.y === block.y)) {
        return "snake-game__map-block-item snake-game__draw-snake-body";
      }
    }

    if (food.x === block.x && food.y === block.y) {
      return 'snake-game__draw-snake-food';
    }

    return "snake-game__map-block-item";
  };

  const blocks = generateBlocks(GAME_WIDTH);

  useInterval(() => {
    // 新的移動位置
    let head = {
      x: checkBound(snake.headPosition.x + snake.direction.x),
      y: checkBound(snake.headPosition.y + snake.direction.y)
    };

    let body = [...snake.body, {
      x: snake.headPosition.x,
      y: snake.headPosition.y
    }];


    // 修正身體長度
    if (body.length > snake.maxLength) {
      body.shift();
    }

    // 吃到自己
    if (body.find((bodyPos) => bodyPos.x === head.x && bodyPos.y === head.y)) {
      setGameStart(false);
    }

    let maxLength = snake.maxLength;
    let speed = snake.speed;

    // 吃到食物
    if (food.x === head.x && food.y === head.y) {
      maxLength += 1;
      speed = Math.max(speed - SNAKE_DELTA_SPEED, SNAKE_LIMITED_SPEED);
      setFood(generateFood())
      setScore(score + 1);
    }

    updateSnake({
      ...snake,
      headPosition: head,
      body,
      maxLength,
      speed,
    });
  }, (timer && isGameStart) ? snake.speed : null);

  // 有問題 snake 狀態無法更新
  // useKey((pressedKey, event) => {
  //   handleKeyCode(pressedKey);
  // }, {
  //   detectKeys: [32, 37, 38, 39, 40]
  // });

  return (
    <StyledSnakeGame>
      <div className="snake-game__score-info">Score: {score}</div>
      {
        !isGameStart &&
        <div className="snake-game__panel">
          <div className="snake-game__score">
            <span>Score: </span>
            <span>{score}</span>
          </div>
          <button
            className="snake-game__start-game-btn"
            onClick={handleOnGameStartClick}
          > Start</button>
        </div>
      }
      <div className="snake-game__map-wrapper">
        {blocks.map(rows =>
          rows.map(block => (
            <div className={updateGameView(snake, block, food)} key={block.id} />
          ))
        )}
      </div>
      <div data-code={SPACE} onClick={handleOnKBClick} className="snake-game__pause-game-btn">
        {
          (!timer) ? '繼續' : '暫停'
        }
      </div>
      <VirtualKeyboard handleOnClick={handleOnKBClick} />

    </StyledSnakeGame>
  );
}

export default SnakeGame;
