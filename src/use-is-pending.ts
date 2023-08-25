import { SetStateAction, useEffect, useRef, useState } from 'react';
import { PendingOptions, usePendingOptions } from './PendingOptionsContext';

interface ForcedActivePendingState {
  status: 'forced_active';
  isActuallyPending: boolean;
}

type PendingState =
  | { status: 'inactive' }
  | { status: 'delay_before_active' }
  | ForcedActivePendingState
  | { status: 'active' };

export function useIsPending(isActuallyPending: boolean): boolean {
  const pendingOptions = usePendingOptions();
  const pendingOptionsRef = useRef(pendingOptions);
  const [pendingState, setPendingState] = useState<PendingState>(() => ({
    status: isActuallyPending ? 'delay_before_active' : 'inactive',
  }));
  const { status } = pendingState;
  const isActive = status === 'forced_active' || status === 'active';

  switch (status) {
    case 'inactive':
      if (isActuallyPending) {
        setPendingState({ status: 'delay_before_active' });
      }
      break;
    case 'forced_active':
      if (isActuallyPending !== pendingState.isActuallyPending) {
        setPendingState({ status: 'forced_active', isActuallyPending });
      }
      break;
    case 'active':
    case 'delay_before_active':
      if (!isActuallyPending) {
        setPendingState({ status: 'inactive' });
      }
      break;
    default:
      break;
  }

  useEffect(() => {
    pendingOptionsRef.current = pendingOptions;
  }, [pendingOptions]);

  useEffect(() => {
    const scheduleNextStatus = (
      timeoutKey: keyof PendingOptions,
      nextActivity: SetStateAction<PendingState>,
    ) => {
      const { [timeoutKey]: timeout } = pendingOptionsRef.current;
      const timeoutId = window.setTimeout(() => {
        setPendingState(nextActivity);
      }, timeout);

      return () => {
        window.clearTimeout(timeoutId);
      };
    };

    switch (status) {
      case 'delay_before_active':
        return scheduleNextStatus('delayBeforeActive', {
          status: 'forced_active',
          isActuallyPending: true,
        });
      case 'forced_active':
        return scheduleNextStatus('minActiveDuration', (prevState) => ({
          status: (prevState as ForcedActivePendingState).isActuallyPending
            ? 'active'
            : 'inactive',
        }));
      default:
        return;
    }
  }, [status]);

  return isActive;
}
