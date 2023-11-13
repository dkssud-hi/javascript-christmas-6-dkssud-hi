import Validate from '../src/view/Validate';

describe('입력값에 대한 유효성 검사를 하는 Validate 오브젝트 테스트', () => {
  test('입력받은 날짜가 유효한 값인지 검증하는 테스트', () => {
    //Validate.validateDate()
  });

  test('주문 수량을 올바르게 입력했는지 검증하는 테스트', () => {
    //Validate.validateOrderQuantity()
  });

  test('주문한 메뉴가 존재하는 메뉴인지 검증하는 테스트', () => {
    // Validate.validateIsMenu()
  });

  test('올바른 형식으로 주문을 했는지 검증하는 테스트', () => {
    // Validate.validateMenuFormat()
  });

  test('중복된 메뉴를 입력해였는지 검증하는 테스트', () => {
    // Validate.validateDuplicatedMenu()
  });
});
