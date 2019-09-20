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

interface TaggedUnion<Union extends string> {
  readonly tag: Union;
}

type TaggedUnionMatcher<T extends TaggedUnion<string>, R> = {
  // how to refine `t` to the real type of the TaggedUnion
  [K in T['tag']]: <U extends TaggedUnion<K>>(t: U) => R;
};

export const taggedMatch = <
  Union extends string,
  T extends TaggedUnion<Union>,
  R = void
>(
  m: TaggedUnionMatcher<T, R>,
) => (t: T) => {
  const refined = t;
  const f = m[refined.tag];

  return f(refined);
};
