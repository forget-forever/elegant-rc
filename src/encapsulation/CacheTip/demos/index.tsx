import { CacheTip } from 'tc-rc';

const Demo = () => {
  return (
    <CacheTip
      searchOnRefresh={() => {}}
      dataSource={{ cacheStartTime: '2022-07-17 10:27:00', searchId: '123' }}
    />
  );
};

export default Demo;
