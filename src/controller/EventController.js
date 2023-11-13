import { PRICE_OF_MENUS, CATEGORY_OF_MENUS } from '../constants/MenuInfo';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import {
  STATUS,
  CHRISMAS_D_DAY,
  GIVEAWAY_EVENT,
  EVENT,
  WEEKDAY_EVENT,
  SPECIAL_EVENT,
} from '../constants/EventConstants';

class EventController {
  #model;

  constructor(model) {
    this.#model = model;
  }

  async startEvent() {
    this.#model.date = await InputView.readDate();
    this.#model.menus = await InputView.readOrder();
    this.manufactureDataOfModel();

    this.printResultOfEvent();
  }

  manufactureDataOfModel() {
    this.#model.amount = this.calculateTotalAmountBeforeDiscount(
      this.#model.menus
    );
    this.#model.benefitAmountList = this.calculateBenefitAmountList(
      this.#model.amount,
      this.#model.date,
      this.#model.menus
    );
    this.#model.benefitAmount = this.calculateBenefitAmount(
      this.#model.amount,
      this.#model.benefitAmountList
    );
    this.#model.discountAmount = this.calculateTotalDiscountAmount(
      this.#model.amount,
      this.#model.benefitAmount
    );
  }

  printResultOfEvent() {
    OutputView.printMenu(this.#model.menus);
    OutputView.printTotalAmountBeforeDiscount(this.#model.amount);
    OutputView.printGiveaway(this.#model.amount);
    OutputView.printTotalDiscountDetail(
      this.#model.benefitAmountList,
      this.#model.benefitAmount
    );
    OutputView.printTotalDiscountAmount(this.#model.benefitAmount);
    OutputView.printAmountAfterDiscount(
      this.#model.discountAmount,
      this.#model.amount
    );
    OutputView.printDecemberEventBadge(this.#model.discountAmount);
  }

  calculateTotalAmountBeforeDiscount(menus) {
    let amount = 0;
    menus.forEach((menu) => {
      amount += Number(PRICE_OF_MENUS[menu.name]) * Number(menu.quantity);
    });

    return amount;
  }

  calculateBenefitAmountList(amount, date, menus) {
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

    return benefitAmountList;
  }

  calculateBenefitAmount(amount, benefitAmountList) {
    const benefitAmount =
      amount < 10000
        ? 0
        : benefitAmountList.reduce((acc, cur) => acc + cur[1], 0);

    return benefitAmount;
  }

  calculateTotalDiscountAmount(amount, benefitAmount) {
    if (amount < GIVEAWAY_EVENT.APPLICABLE_AMOUNT) {
      return benefitAmount ? amount - benefitAmount : amount;
    }
    return benefitAmount
      ? amount - (benefitAmount - GIVEAWAY_EVENT.APPLICABLE_AMOUNT)
      : amount;
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
