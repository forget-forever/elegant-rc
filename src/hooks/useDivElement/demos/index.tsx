import useDivElement from '..';

export default () => {
  const { ref, Node } = useDivElement({
    children: 'dom节点, 节点数据请看控制台',
    afterMount: (e) => {
      console.log(e);
    },
  });

  return <span>{Node}</span>;
};
