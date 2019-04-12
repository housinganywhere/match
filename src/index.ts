type Matcher<T extends string, R> = { [K in T]: (k: K) => R };

const match = <T extends string, R = void>(m: Matcher<T, R>) => (t: T) =>
  m[t](t);

export default match;

type PartialMatcher<T extends string, R> = { [K in T]?: (k: K) => R } & {
  _: (t: T) => R;
};

export const wildMatch = <T extends string, R = void>(
  m: PartialMatcher<T, R>,
) => (t: T) => {
  const f = m[t];

  if (f) {
    return f(t);
  }

  return m._(t);
};
