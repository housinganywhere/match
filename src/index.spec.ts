import match, { wildMatch, taggedMatch } from './index';

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

describe('taggedMatch', () => {
  type Tag = 'foo' | 'bar' | 'baz';

  type Foo = { tag: 'foo'; foo: string };
  type Bar = { tag: 'bar'; bar: string };
  type Baz = { tag: 'baz'; baz: string };

  type Union = Foo | Bar | Baz;

  const foo = { tag: 'foo' as 'foo', foo: 'FOO' };
  const bar = { tag: 'bar' as 'bar', bar: 'BAR' };
  const baz = { tag: 'baz' as 'baz', baz: 'BAZ' };

  it('calls the handler with the tagged union object', () => {
    const handleFoo = jest.fn(({ foo }) => foo);
    const handleBar = jest.fn(({ bar }) => bar);
    const handleBaz = jest.fn(({ baz }) => baz);

    const m = taggedMatch<Tag, Union, string>({
      foo: handleFoo,
      bar: handleBar,
      baz: handleBaz,
    });

    m(foo);
    m(bar);
    m(baz);

    expect(handleFoo).toBeCalledWith(foo);
    expect(handleBar).toBeCalledWith(bar);
    expect(handleBaz).toBeCalledWith(baz);
  });

  // this can't be tested in the one using `jest.fn` because
  // it returns `any` so type errors are swallowed
  it('type checks', () => {
    const m = taggedMatch<Tag, Union, string>({
      foo: ({ foo }) => foo,
      bar: ({ bar }) => bar,
      baz: ({ baz }) => baz,
    });

    expect(m(foo)).toBe('FOO');
    expect(m(bar)).toBe('BAR');
    expect(m(baz)).toBe('BAZ');
  });
});
