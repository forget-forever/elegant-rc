import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import './index.css';

type IProps = {
  searchOnRefresh: (searchId?: string) => void;
  dataSource: { cacheStartTime: string | null; searchId?: string };
};
const CacheTip: React.FC<IProps> = (props) => {
  const { searchOnRefresh, dataSource } = props;
  const { cacheStartTime } = dataSource;
  return (
    <div className="cacheTipContainer">
      {cacheStartTime && (
        <>
          <div
            style={{
              color: '#999',
              cursor: 'default',
              height: 40,
              lineHeight: '40px',
            }}
          >
            当前查询结果来自于{cacheStartTime?.substr(5, 11)}的缓存
          </div>
          <SyncOutlined
            title="点击获取最新数据"
            style={{ color: '#999', marginLeft: 8 }}
            onClick={() => searchOnRefresh(dataSource.searchId || undefined)}
          />
        </>
      )}
    </div>
  );
};
export default CacheTip;
