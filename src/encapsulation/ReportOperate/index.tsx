import ReportOperate from './ReportOperate';
import { GetIProps } from 'elegant-rc';

type ReportOperateProps = GetIProps<typeof ReportOperate>;

export default (props: ReportOperateProps) => (
  <ReportOperate key={JSON.stringify(props.initialValues)} {...props} />
);
