import { PRICE_OF_MENUS, CATEGORY_OF_MENUS } from '../constants/MenuInfo';
import {
  STATUS,
  CHRISMAS_D_DAY,
  GIVEAWAY_EVENT,
  EVENT,
  WEEKDAY_EVENT,
  SPECIAL_EVENT,
} from '../constants/EventConstants';

class EventController {
  calculateTotalAmountBeforeDiscount(menus) {
    let amount = 0;
    menus.forEach((menu) => {
      amount += Number(PRICE_OF_MENUS[menu.name]) * Number(menu.quantity);
    });

    return amount;
  }

  calculateBenefitAmount(amount, date, menus) {
    const benefitAmountList = [];
    benefitAmountList.push([
      '크리스마스 디데이 할인',
      this.checkChirsmasDdayEvent(date),
    ]);
    benefitAmountList.push([
      '평일 할인',
      this.checkWeekdayDiscountEvent(date, menus),
    ]);
    benefitAmountList.push([
      '주말 할인',
      this.checkWeekendDiscountEvent(date, menus),
    ]);
    benefitAmountList.push(['특별 할인', this.checkSpecialDiscountEvent(date)]);
    benefitAmountList.push(['증정 이벤트', this.checkGiveawayEvent(amount)]);

    const benefitAmount = benefitAmountList.reduce((acc, cur) => acc + cur);

    return { benefitAmount, benefitAmountList };
  }

  checkGiveawayEvent(amount) {
    if (amount >= GIVEAWAY_EVENT.APPLICABLE_AMOUNT) {
      return PRICE_OF_MENUS.샴페인;
    }
    return STATUS.NON_APPLICABLE_AMOUNT;
  }

  checkChirsmasDdayEvent(date) {
    if (date > CHRISMAS_D_DAY.EVENT_DEADLINE) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }

    return (
      CHRISMAS_D_DAY.DEFAULT_DISCOUNT +
      CHRISMAS_D_DAY.BONUS_DISCOUNT * (date - 1)
    );
  }

  checkWeekdayDiscountEvent(date, menus) {
    if (WEEKDAY_EVENT.NON_APPLICABLE_DATES.includes(date)) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }

    const discountAmount = this.calculateDayEventDiscountAmount(menus, [
      ...CATEGORY_OF_MENUS.DESSERT,
    ]);

    return discountAmount;
  }

  checkWeekendDiscountEvent(date, menus) {
    if (!WEEKDAY_EVENT.NON_APPLICABLE_DATES.includes(date)) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }

    const discountAmount = this.calculateDayEventDiscountAmount(menus, [
      ...CATEGORY_OF_MENUS.MAIN,
    ]);

    return discountAmount;
  }

  checkSpecialDiscountEvent(date) {
    if (!SPECIAL_EVENT.APPLICABLE_DATES.includes(date)) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }
    const discountAmount = 1000;
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
}

export default EventController;
