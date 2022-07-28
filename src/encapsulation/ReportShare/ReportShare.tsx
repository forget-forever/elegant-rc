import React, { useEffect } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import './index.css';

interface IProps {
  visible: boolean;
  loading: boolean;
  reportItem: {
    reportName: string;
    reportTheme: string;
    ifOpen: boolean;
    reportShareConfig: string;
  };
  setVisible: (visible: boolean) => void;
  onConfirm: (values: Record<string, any>) => void;
}

const ReportShare = (props: IProps) => {
  const { loading, visible, reportItem, setVisible, onConfirm } = props;

  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(onConfirm);
  };

  const { reportName, reportTheme, ifOpen, reportShareConfig } = reportItem;

  const initialValues = {
    reportName,
    reportTheme,
    ifOpen,
    reportShareConfig,
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [JSON.stringify(initialValues), visible]);

  return (
    <Modal
      forceRender
      width={800}
      title="分享"
      visible={visible}
      confirmLoading={loading}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18, offset: 1 }}
        initialValues={initialValues}
      >
        <Form.Item label="报表名称" name="reportName">
          <Input disabled />
        </Form.Item>
        <Form.Item label="报表主题" name="reportTheme">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="隐私选项"
          name="ifOpen"
          rules={[{ required: true, message: '请选择隐私选项' }]}
        >
          <Radio.Group>
            <Radio value={1}>公开分享</Radio>
            <Radio value={0}>分享给指定人</Radio>
          </Radio.Group>
        </Form.Item>

        <div className="remind">
          <p>公开分享：则该报表对所有人可见，大家都能在报表管理列表中可见；</p>
          <p>分享给指定人：则只有对应人的报表管理列表中可见该报表。</p>
        </div>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.ifOpen !== currentValues.ifOpen
          }
        >
          {({ getFieldValue }) => {
            return getFieldValue('ifOpen') === 0 ? (
              <Form.Item
                label="被分享者"
                name="reportShareConfig"
                rules={[{ required: true, message: '请填写被分享者工号' }]}
              >
                <Input.TextArea
                  placeholder="请输入被分享者的工号，多个工号用分号隔开"
                  rows={6}
                />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReportShare;
