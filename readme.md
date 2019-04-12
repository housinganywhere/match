# poor man's pattern matching :traffic_light:

[![npm version](https://badge.fury.io/js/%40housinganywhere%2Fmatch.svg)](https://badge.fury.io/js/%40housinganywhere%2Fmatch)
[![CircleCI](https://circleci.com/gh/housinganywhere/match.svg?style=svg)](https://circleci.com/gh/housinganywhere/match)

## Install

```
yarn add @housinganywhere/match

npm i @housinganywhere/match
```

## Use

[![Edit @housinganywhere/match](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/y3qk65jpyj)

```ts
import * as React from 'react';
import match from '@housinganywhere/match';

type Status = 'loading' | 'error' | 'success';

enum Status {
  loading = 'loading',
  error = 'error',
  success = 'success',
}

const StatusMsg: React.SFC<{ status: Status }> = ({ status }) =>
  match<Status, React.ReactNode>({
    loading: () => <Spinner />,
    error: () => <Alert type="danger">There was an error</Alert>,
    success: () => <Alert type="success">Yay! It worked</Alert>,
  })(status);
```

For matching several cases together use **wildMatch**. All the missing cases
will be handled by case `_`.

```ts
import { wildMatch } from '@housinganywhere/match';

type Vowels = 'a' | 'e' | 'i' | 'o' | 'u';

const isA = wildMatch<Vowels, string>({
  a: () => 'Yay!',
  _: (v) => `Nope, "${v}" is not "a"`,
});

isA('a'); // 'Yay!'
isA('e'); // 'Nope, "e" is not "a"'
isA('i'); // 'Nope, "i" is not "a"'
isA('o'); // 'Nope, "o" is not "a"'
isA('u'); // 'Nope, "u" is not "a"'
```

## License

[MIT](https://github.com/housinganywhere/match/blob/master/LICENSE) © 2019
[HousingAnywhere](https://housinganywhere.com/)
