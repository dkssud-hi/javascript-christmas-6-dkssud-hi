import {
  BENEFIT_LIST,
  CHRISMAS_D_DAY,
  EVENT,
  GIVEAWAY_EVENT,
  SPECIAL_EVENT,
  STATUS,
  WEEKDAY_EVENT,
} from '../constants/EventConstants';
import { CATEGORY_OF_MENUS, PRICE_OF_MENUS } from '../constants/MenuInfo';
import controllerUtills from '../utills/controllerUtills';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';

class EventController {
  #model;

  constructor(model) {
    this.#model = model;
  }

  async startEvent() {
    await this.setAllDatasOfModel();

    this.printResultOfEvent();
  }

  async setAllDatasOfModel() {
    this.#model.date = await InputView.readDate();
    this.#model.menus = await InputView.readOrder();
    this.setModelAmount();
    this.setModelBenefitAmountList();
    this.setModelBenefitAmount();
    this.setModelDiscountAmount();
  }

  printResultOfEvent() {
    OutputView.printMenu(this.#model.menus, this.#model.date);
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

  setModelAmount() {
    this.#model.amount = this.calculateTotalAmountBeforeDiscount(
      this.#model.menus
    );
  }

  setModelBenefitAmountList() {
    this.#model.benefitAmountList = this.calculateBenefitAmountList();
  }

  setModelBenefitAmount() {
    this.#model.benefitAmount = controllerUtills.calculateBenefitAmount(
      this.#model.amount,
      this.#model.benefitAmountList
    );
  }

  setModelDiscountAmount() {
    this.#model.discountAmount = controllerUtills.calculateTotalDiscountAmount(
      this.#model.amount,
      this.#model.benefitAmount
    );
  }

  calculateTotalAmountBeforeDiscount() {
    let amount = 0;
    this.#model.menus.forEach((menu) => {
      amount += Number(PRICE_OF_MENUS[menu.name]) * Number(menu.quantity);
    });

    return amount;
  }

  calculateBenefitAmountList() {
    const benefitAmountList = [...BENEFIT_LIST];
    benefitAmountList[0].push(this.checkChirsmasDdayEvent());
    benefitAmountList[1].push(this.checkWeekdayDiscountEvent());
    benefitAmountList[2].push(this.checkWeekendDiscountEvent());
    benefitAmountList[3].push(this.checkSpecialDiscountEvent());
    benefitAmountList[4].push(this.checkGiveawayEvent());
    return benefitAmountList;
  }

  checkGiveawayEvent() {
    if (this.#model.amount >= GIVEAWAY_EVENT.APPLICABLE_AMOUNT) {
      return PRICE_OF_MENUS.샴페인;
    }
    return STATUS.NON_APPLICABLE_AMOUNT;
  }

  checkChirsmasDdayEvent() {
    if (this.#model.date > CHRISMAS_D_DAY.EVENT_DEADLINE) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }

    return (
      CHRISMAS_D_DAY.DEFAULT_DISCOUNT +
      CHRISMAS_D_DAY.BONUS_DISCOUNT * (this.#model.date - 1)
    );
  }

  checkWeekdayDiscountEvent() {
    if (WEEKDAY_EVENT.NON_APPLICABLE_DATES.includes(this.#model.date)) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }

    const discountAmount = this.calculateDayEventDiscountAmount(
      this.#model.menus,
      [...CATEGORY_OF_MENUS.DESSERT]
    );

    return discountAmount;
  }

  checkWeekendDiscountEvent() {
    if (!WEEKDAY_EVENT.NON_APPLICABLE_DATES.includes(this.#model.date)) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }

    const discountAmount = this.calculateDayEventDiscountAmount(
      this.#model.menus,
      [...CATEGORY_OF_MENUS.MAIN]
    );

    return discountAmount;
  }

  checkSpecialDiscountEvent() {
    if (!SPECIAL_EVENT.APPLICABLE_DATES.includes(this.#model.date)) {
      return STATUS.NON_APPLICABLE_AMOUNT;
    }
    const discountAmount = 1000;
    return discountAmount;
  }

  calculateDayEventDiscountAmount(category) {
    const discountAmount = this.#model.menus.reduce((tempAmount, menu) => {
      let amount = tempAmount;
      if (category.includes(menu.name)) {
        amount += EVENT.DISCOUNT * menu.quantity;
        return amount;
      }
      return amount;
    }, 0);

    return discountAmount;
  }
}

export default EventController;
