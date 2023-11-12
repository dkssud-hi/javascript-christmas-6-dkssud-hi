const PREFIX = '[ERROR]';

export const ERROR_MESSAGE = Object.freeze({
  OUT_OF_BOUNDS: `${PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
  IS_NOT_MENU: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  NOT_VALID_ORDER_QUANTITY: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  NOT_VALID_MENU_FORMAT: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  MENU_DUPLICATION: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
});
