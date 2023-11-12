import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(menus) {
    Console.print('<주문 메뉴>');
    menus.forEach((menu) => {
      Console.print(`${menu.name} ${menu.quantity}개`);
    });

    Console.print('\n\n');
  },

  printTotalAmountBeforeDiscount(amount) {
    Console.print('<할인 전 총주문 금액>');
    Console.print(`${amount}원`);
  },

  printTotalDiscountDetail(benefitAmountList) {
    Console.print('<혜택 내역>');
    const benefitAmount = benefitAmountList.reduce((acc, cur) => acc + cur);
    if (benefitAmount === 0) {
      Console.print('없음\n\n');
      return;
    }

    benefitAmountList.forEach((benefit) => {
      if (benefit[1]) {
        Console.print(`${benefit[0]}: -${benefit[1]}`);
      }
    });
    Console.print('\n\n');
  },
};

export default OutputView;
