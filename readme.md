# poor man's pattern matching :traffic_light:

[![npm version](https://badge.fury.io/js/%40housinganywhere%2Fmatch.svg)](https://badge.fury.io/js/%40housinganywhere%2Fmatch)
[![CircleCI](https://circleci.com/gh/housinganywhere/safe-redux.svg?style=svg)](https://circleci.com/gh/housinganywhere/safe-redux)

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

## License

[MIT](https://github.com/housinganywhere/match/blob/master/LICENSE) © 2019
HousingAnywhere
