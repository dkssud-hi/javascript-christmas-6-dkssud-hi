import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/Message';
import Validate from './Validate';
import summarizeOrder from '../utills/summarizeOrder';

const InputView = {
  async readDate() {
    try {
      const date = Number(await Console.readLineAsync(MESSAGE.GREET_USER));
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
        `${MESSAGE.EVENT_INFO}${MESSAGE.MENU_INFO}`
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
