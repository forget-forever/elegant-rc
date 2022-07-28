import React from 'react';
import type { SelectProps } from 'antd';
import {
  Card,
  Input,
  Radio,
  Form,
  Select,
  TreeSelect,
  Row,
  Button,
  Space,
  Col,
  InputNumber,
  Divider,
  Spin,
} from 'antd';
import './index.css';
import type { IDateTypeConfigBo } from './constant';
import {
  dateTypeOptions,
  formLayout,
  initDateTypeConfigBo,
  mapDateTypeToConfigBo,
  weekOptions,
} from './constant';
import type { ISearchData } from '../IndicatorSelect';
import DimFilter from '../DimFilter';
import { EGroupByDate } from './enum';
import useDimFilterProps from './useDimFilterProps';
import { useTreeData } from './useTreeData';
import useForceUpdate from './useForceUpdate';
import useDateTypeConfigBo from './useDateTypeConfigBo';
import useSearchFiltersKit from './utils/useSearchFiltersKit';
import useGroupOptionsGetter from './utils/useGroupOptionsGetter';

const FormItem = Form.Item;

type IProps = {
  // 状态
  loading?: boolean;
  searchData: ISearchData;
  // 类型的数组
  kindOptions?: { label: string; value: number }[];
  // 主题选项
  themeOptions: SelectProps['options'];
  // 提交回调
  onClickSubmit: (...arg: any[]) => void;
  // 取消回调
  onClickCancel: () => void;
  initialValues: {
    reportOrPreinstall?: number;
    reportName?: string;
    reportTheme?: string;
    dateType?: number;
    selects: string[];
    group?: [];
    groupByDate?: number | null;
    dateTypeConfigBo?: IDateTypeConfigBo;
    condition?: Parameters<
      typeof useDimFilterProps
    >[0]['initialValues']['condition'];
  };
  getSearchList: (params: {
    where_name: string;
    keyword?: string;
  }) => Promise<any>;
};
const ReportOperate: React.FC<IProps> = (props) => {
  const {
    loading = false,
    searchData,
    kindOptions = [
      { label: '预设组', value: 0 },
      { label: '报表', value: 1 },
    ],
    themeOptions,
    onClickSubmit,
    onClickCancel,
    initialValues,
    getSearchList,
  } = props;

  const forceUpdate = useForceUpdate();
  const { searchFiltersKit } = useSearchFiltersKit(searchData);
  const {
    searchFilters,
    mapDimNameToDetail,
    mapDimGroupCnameToIndicators,
    mapIndicatorNameToDetail,
  } = searchFiltersKit;

  const { dims, selects } = searchFilters;

  const groupOptionsGetter = useGroupOptionsGetter(dims, mapDimNameToDetail);

  const disabled = false;
  const [form] = Form.useForm();
  const { dateTypeConfigBo, setDateTypeConfigBo } = useDateTypeConfigBo(
    initialValues.dateTypeConfigBo,
  );

  const { filterIndex, setFilterIndex } = useDimFilterProps({
    initialValues,
    mapDimNameToDetail,
  });

  const treeData = useTreeData({
    selects,
    form,
    mapIndicatorNameToDetail,
    filterIndex,
  });

  const hideKindRadio = !(kindOptions?.length > 1);

  return (
    <>
      <pre hidden={!localStorage.getItem('debug')}>
        {JSON.stringify(dateTypeConfigBo, null, 4)}
        <br />
        {JSON.stringify(form.getFieldsValue(), null, 4)}
        <br />
        {JSON.stringify(filterIndex, null, 4)}
      </pre>
      <Spin spinning={loading}>
        <Form {...formLayout} form={form} initialValues={initialValues}>
          <Card>
            <FormItem
              hidden={hideKindRadio}
              label="报表/预设组"
              name="reportOrPreinstall"
              rules={[{ required: true, message: '类别必选' }]}
            >
              <Radio.Group
                onChange={(e) => {
                  const { value } = e.target;
                  if (value === 0) {
                    setDateTypeConfigBo(initDateTypeConfigBo);
                    form.setFieldsValue({
                      dateType: -1,
                    });
                  } else {
                    form.setFieldsValue({
                      dateType: dateTypeOptions
                        .map((el) => el.value)
                        .includes(initialValues.dateType as any)
                        ? initialValues.dateType
                        : 1,
                    });
                    setDateTypeConfigBo(
                      initialValues.dateTypeConfigBo || initDateTypeConfigBo,
                    );
                  }
                  forceUpdate();
                }}
              >
                {kindOptions.map(({ value, label }) => (
                  <Radio key={label} value={value}>
                    {label}
                  </Radio>
                ))}
              </Radio.Group>
            </FormItem>
            {!hideKindRadio && <Divider />}
            <div className="block_title">基本信息</div>
            <FormItem
              label="名称"
              name="reportName"
              rules={[{ required: true, message: '名称必填' }]}
            >
              <Input
                onChange={() => forceUpdate()}
                maxLength={50}
                placeholder="请输入名称"
              />
            </FormItem>
            <FormItem
              label="主题"
              name="reportTheme"
              rules={[{ required: true, message: '主题必选' }]}
            >
              <Select
                onChange={() => forceUpdate()}
                placeholder="请选择主题"
                options={themeOptions}
              />
            </FormItem>
            <FormItem
              hidden={form.getFieldValue('reportOrPreinstall') !== 1}
              label="日期"
              name="dateType"
              rules={[{ required: true, message: '日期必选' }]}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) => {
                  setDateTypeConfigBo(mapDateTypeToConfigBo[e.target.value]);
                  forceUpdate();
                }}
              >
                {dateTypeOptions.map((op) => (
                  <Radio.Button value={op.value} key={op.value}>
                    {op.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </FormItem>
            <FormItem
              hidden={form.getFieldValue('reportOrPreinstall') !== 1}
              label=" "
              colon={false}
            >
              <>
                <Space direction="vertical">
                  {form.getFieldValue('dateType') === 1 && (
                    <>
                      <Radio
                        checked={dateTypeConfigBo.goBackXDay === 0}
                        onChange={() =>
                          setDateTypeConfigBo({
                            ...initDateTypeConfigBo,
                            goBackXDay: 0,
                          })
                        }
                      >
                        昨日
                      </Radio>
                      <Radio
                        checked={dateTypeConfigBo.goBackXDay !== 0}
                        onChange={() =>
                          setDateTypeConfigBo({
                            ...initDateTypeConfigBo,
                            goBackXDay: 1,
                          })
                        }
                      >
                        <Space>
                          <span className="date_prefix_text">往前</span>
                          <InputNumber
                            min={1}
                            disabled={dateTypeConfigBo.goBackXDay === 0}
                            style={{ width: 100 }}
                            value={dateTypeConfigBo.goBackXDay}
                            onChange={(e) =>
                              setDateTypeConfigBo({
                                ...initDateTypeConfigBo,
                                goBackXDay: Number(e) || 0,
                              })
                            }
                          />
                          <span>天</span>
                          <span className="date_text">
                            （以9月10号为例：统计时间为9月8日的数据）
                          </span>
                        </Space>
                      </Radio>
                    </>
                  )}
                  {form.getFieldValue('dateType') === 5 && (
                    <>
                      <Radio
                        checked={dateTypeConfigBo.ifNatureWeek}
                        onChange={() =>
                          setDateTypeConfigBo({
                            ...initDateTypeConfigBo,
                            ifNatureWeek: true,
                          })
                        }
                      >
                        自然周
                        <span className="date_text">
                          （每周一产出上个周的数据）
                        </span>
                      </Radio>
                      <Radio
                        checked={!dateTypeConfigBo.ifNatureWeek}
                        onChange={() =>
                          setDateTypeConfigBo({
                            ...initDateTypeConfigBo,
                            ifNatureWeek: false,
                            dayOfWeek: 1,
                          })
                        }
                      >
                        <Space>
                          <span className="date_prefix_text">每周</span>
                          <Select
                            disabled={dateTypeConfigBo.ifNatureWeek}
                            onClick={(e) => e.preventDefault()}
                            options={weekOptions}
                            style={{ width: 100 }}
                            value={dateTypeConfigBo.dayOfWeek || undefined}
                            onChange={(e) =>
                              setDateTypeConfigBo({
                                ...initDateTypeConfigBo,
                                ifNatureWeek: false,
                                dayOfWeek: Number(e),
                              })
                            }
                          />
                          <span className="date_text">
                            （以每周三产出数据为例：即上周三到本周二的数据）
                          </span>
                        </Space>
                      </Radio>
                    </>
                  )}
                  {form.getFieldValue('dateType') === 10 && (
                    <>
                      <Radio
                        checked={dateTypeConfigBo.ifNatureMonth}
                        onChange={() =>
                          setDateTypeConfigBo({
                            ...initDateTypeConfigBo,
                            ifNatureMonth: true,
                            dayOfMonth: 1,
                          })
                        }
                      >
                        自然月
                        <span className="date_text">
                          （每月1号产出上个月的数据）
                        </span>
                      </Radio>
                      <Radio
                        checked={!dateTypeConfigBo.ifNatureMonth}
                        onChange={() =>
                          setDateTypeConfigBo({
                            ...initDateTypeConfigBo,
                            ifNatureMonth: false,
                            dayOfMonth: 1,
                          })
                        }
                      >
                        <Space>
                          <span className="date_prefix_text">每月</span>
                          <InputNumber
                            disabled={dateTypeConfigBo.ifNatureMonth}
                            min={1}
                            max={31}
                            onClick={(e) => e.preventDefault()}
                            style={{ width: 100 }}
                            value={dateTypeConfigBo.dayOfMonth || undefined}
                            onChange={(e) =>
                              setDateTypeConfigBo({
                                ...initDateTypeConfigBo,
                                ifNatureMonth: false,
                                dayOfMonth: Number(e) || 0,
                              })
                            }
                          />
                          <span>日</span>
                          <span className="date_text">
                            （以每月2日产出数据为例：即2号往前推30天数据）
                          </span>
                        </Space>
                      </Radio>
                    </>
                  )}
                </Space>
              </>
              {form.getFieldValue('dateType') === 15 && (
                <>
                  <span>当月1号至昨天</span>
                </>
              )}
            </FormItem>
            <div className="block_title">选择指标和维度</div>
            <FormItem
              label="已选指标"
              name="selects"
              rules={[{ required: true, message: '指标必选' }]}
            >
              <TreeSelect
                onChange={() => forceUpdate()}
                style={{ maxHeight: 116, overflowY: 'auto' }}
                treeData={treeData}
                treeCheckable
                treeDefaultExpandAll
                treeNodeFilterProp="title"
                showCheckedStrategy="SHOW_CHILD"
                placeholder="请选择指标"
              />
            </FormItem>
            <FormItem label="分组条件" name="group">
              <Select
                onChange={() => forceUpdate()}
                allowClear
                mode="multiple"
                disabled={false}
                optionFilterProp="label"
                style={{ minWidth: 277 }}
              >
                {groupOptionsGetter(form.getFieldValue('selects') || [])}
              </Select>
            </FormItem>
            <FormItem label="按日期分组" name="groupByDate">
              <Radio.Group onChange={() => forceUpdate()}>
                <Radio value={EGroupByDate.ALL}>查询所有</Radio>
                <Radio value={EGroupByDate.DAILY}>按天查询</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem label="筛选条件">
              <DimFilter
                disabled={false}
                disableHandel={(dim) => {
                  return !!mapDimNameToDetail
                    .get(dim.name)
                    ?.getDisabled(form.getFieldValue('selects') || []);
                }}
                filterIndex={filterIndex}
                setFilterIndex={setFilterIndex}
                mapDimNameToDetail={mapDimNameToDetail}
                mapDimGroupCnameToIndicators={mapDimGroupCnameToIndicators}
                getSearchList={getSearchList}
              />
            </FormItem>
            <Row>
              <Col offset={3}>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      form.validateFields().then((values) => {
                        onClickSubmit(values, dateTypeConfigBo, filterIndex);
                      });
                    }}
                  >
                    提交
                  </Button>
                  <Button
                    onClick={() => onClickCancel()}
                    style={{ width: '80px' }}
                  >
                    {disabled ? '返回' : '取消'}
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Form>
      </Spin>
    </>
  );
};

export default ReportOperate;
