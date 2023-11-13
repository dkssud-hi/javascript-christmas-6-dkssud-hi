import { Console } from '@woowacourse/mission-utils';
import Validate from './Validate';
import summarizeOrder from '../utills/summarizeOrder';

const InputView = {
  async readDate() {
    try {
      const date = Number(
        await Console.readLineAsync(
          '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)'
        )
      );
      Validate.validateDate(date);

      return date;
    } catch (err) {
      Console.print(err.message);
      return this.readDate();
    }
  },

  async readOrder() {
    try {
      const beforSummarizedOrder = await Console.readLineAsync(
        '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)'
      );
      const summarizedOrder = summarizeOrder(beforSummarizedOrder);
      Validate.validateOrder(beforSummarizedOrder, summarizedOrder);

      return summarizedOrder;
    } catch (err) {
      Console.print(err.message);
      return this.readOrder();
    }
  },
};

export default InputView;
