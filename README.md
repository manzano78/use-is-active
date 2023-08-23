# @manzano/use-is-active

Tiny hook for an optimal UX loading indication.

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/manzano78/use-is-active/ci.yml?style=flat-square)
[![npm version](https://img.shields.io/npm/v/@manzano/use-is-active.svg?style=flat-square)](https://www.npmjs.com/package/@manzano/use-is-active)

No flickering UI anymore!

- If your loading state lasts less than 800ms (by default), no loading indicator at all will be displayed to the user
- Otherwise, if it exceeds this threshold, your loading indicator will start and last at least 1000ms (by default) even if your actual loading state ends before.

## Installation

```sh
# NPM
npm install @manzano/use-is-active

# YARN
yarn add @manzano/use-is-active
```

@manzano/use-is-active 1.x.x requires **React 16.8.3 or later**.

### Usage

```tsx
import { useIsActive } from '@manzano/use-is-active';

export function LoadingIndicator({ isLoading }: { isLoading: boolean }) {
  const isActive = useIsActive(isLoading);

  return isActive ? <div>Loading...</div> : null;
}
```

The hook takes your actual loading boolean variable as param and returns the UX optimized one.

### Options override

By default, the delay before activation is 800ms and the minimal duration is 1000ms. You can override these values by context provider.

Example:

```tsx
import { ActivityOptionsProvider } from '@manzano/use-is-active';

root.render(
  <ActivityOptionsProvider delayBeforeActivation={300} minActiveDuration={1500}>
    <App />
  </ActivityOptionsProvider>,
);
```
