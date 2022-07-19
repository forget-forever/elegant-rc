import React from 'react';
import { Row, Col } from 'antd';

type IProps = {
  blockName: string;
  blockInfo: string[] | string;
};

const CommonCondition = (props: IProps) => {
  const { blockName, blockInfo } = props;
  return (
    <>
      <Row>
        <Col span={4}>{blockName}</Col>
        <Col span={20}>
          {Array.isArray(blockInfo) ? blockInfo.join() : blockInfo}
        </Col>
      </Row>
    </>
  );
};

export default CommonCondition;
