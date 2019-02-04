type Matcher<T extends string, R> = { [K in T]: (k: K) => R };

const match = <T extends string, R = void>(m: Matcher<T, R>) => (t: T) =>
  m[t](t);

export default match;
