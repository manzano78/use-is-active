import { useState } from 'react';

export interface LoadingIndicatorOptions {
  delay: number;
  minDuration: number;
}

export function createLoadingIndicatorHook() {

}

export function useLoading() {
  const [isActive] = useState(true);

  return isActive;
}
