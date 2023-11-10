import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGE } from './constants/ErrorMessage';

const InputView = {
  async readDate() {
    const date = Number(
      await Console.readLineAsync(
        '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)'
      )
    );
    this.validateDate(date);

    return date;
  },

  validateDate(date) {
    if (date < 1 || date > 31) {
      throw new Error(ERROR_MESSAGE.OUT_OF_BOUNDS);
    }
  },

  async readOrder() {
    const order = await Console.readLineAsync(
      '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)'
    );

    return order;
  },
};

export default InputView;
