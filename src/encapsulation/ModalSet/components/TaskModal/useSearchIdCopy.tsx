import React, { useMemo } from 'react';
import { CopyTwoTone } from '@ant-design/icons';
import { Button, message } from 'antd';
import copyToClipboard from 'copy-to-clipboard';

export default function useSearchIdCopy(searchId: string | undefined | null) {
  return useMemo(() => {
    return (
      searchId && (
        <div className={'title'}>
          <span>
            当前的查询/下载任务进度如下，请关注任务ID:{searchId?.slice(-4)}
          </span>
          <Button
            icon={<CopyTwoTone />}
            onClick={() => {
              if (searchId) {
                copyToClipboard(searchId);
                message.success('任务ID已成功复制到剪切板');
              }
            }}
          >
            复制任务ID
          </Button>
        </div>
      )
    );
  }, [searchId]);
}
