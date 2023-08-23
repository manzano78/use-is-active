import { SetStateAction, useEffect, useRef, useState } from 'react';
import { ActivityOptions, useActivityOptions } from './ActivityOptionsContext';

interface ForcedActiveState {
  status: 'forced_active';
  isReallyActive: boolean;
}

type Activity =
  | { status: 'inactive' }
  | { status: 'delay_before_activation' }
  | ForcedActiveState
  | { status: 'active' };

export function useIsActive(isReallyActive: boolean): boolean {
  const activityOptions = useActivityOptions();
  const activityOptionsRef = useRef(activityOptions);
  const [activity, setActivity] = useState<Activity>(() => ({
    status: isReallyActive ? 'delay_before_activation' : 'inactive',
  }));
  const { status } = activity;
  const isActive = status === 'forced_active' || status === 'active';

  switch (status) {
    case 'inactive':
      if (isReallyActive) {
        setActivity({ status: 'delay_before_activation' });
      }
      break;
    case 'forced_active':
      if (isReallyActive !== activity.isReallyActive) {
        setActivity({ status: 'forced_active', isReallyActive });
      }
      break;
    case 'active':
    case 'delay_before_activation':
      if (!isReallyActive) {
        setActivity({ status: 'inactive' });
      }
      break;
    default:
      break;
  }

  useEffect(() => {
    activityOptionsRef.current = activityOptions;
  });

  useEffect(() => {
    const scheduleNextStatus = (
      timeoutKey: keyof ActivityOptions,
      nextActivity: SetStateAction<Activity>,
    ) => {
      const { [timeoutKey]: timeout } = activityOptionsRef.current;
      const timeoutId = window.setTimeout(() => {
        setActivity(nextActivity);
      }, timeout);

      return () => {
        window.clearTimeout(timeoutId);
      };
    };

    switch (status) {
      case 'delay_before_activation':
        return scheduleNextStatus('delayBeforeActivation', {
          status: 'forced_active',
          isReallyActive: true,
        });
      case 'forced_active':
        return scheduleNextStatus('minActiveDuration', (prevState) => ({
          status: (prevState as ForcedActiveState).isReallyActive
            ? 'active'
            : 'inactive',
        }));
      default:
        return;
    }
  }, [status]);

  return isActive;
}
