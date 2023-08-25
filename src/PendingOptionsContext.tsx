import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

export interface PendingOptions {
  delayBeforeActive: number;
  minActiveDuration: number;
}

type PendingOptionsProviderProps = PropsWithChildren<Partial<PendingOptions>>;

const defaultPendingOptions: PendingOptions = {
  delayBeforeActive: 800,
  minActiveDuration: 1000,
};

const PendingOptionsContext = createContext(defaultPendingOptions);

export function PendingOptionsProvider({
  delayBeforeActive = defaultPendingOptions.delayBeforeActive,
  minActiveDuration = defaultPendingOptions.minActiveDuration,
  children,
}: PendingOptionsProviderProps) {
  const pendingOptions: PendingOptions = useMemo(
    () => ({
      delayBeforeActive,
      minActiveDuration,
    }),
    [delayBeforeActive, minActiveDuration],
  );

  return (
    <PendingOptionsContext.Provider value={pendingOptions}>
      {children}
    </PendingOptionsContext.Provider>
  );
}

export function usePendingOptions() {
  return useContext(PendingOptionsContext);
}
