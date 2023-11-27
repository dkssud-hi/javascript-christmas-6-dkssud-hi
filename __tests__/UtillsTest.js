import convertAmountToString from '../src/utills/convertAmountToString';
import summarizeOrder from '../src/utills/summarizeOrder';

describe('유틸함수 테스트', () => {
  test('금액을 , 단위로 나누어 읽기 쉬운 현금표기법으로 바꿔주는 유틸함수 테스트 (convertAmountToString)', () => {
    //given
    const mockAmount = 10000000000;

    //when
    const result = convertAmountToString(mockAmount);

    //then
    expect(result).toEqual('10,000,000,000');
  });

  test('데이터 활용에 용이하게 format을 바꾸어주는 유틸함수 테스트 (summarizeOrder)', () => {
    const result = summarizeOrder('해산물파스타-2,레드와인-1,초코케이크-1');

    expect(result).toEqual([
      { name: '해산물파스타', quantity: '2' },
      { name: '레드와인', quantity: '1' },
      { name: '초코케이크', quantity: '1' },
    ]);
  });
});
