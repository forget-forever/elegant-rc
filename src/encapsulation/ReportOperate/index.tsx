import ReportOperate from './ReportOperate';
import { GetIProps } from 'tc-rc';

type ReportOperateProps = GetIProps<typeof ReportOperate>;

export default (props: ReportOperateProps) => (
  <ReportOperate key={JSON.stringify(props.initialValues)} {...props} />
);
