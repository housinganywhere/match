import match from './index';

describe('@housinganywhere/match', () => {
  it('works with string unions', () => {
    type Status = 'foo' | 'bar';

    const m = match<Status, string>({
      foo: () => 'FOO',
      bar: () => 'BAR',
    });

    expect(m('foo')).toBe('FOO');
    expect(m('bar')).toBe('BAR');
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
