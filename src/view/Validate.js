import { ERROR_MESSAGE } from '../constants/ErrorMessage';
import { ALL_MENU } from '../constants/MenuInfo';

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
};

export default Validate;
