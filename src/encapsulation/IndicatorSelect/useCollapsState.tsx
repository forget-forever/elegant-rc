import { useEffect, useMemo, useState } from 'react';
import { ISubjects } from './index';

export default function useCollapsState(subjects: ISubjects) {
  const [collapsStatus, setCollapsStatus] = useState(subjects.map(() => false));
  useEffect(() => {
    setCollapsStatus(subjects.map(() => false));
  }, [JSON.stringify({ subjects })]);
  const allCollaps = useMemo(() => {
    return collapsStatus.every((e) => e);
  }, [JSON.stringify(collapsStatus)]);
  const setAllCollaps = (flag: boolean) => {
    setCollapsStatus(collapsStatus.map(() => flag));
  };
  return {
    collapsStatus,
    setCollapsStatus,
    setAllCollaps,
    allCollaps,
  };
}
