class EventModel {
  #date;
  #menus;
  #amount;
  #benefitAmountList;
  #benefitAmount;
  #discountAmount;

  set date(date) {
    this.#date = date;
  }

  get date() {
    return this.#date;
  }

  set menus(menus) {
    this.#menus = menus;
  }

  get menus() {
    return this.#menus;
  }

  set amount(amount) {
    this.#amount = amount;
  }

  get amount() {
    return this.#amount;
  }

  set benefitAmount(benefitAmount) {
    this.#benefitAmount = benefitAmount;
  }

  get benefitAmount() {
    return this.#benefitAmount;
  }

  set benefitAmountList(benefitAmountList) {
    this.#benefitAmountList = benefitAmountList;
  }

  get benefitAmountList() {
    return this.#benefitAmountList;
  }

  set discountAmount(discountAmount) {
    this.#discountAmount = discountAmount;
  }

  get discountAmount() {
    return this.#discountAmount;
  }
}

export default EventModel;
