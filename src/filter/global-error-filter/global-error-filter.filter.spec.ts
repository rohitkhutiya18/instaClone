import { describe, it } from 'node:test';
import { GlobalErrorFilter } from './global-error-filter';

describe('GlobalErrorFilterFilter', () => {
  it('should be defined', () => {
    expect(new GlobalErrorFilter()).toBeDefined();
  });
});
