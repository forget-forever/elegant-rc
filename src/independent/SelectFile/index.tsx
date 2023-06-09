import { useMemoizedFn } from 'ahooks';
import { Button, message, Upload } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';
import { useMemo } from 'react';
import type { FormProps, GetIProps } from 'elegant-rc';

const SelectFile: React.FC<
  FormProps<
    RcFile,
    GetIProps<typeof Upload> & {
      /** 文件大小限制, 单位为b */
      limit?: number;
      /**
       * 如果children不传，默认的button需要什么内容
       * @default '选择文件'
       */
      buttonText?: React.ReactNode;
      /**
       * 如果children不传，默认的button需要什么type
       * @default 'primary'
       */
      buttonType?: GetIProps<typeof Button>['type'];
      /**
       * 如果children不传，默认的button的size
       */
      buttonSize?: GetIProps<typeof Button>['size'];
      /**
       * 如果children不传，默认的button的disabled
       */
      buttonDisabled?: boolean;
    }
  >
> = (props) => {
  const {
    children,
    value,
    onChange,
    limit = 10 * 1024 * 1024,
    buttonDisabled,
    buttonSize,
    buttonText = '选择文件',
    buttonType,
    ...resetProps
  } = props;

  const fileList = useMemo(() => {
    if (!value) {
      return [];
    }
    return [value];
  }, [value]);

  const deleteHandle = useMemoizedFn(() => {
    onChange?.(undefined);
  });

  const beforeUpload = useMemoizedFn((file: RcFile) => {
    if (limit && limit < file.size) {
      message.error(`上传文件大小不能超过 ${limit / 1024 / 1024}MB`);
      return Promise.reject(Error('文件大小超过限制，不上传'));
    }
    if (props.action) {
      return onChange?.(file) ?? Promise.reject(Error('默认不上传'));
    }
    return Promise.reject(Error('没有action不自动上传'));
  });

  return (
    <Upload
      showUploadList
      withCredentials
      {...resetProps}
      fileList={fileList as UploadFile[]}
      beforeUpload={beforeUpload}
      onRemove={deleteHandle}
    >
      {children || (
        <Button type={buttonType} size={buttonSize} disabled={buttonDisabled}>
          {buttonText}
        </Button>
      )}
    </Upload>
  );
};

export default SelectFile;
