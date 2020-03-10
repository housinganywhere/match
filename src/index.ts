type ExpectedType = number | string;

type Matcher<T extends ExpectedType, R> = { [K in T]: (k: K) => R };

const match = <T extends ExpectedType, R = void>(m: Matcher<T, R>) => (t: T) =>
  m[t](t);

export default match;

type PartialMatcher<T extends ExpectedType, R> = { [K in T]?: (k: K) => R } & {
  _: (t: T) => R;
};

export const wildMatch = <T extends ExpectedType, R = void>(
  m: PartialMatcher<T, R>,
) => (t: T) => {
  const f = m[t] as ((k: T) => R) | undefined;

  if (f) {
    return f(t);
  }

  return m._(t);
};
