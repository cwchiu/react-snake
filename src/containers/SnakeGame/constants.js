
export const GAME_WRAPPER_SIZE = 600;
export const GAME_WIDTH = 30;

export const SNAKE_INITIAL_SPEED = 200;
export const SNAKE_LIMITED_SPEED = 10;
export const SNAKE_DELTA_SPEED = 2;

export const ARROW_UP = 'ArrowUp';
export const ARROW_DOWN = 'ArrowDown';
export const ARROW_LEFT = 'ArrowLeft';
export const ARROW_RIGHT = 'ArrowRight';
export const SPACE = 'Space';
export const KEYCODE_MAP = {
    32: SPACE,
    37: ARROW_LEFT,
    38: ARROW_UP,
    39: ARROW_RIGHT,
    40: ARROW_DOWN,
}
export const BACKGROUND_COLOR = '#1e1e1e';
export const DEFAULT_SNAKE = {
    headPosition: { // 蛇的頭部
        x: 0,
        y: 0,
    },
    body: [], // 記錄身體每個元素的位置
    maxLength: 2, // 紀錄目前蛇的長度，超出蛇的長度的部分，會被從body陣列中拿掉。
    direction: { // 紀錄目前蛇的方向
        x: 1,
        y: 0,
    },
    speed: SNAKE_INITIAL_SPEED, // 移動速度
};

export const DIRECTION = {
    [ARROW_UP]: { x: 0, y: -1 },
    [ARROW_DOWN]: { x: 0, y: 1 },
    [ARROW_LEFT]: { x: -1, y: 0 },
    [ARROW_RIGHT]: { x: 1, y: 0 }
  };