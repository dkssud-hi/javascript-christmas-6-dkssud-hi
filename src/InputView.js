import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGE } from './constants/ErrorMessage';
import { ALL_MENU } from './constants/MenuInfo';

const InputView = {
  async readDate() {
    try {
      const date = Number(
        await Console.readLineAsync(
          '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)'
        )
      );
      console.log(date);
      this.validateDate(date);

      return date;
    } catch (err) {
      Console.print(err.message);
      return this.readDate();
    }
  },

  validateDate(date) {
    if (date < 1 || date > 31 || Number.isNaN(date)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_BOUNDS);
    }
  },

  async readOrder() {
    try {
      const beforSummarizedOrder = await Console.readLineAsync(
        '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)'
      );
      const summarizeOrder = this.summarizeOrder(beforSummarizedOrder);
      this.validateOrder(beforSummarizedOrder, summarizeOrder);

      return summarizeOrder;
    } catch (err) {
      Console.print(err.message);
      return this.readOrder();
    }
  },

  validateOrder(beforSummarizedOrder, summarizeOrder) {
    this.validateIsMenu(summarizeOrder);
    this.validateOrderQuantity(summarizeOrder);
    this.validateMenuFormat(beforSummarizedOrder);
    this.validateDuplicatedMenu(summarizeOrder);
  },

  validateIsMenu(summarizeOrder) {
    summarizeOrder.forEach((menu) => {
      if (!ALL_MENU.includes(menu.name)) {
        throw new Error(ERROR_MESSAGE.IS_NOT_MENU);
      }
    });
  },

  validateOrderQuantity(summarizeOrder) {
    summarizeOrder.forEach((menu) => {
      if (
        menu.quantity < 1 ||
        menu.quantity > 31 ||
        Number.isNaN(Number(menu.quantity))
      ) {
        throw new Error(ERROR_MESSAGE.NOT_VALID_ORDER_QUANTITY);
      }
    });
  },

  validateMenuFormat(beforSummarizedOrder) {
    function validate(refinedOrder) {
      const regex = /^[^\d]+-\d+$/;
      return regex.test(refinedOrder);
    }

    const refinedOrder = beforSummarizedOrder.split(',');
    if (refinedOrder.some((menu) => !validate(menu.trim()))) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_MENU_FORMAT);
    }
  },

  validateDuplicatedMenu(summarizeOrder) {
    const menus = [];
    summarizeOrder.forEach((menu) => menus.push(menu.name));
    const prevMenusLength = menus.length;
    const afterRemoveDuplication = [...new Set(menus)].length;
    if (prevMenusLength > afterRemoveDuplication) {
      throw new Error(ERROR_MESSAGE.MENU_DUPLICATION);
    }
  },

  summarizeOrder(order) {
    //utill
    const summary = order
      .split(',')
      .map((el) => el.trim())
      .map((el) => {
        const menuInfo = el.split('-');
        return { name: menuInfo[0], quantity: menuInfo[1] };
      });
    /* 
     주문 정렬 형식
     : [[{name:메뉴1, quantity:주문수}],[{name:메뉴1, quantity:주문수}], ...]
     */
    return summary;
  },
};

export default InputView;
