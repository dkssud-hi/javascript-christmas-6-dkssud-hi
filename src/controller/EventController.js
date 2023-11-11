import { PRICE_OF_MENUS, CATEGORY_OF_MENUS } from '../constants/MenuInfo';
import {
  STATUS,
  CHRISMAS_D_DAY,
  GIVEAWAY_EVENT,
  EVENT,
  WEEKDAY_EVENT,
} from '../constants/EventConstants';

class EventController {
  calculateTotalAmountBeforeDiscount(menus) {
    let amount = 0;
    menus.forEach((menu) => {
      amount += Number(PRICE_OF_MENUS[menu.name]) * Number(menu.quantity);
    });

    return amount;
  }

  convertAmountToString(amount) {
    //utill
    const stringAmount = String(amount);
    const insertPoint = 3;
    let countPoint = 0;
    const convertToArray = [];

    [...stringAmount].reverse().forEach((syllable) => {
      convertToArray.push(syllable);
      countPoint += 1;

      if (countPoint === insertPoint) {
        convertToArray.push(',');
        countPoint = 0;
      }
    });

    return convertToArray.reverse().join('');
  }

  checkGiveawayEvent(amount) {
    if (amount >= GIVEAWAY_EVENT.APPLICABLE_AMOUNT) {
      return STATUS.APPLICABLE;
    }
    return STATUS.NON_APPLICABLE;
  }

  checkChirsmasDdayEvent(date) {
    if (date > CHRISMAS_D_DAY.EVENT_DEADLINE) {
      return STATUS.NON_APPLICABLE;
    }

    return (
      CHRISMAS_D_DAY.DEFAULT_DISCOUNT +
      CHRISMAS_D_DAY.BONUS_DISCOUNT * (date - 1)
    );
  }

  checkWeekdayDiscountEvent(date, menus) {
    if (WEEKDAY_EVENT.NON_APPLICABLE_DATES.includes(date)) {
      return STATUS.NON_APPLICABLE;
    }

    const discountAmount = this.calculateDayEventDiscountAmount(menus, [
      ...CATEGORY_OF_MENUS.DESSERT,
    ]);

    return discountAmount;
  }

  checkWeekendDiscountEvent(date, menus) {
    if (!WEEKDAY_EVENT.NON_APPLICABLE_DATES.includes(date)) {
      return STATUS.NON_APPLICABLE;
    }

    const discountAmount = this.calculateDayEventDiscountAmount(menus, [
      ...CATEGORY_OF_MENUS.MAIN,
    ]);

    return discountAmount;
  }

  calculateDayEventDiscountAmount(menus, category) {
    // utill
    const discountAmount = menus.reduce((amount, menu) => {
      if (category.includes(menu.name)) {
        return (amount += EVENT.DISCOUNT * menu.quantity);
      }
      return amount;
    }, 0);

    return discountAmount;
  }
}

export default EventController;
