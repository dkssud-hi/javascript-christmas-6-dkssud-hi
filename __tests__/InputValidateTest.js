import Validate from '../src/view/Validate';
import { ERROR_MESSAGE } from '../src/constants/Message';
import summarizeOrder from '../src/utills/summarizeOrder';

describe('입력값에 대한 유효성 검사를 하는 Validate 객체 테스트', () => {
  test('유효하지 않은 날짜 입력에 대한 예외처리', () => {
    //given
    const mockDate = ['-1', 'a', '잘못된입력'];

    //when
    mockDate.forEach((invalid) => {
      expect(() => {
        Validate.validateDate(Number(invalid));
      }).toThrow(ERROR_MESSAGE.OUT_OF_BOUNDS);
    });
  });

  test('올바르지 않은 주문 수량 입력에 대한 예외처리', () => {
    //given
    const mockInput = '티본스테이크-0,양송이수프-1,제로콜라-a';
    const mockSummarizedOrder = summarizeOrder(mockInput);

    //when
    expect(() => {
      //then
      Validate.validateOrderQuantity(mockSummarizedOrder);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER_QUANTITY);
  });

  test('존재하지 않은 메뉴 주문에 대한 예외처리', () => {
    //given
    const mockInput = '피자-1,삼겹살-2';
    const mockSummarizedOrder = summarizeOrder(mockInput);

    //when
    expect(() => {
      //then
      Validate.validateIsMenu(mockSummarizedOrder);
    }).toThrow(ERROR_MESSAGE.IS_NOT_MENU);
  });

  test('올바르지 않은 주문 형식 입력에 애한 예외처리', () => {
    //given
    const mockInput = '양송이수프=2,제로콜라%3';

    //when
    expect(() => {
      //then
      Validate.validateMenuFormat(mockInput);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_MENU_FORMAT);
  });

  test('중복된 메뉴 입력에 대한 예외처리', () => {
    //given
    const mockInput = '양송이수프-1,양송이수프-2';
    const mockSummarizedOrder = summarizeOrder(mockInput);

    //when
    expect(() => {
      //then
      Validate.validateDuplicatedMenu(mockSummarizedOrder);
    }).toThrow(ERROR_MESSAGE.MENU_DUPLICATION);
  });

  test('음료만 주문했을경우에 대한 예외처리', () => {
    //given
    const mockInput = '제로콜라-1,레드와인-2';
    const mockSummarizedOrder = summarizeOrder(mockInput);

    //when
    expect(() => {
      //then
      Validate.validateMenuOnlyDrink(mockSummarizedOrder);
    }).toThrow(ERROR_MESSAGE.IS_ONLY_DRINK);
  });

  test('제한된 주문 수량을 주문 했을 때에 대한 예외처리', () => {
    //given
    const mockInput =
      '제로콜라-1,레드와인-2,티본스테이크-10,크리스마스파스타-10';
    const mockSummarizedOrder = summarizeOrder(mockInput);

    //when
    expect(() => {
      //then
      Validate.validateSumOfOrderQuantity(mockSummarizedOrder);
    }).toThrow(ERROR_MESSAGE.OVER_SUM_OF_ORDER_QUANTITY);
  });
});
