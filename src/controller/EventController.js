import controllerUtils from '../utills/eventConstrollerUtils';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';

class EventController {
  #model;

  constructor(model) {
    this.#model = model;
  }

  async startEvent() {
    await this.manufactureDataOfModel();

    this.printResultOfEvent();
  }

  async manufactureDataOfModel() {
    this.#model.date = await InputView.readDate();
    this.#model.menus = await InputView.readOrder();
    this.setModelAmount();
    this.setModelBenefitAmountList();
    this.setModelBenefitAmount();
    this.setModelDiscountAmount();
  }

  setModelAmount() {
    this.#model.amount = controllerUtils.calculateTotalAmountBeforeDiscount(
      this.#model.menus
    );
  }

  setModelBenefitAmountList() {
    this.#model.benefitAmountList = this.calculateBenefitAmountList(
      this.#model.amount,
      this.#model.date,
      this.#model.menus
    );
  }

  setModelBenefitAmount() {
    this.#model.benefitAmount = controllerUtils.calculateBenefitAmount(
      this.#model.amount,
      this.#model.benefitAmountList
    );
  }

  setModelDiscountAmount() {
    this.#model.discountAmount = controllerUtils.calculateTotalDiscountAmount(
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

  calculateBenefitAmountList(amount, date, menus) {
    const benefitAmountList = [
      ['크리스마스 디데이 할인'],
      ['평일 할인'],
      ['주말 할인'],
      ['특별 할인'],
      ['증정 이벤트'],
    ];
    benefitAmountList[0].push(controllerUtils.checkChirsmasDdayEvent(date));
    benefitAmountList[1].push(
      controllerUtils.checkWeekdayDiscountEvent(date, menus)
    );
    benefitAmountList[2].push(
      controllerUtils.checkWeekendDiscountEvent(date, menus)
    );
    benefitAmountList[3].push(controllerUtils.checkSpecialDiscountEvent(date));
    benefitAmountList[4].push(controllerUtils.checkGiveawayEvent(amount));
    return benefitAmountList;
  }
}

export default EventController;
