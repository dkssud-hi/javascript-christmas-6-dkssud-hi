import { PRICE_OF_MENUS } from '../constants/MenuInfo';
import { STATUS, CHRISMAS_D_DAY } from '../constants/EventConstants';

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

  checkChirsmasDdayEvent(date) {
    if (date > 25) {
      return STATUS.NON_APPLICABLE;
    }

    return (
      CHRISMAS_D_DAY.DEFAULT_DISCOUNT +
      CHRISMAS_D_DAY.BONUS_DISCOUNT * (date - 1)
    );
  }
}

export default EventController;
