import {normalizeSpaces12} from './index';

it('should normalize spaces', () => {
  expect(normalizeSpaces12('   hello     \n\n\n   \n \n \t world   ')).toEqual('hello world');
});
