import { useEffect, useMemo, useRef } from 'react';

type IArg = {
  dataSource: { list: any[]; total: string };
};
export default function useTableListEvents(arg: IArg) {
  const { dataSource } = arg;
  const divRef = useRef<HTMLDivElement | null>(null);

  const { columns, source, total } = useMemo(() => {
    let { list = [] } = dataSource;
    if (!list) {
      list = [];
    }
    const temp = Object.entries(list[0] || {}).map((item) => ({
      title: (item as [string, string])?.[1],
      dataIndex: item?.[0],
      key: item?.[0],
    }));
    const data = list
      .slice(1)
      .map((item, index: number) => ({ ...item, key: index }));

    return {
      columns: temp,
      source: data,
      total: parseInt(dataSource.total, 10),
    };
  }, [dataSource]);

  useEffect(() => {
    if (source.length > 0) {
      scrollContentToDataList(divRef.current);
    }
  }, [source.length]);

  return {
    divRef,
    columns,
    source,
    total,
  };
}

export function scrollContentToDataList(
  childStr: string | HTMLDivElement | null,
) {
  const container = document.querySelector(
    '.data-factory-pro-page-container-children-content',
  );
  let child;
  if (typeof childStr === 'string') {
    child =
      document.querySelector(childStr) ||
      document.getElementsByClassName(childStr.slice(1))[0];
  } else {
    child = childStr;
  }
  if (container && child) {
    const containerHeight =
      parseInt(getComputedStyle(container).height, 10) || 0;
    const childHeight = parseInt(getComputedStyle(child).height, 10) || 0;
    const height = containerHeight - childHeight - 50;
    console.log({ height, childHeight, containerHeight });
    window.scrollTo(0, height);
    return;
  }
  window.scrollTo(0, document.body.scrollHeight);
}
