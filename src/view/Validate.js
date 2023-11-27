import { ERROR_MESSAGE, MESSAGE } from '../constants/Message';
import { ALL_MENU, CATEGORY_OF_MENUS } from '../constants/MenuInfo';

const Validate = {
  validateDate(date) {
    if (date < 1 || date > 31 || Number.isNaN(date)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_BOUNDS);
    }
  },

  validateOrder(beforSummarizedOrder, summarizedOrder) {
    this.validateIsMenu(summarizedOrder);
    this.validateOrderQuantity(summarizedOrder);
    this.validateMenuFormat(beforSummarizedOrder);
    this.validateDuplicatedMenu(summarizedOrder);
    this.validateMenuOnlyDrink(summarizedOrder);
  },

  validateIsMenu(summarizedOrder) {
    summarizedOrder.forEach((menu) => {
      if (!ALL_MENU.includes(menu.name)) {
        throw new Error(ERROR_MESSAGE.IS_NOT_MENU);
      }
    });
  },

  validateOrderQuantity(summarizedOrder) {
    summarizedOrder.forEach((menu) => {
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

  validateDuplicatedMenu(summarizedOrder) {
    const menus = [];
    summarizedOrder.forEach((menu) => menus.push(menu.name));
    const prevMenusLength = menus.length;
    const afterRemoveDuplication = [...new Set(menus)].length;
    if (prevMenusLength > afterRemoveDuplication) {
      throw new Error(ERROR_MESSAGE.MENU_DUPLICATION);
    }
  },

  validateMenuOnlyDrink(summarizedOrder) {
    const checkMenu = summarizedOrder.filter(
      (menu) => !CATEGORY_OF_MENUS.DRINK.includes(menu.name)
    );
    if (checkMenu.length === 0) {
      throw new Error(ERROR_MESSAGE.IS_ONLY_DRINK);
    }
  },

  validateSumOfOrderQuantity(summarizedOrder) {
    const sumOfOrderQuantity = summarizedOrder.reduce(
      (acc, cur) => acc + cur.quantity,
      summarizedOrder[0].quantity
    );

    if (sumOfOrderQuantity > 20) {
      throw new Error(ERROR_MESSAGE.OVER_SUM_OF_ORDER_QUANTITY);
    }
  },
};

export default Validate;
