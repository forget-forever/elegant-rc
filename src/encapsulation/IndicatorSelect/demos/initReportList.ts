type ReportItem = {
  reportName: string;
  initConfigId: number;
  reportOrPreinstall: 0 | 1;
};

export default function initReportList(list: ReportItem[]) {
  return ['预设组', '报表']
    .map((label, index) => {
      return {
        label,
        list: list
          .filter((e) => e.reportOrPreinstall === index)
          .map((e) => ({ label: e.reportName, value: e.initConfigId })),
      };
    })
    .filter((e) => e.list.length > 0);
}
