# @manzano/use-is-pending

Tiny React hook for an optimal UX loading indication.

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/manzano78/use-is-pending/ci.yml?style=flat-square)
[![npm version](https://img.shields.io/npm/v/@manzano/use-is-pending.svg?style=flat-square)](https://www.npmjs.com/package/@manzano/use-is-pending)

No flickering UI anymore!

- If your pending state lasts less than 800ms (by default), no pending indicator at all will be displayed to the user
- Otherwise, your pending indicator will start and last at least 1000ms (by default) even if your actual pending state ends before.

## Installation

```sh
# NPM
npm install @manzano/use-is-pending

# YARN
yarn add @manzano/use-is-pending
```

@manzano/use-is-pending 1.x.x requires **React 16.8.3 or later**.

### Usage

```tsx
import { useIsPending } from '@manzano/use-is-active';

export function LoadingIndicator({
  isLoading: isActuallyPending,
}: {
  isLoading: boolean;
}) {
  const isPending = useIsPending(isActuallyPending);

  return isPending ? <div>Loading...</div> : null;
}
```

The hook takes your actual pending boolean variable as param and returns the UX optimized one.

### Options override

By default, the delay before activation is 800ms and the minimal duration is 1000ms. You can override these values by context provider.

Example:

```tsx
import { PendingOptionsProvider } from '@manzano/use-is-active';

root.render(
  <PendingOptionsProvider delayBeforeActive={300} minActiveDuration={1500}>
    <App />
  </PendingOptionsProvider>,
);
```
