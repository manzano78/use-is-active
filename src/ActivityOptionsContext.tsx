import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

export interface ActivityOptions {
  delayBeforeActivation: number;
  minActiveDuration: number;
}

type ActivityOptionsProviderProps = PropsWithChildren<Partial<ActivityOptions>>;

const defaultActivityOptions: ActivityOptions = {
  delayBeforeActivation: 800,
  minActiveDuration: 1000,
};

const ActivityOptionsContext = createContext(defaultActivityOptions);

export function ActivityOptionsProvider({
  delayBeforeActivation = defaultActivityOptions.delayBeforeActivation,
  minActiveDuration = defaultActivityOptions.minActiveDuration,
  children,
}: ActivityOptionsProviderProps) {
  const activityOptions: ActivityOptions = useMemo(
    () => ({
      delayBeforeActivation,
      minActiveDuration,
    }),
    [delayBeforeActivation, minActiveDuration],
  );

  return (
    <ActivityOptionsContext.Provider value={activityOptions}>
      {children}
    </ActivityOptionsContext.Provider>
  );
}

export function useActivityOptions() {
  return useContext(ActivityOptionsContext);
}
