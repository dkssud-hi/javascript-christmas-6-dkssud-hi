import controllerUtills from '../utills/controllerUtills';
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
    this.#model.amount = controllerUtills.calculateTotalAmountBeforeDiscount(
      this.#model.menus
    );
  }

  setModelBenefitAmountList() {
    this.#model.benefitAmountList = controllerUtills.calculateBenefitAmountList(
      this.#model.amount,
      this.#model.date,
      this.#model.menus
    );
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
}

export default EventController;
