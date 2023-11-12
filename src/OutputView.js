import { Console } from '@woowacourse/mission-utils';
import { MissionUtils } from '@woowacourse/mission-utils';
import { GIVEAWAY_EVENT } from './constants/EventConstants';

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

  printGiveaway(amount) {
    Console.print('<증정 메뉴>');
    if (amount >= GIVEAWAY_EVENT.APPLICABLE_AMOUNT) {
      Console.print('샴페인 1개\n\n');
    } else {
      Console.print('없음\n\n');
    }
  },

  printTotalDiscountDetail(benefitAmountList, benefitAmount) {
    Console.print('<혜택 내역>');
    if (benefitAmount === 0) {
      Console.print('없음\n\n');
    } else {
      benefitAmountList.forEach((benefit) => {
        if (benefit[1]) {
          Console.print(`${benefit[0]}: -${benefit[1]}\n`);
        }
      });
    }
    Console.print('\n');
  },

  printTotalDiscountAmount(benefitAmount) {
    Console.print('<총혜택 금액>');
    if (benefitAmount === 0) {
      Console.print(`${benefitAmount}원\n\n`);
    } else {
      Console.print(`-${benefitAmount}원\n\n`);
    }
  },

  printAmountAfterDiscount(discountAmount, amount) {
    // 할인 금액은 컨트롤러에서 계산하여 증정이벤트 비용은 뺴서 전달
    Console.print('<할인 후 예상 결제 금액>');
    Console.print(`${amount - discountAmount}원\n\n`);
  },

  printDecemberEventBadge(discountAmount) {
    Console.print('<12월 이벤트 배지>');
    if (discountAmount >= 20000) {
      Console.print('산타\n\n');
    } else if (discountAmount >= 10000) {
      Console.print('트리\n\n');
    } else if (discountAmount >= 5000) {
      Console.print('별\n\n');
    } else {
      Console.print('없음\n\n');
    }
  },
};

export default OutputView;
