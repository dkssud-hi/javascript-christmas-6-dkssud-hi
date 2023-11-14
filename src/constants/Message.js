const PREFIX = '[ERROR]';

export const ERROR_MESSAGE = Object.freeze({
  OUT_OF_BOUNDS: `${PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
  IS_NOT_MENU: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  NOT_VALID_ORDER_QUANTITY: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  NOT_VALID_MENU_FORMAT: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  MENU_DUPLICATION: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
});

export const MESSAGE = Object.freeze({
  EVENT_INFO:
    '[ 이벤트 안내사항 ]\n- 총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.\n- 음료만 주문 시, 주문이 불가합니다, 양해 부탁드립니다.\n- 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.\n(e.g. 시저샐러드-1, 티본스테이크-1, 크리스마스파스타-1, 제로콜라-3, 아이스크림-1의 총개수는 7개)\n\n',
});
