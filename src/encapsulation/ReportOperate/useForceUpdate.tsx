import { useState, useCallback, useEffect } from 'react';

export default function useForceUpdate() {
  const [, update] = useState({});
  const forceUpdate = useCallback(() => update({}), []);
  useEffect(forceUpdate, []);
  return forceUpdate;
}
