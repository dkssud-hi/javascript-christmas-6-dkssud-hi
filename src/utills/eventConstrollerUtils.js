import { PRICE_OF_MENUS, CATEGORY_OF_MENUS } from '../constants/MenuInfo';
import {
  STATUS,
  CHRISMAS_D_DAY,
  GIVEAWAY_EVENT,
  EVENT,
  WEEKDAY_EVENT,
  SPECIAL_EVENT,
} from '../constants/EventConstants';

const controllerUtils = {
  calculateTotalAmountBeforeDiscount(menus) {
    let amount = 0;
    menus.forEach((menu) => {
      amount += Number(PRICE_OF_MENUS[menu.name]) * Number(menu.quantity);
    });

    return amount;
  },

  calculateBenefitAmount(amount, benefitAmountList) {
    const benefitAmount =
      amount < 10000
        ? 0
        : benefitAmountList.reduce((acc, cur) => acc + cur[1], 0);

    return benefitAmount;
  },

  calculateTotalDiscountAmount(amount, benefitAmount) {
    if (amount < GIVEAWAY_EVENT.APPLICABLE_AMOUNT) {
      return benefitAmount ? amount - benefitAmount : amount;
    }
    return benefitAmount
      ? amount - (benefitAmount - GIVEAWAY_EVENT.APPLICABLE_AMOUNT)
      : amount;
  },

  checkGiveawayEvent(amount) {
    if (amount >= GIVEAWAY_EVENT.APPLICABLE_AMOUNT) {
      return PRICE_OF_MENUS.샴페인;
    }
    return STATUS.NON_APPLICABLE_AMOUNT;
  },

  checkChirsmasDdayEvent(date) {
    if (date > CHRISMAS_D_DAY.EVENT_DEADLINE) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }

    return (
      CHRISMAS_D_DAY.DEFAULT_DISCOUNT +
      CHRISMAS_D_DAY.BONUS_DISCOUNT * (date - 1)
    );
  },

  calculateDayEventDiscountAmount(menus, category) {
    const discountAmount = menus.reduce((amount, menu) => {
      if (category.includes(menu.name)) {
        return (amount += EVENT.DISCOUNT * menu.quantity);
      }
      return amount;
    }, 0);

    return discountAmount;
  },

  checkWeekdayDiscountEvent(date, menus) {
    if (WEEKDAY_EVENT.NON_APPLICABLE_DATES.includes(date)) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }

    const discountAmount = this.calculateDayEventDiscountAmount(menus, [
      ...CATEGORY_OF_MENUS.DESSERT,
    ]);

    return discountAmount;
  },

  checkWeekendDiscountEvent(date, menus) {
    if (!WEEKDAY_EVENT.NON_APPLICABLE_DATES.includes(date)) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }

    const discountAmount = this.calculateDayEventDiscountAmount(menus, [
      ...CATEGORY_OF_MENUS.MAIN,
    ]);

    return discountAmount;
  },
  checkSpecialDiscountEvent(date) {
    if (!SPECIAL_EVENT.APPLICABLE_DATES.includes(date)) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }
    const discountAmount = 1000;
    return discountAmount;
  },
};

export default controllerUtils;
