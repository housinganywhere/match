import match, { wildMatch } from './index';

describe('@housinganywhere/match', () => {
  describe('match', () => {
    it('works with string unions', () => {
      type Status = 'foo' | 'bar';

      const m = match<Status, string>({
        foo: () => 'FOO',
        bar: () => 'BAR',
      });

      expect(m('foo')).toBe('FOO');
      expect(m('bar')).toBe('BAR');
    });

    it('works with number unions', () => {
      type Status = 200 | 500;

      const m = match<Status, string>({
        200: () => 'SUCCESS',
        500: () => 'FAILURE',
      });

      expect(m(200)).toBe('SUCCESS');
      expect(m(500)).toBe('FAILURE');
    });

    it('works with string enums', () => {
      enum Status {
        foo = 'foo',
        bar = 'bar',
      }

      const m = match<Status, string>({
        foo: () => 'FOO',
        bar: () => 'BAR',
      });

      expect(m(Status.foo)).toBe('FOO');
      expect(m(Status.bar)).toBe('BAR');
    });

    it('works with number enums', () => {
      enum Status {
        foo = 10,
        bar = 20,
      }

      const m = match<Status, string>({
        10: () => 'FOO',
        20: () => 'BAR',
      });

      expect(m(Status.foo)).toBe('FOO');
      expect(m(Status.bar)).toBe('BAR');
    });

    it('calls the right handler', () => {
      type Status = 'foo' | 'bar';
      const handleFoo = jest.fn(() => 'FOO');
      const handleBar = jest.fn(() => 'BAR');

      const m = match<Status, string>({
        foo: handleFoo,
        bar: handleBar,
      });

      m('foo');
      m('bar');

      expect(handleFoo).toBeCalled();
      expect(handleBar).toBeCalled();
    });
  });

  describe('wildMatch', () => {
    it('calls the the default handler when a handler is missing', () => {
      type Status = 'foo' | 'bar' | 'baz';
      const handleFoo = jest.fn(() => 'FOO');
      const handleWild = jest.fn((v) => `called with: ${v}`);

      const m = wildMatch<Status, string>({
        foo: handleFoo,
        _: handleWild,
      });

      expect(m('foo')).toBe('FOO');
      expect(m('bar')).toBe('called with: bar');
      expect(m('baz')).toBe('called with: baz');

      expect(handleFoo).toBeCalled();
      expect(handleWild).toBeCalledTimes(2);
    });
  });
});
