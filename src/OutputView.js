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

  printTotalDiscountDetail(benefitAmountList, benefitAmount) {
    Console.print('<혜택 내역>');
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

  printTotalDiscountAmount(benefitAmountList) {
    Console.print('<총혜택 금액>');
    const benefitAmount = benefitAmountList.reduce((acc, cur) => acc + cur); // model에 저장해서 한번의 계산으로 사용
    if (benefitAmount === 0) {
      Console.print(`${benefitAmount}원\n\n`);
    }
    Console.print(`-${benefitAmount}원\n\n`);
  },

  printAmountAfterDiscount(discountAmount, amount) {
    // 할인 금액은 컨트롤러에서 계산하여 증정이벤트 비용은 뺴서 전달
    Console.print('<할인 후 예상 결제 금액>');
    Console.print(`${amount - discountAmount}원\n\n`);
  },

  printA,
};

export default OutputView;
