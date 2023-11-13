import Validate from '../src/view/Validate';
import { ERROR_MESSAGE } from '../src/constants/ErrorMessage';
import summarizeOrder from '../src/utills/summarizeOrder';
import { ALL_MENU } from '../src/constants/MenuInfo';

const mockSummarizedOrder =
  describe('입력값에 대한 유효성 검사를 하는 Validate 오브젝트 테스트', () => {
    test('입력받은 날짜에 대한 유효성 검사가 올바르게 작동하는지 테스트', () => {
      //given
      const mockDate = ['-1', 'a', '잘못된입력'];

      //when
      mockDate.forEach((invalid) => {
        expect(() => {
          Validate.validateDate(Number(invalid));
        }).toThrow(ERROR_MESSAGE.OUT_OF_BOUNDS);
      });
    });

    test('주문 수량을 올바르게 입력했는지 검증하는 테스트', () => {
      //given
      const mockInput = '티본스테이크-0,양송이수프-1,제로콜라-a';
      const mockSummarizedOrder = summarizeOrder(mockInput);

      //when
      expect(() => {
        //then
        Validate.validateOrderQuantity(mockSummarizedOrder);
      }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER_QUANTITY);
    });

    test('주문한 메뉴가 존재하는 메뉴인지 검증하는 테스트', () => {
      //given
      const mockInput = '피자-1,삼겹살-2';
      const mockSummarizedOrder = summarizeOrder(mockInput);

      //when
      expect(() => {
        //then
        Validate.validateIsMenu(mockSummarizedOrder);
      }).toThrow(ERROR_MESSAGE.IS_NOT_MENU);
    });

    test('올바른 형식으로 주문을 했는지 검증하는 테스트', () => {
      //given
      const mockInput = '양송이수프=2,제로콜라%3';

      //when
      expect(() => {
        //then
        Validate.validateMenuFormat(mockInput);
      }).toThrow(ERROR_MESSAGE.NOT_VALID_MENU_FORMAT);
    });

    test('중복된 메뉴를 입력해였는지 검증하는 테스트', () => {
      //given
      const mockInput = '양송이수프-1,양송이수프-2';
      const mockSummarizedOrder = summarizeOrder(mockInput);

      //when
      expect(() => {
        //then
        Validate.validateDuplicatedMenu(mockSummarizedOrder);
      }).toThrow(ERROR_MESSAGE.MENU_DUPLICATION);
    });
  });