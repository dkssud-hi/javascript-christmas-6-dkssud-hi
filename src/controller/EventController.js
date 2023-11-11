import { PRICE_OF_MENUS } from '../constants/MenuInfo';
import { STATUS } from '../constants/Status';

class EventController {
  calculateTotalAmountBeforeDiscount(menus) {
    let amount = 0;
    menus.forEach((menu) => {
      amount += Number(PRICE_OF_MENUS[menu.name]) * Number(menu.quantity);
    });

    return amount;
  }

  convertAmountToString(amount) {
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
    if (amount >= 120000) {
      return STATUS.APPLICABLE;
    }
    return STATUS.NON_APPLICABLE;
  }

  checkChirsmasDdayEvent() {}
}

export default EventController;
