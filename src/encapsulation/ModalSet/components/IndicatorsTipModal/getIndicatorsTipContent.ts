import { ISearchData } from '../../../IndicatorSelect';

type IArg = {
  searchFilters: ISearchData;
  indicatorsArr: string[];
};

export default function getIndicatorsTipContent(arg: IArg) {
  const { searchFilters, indicatorsArr } = arg;
  const indicatorsTipContent = searchFilters.selects
    .map(
      (item: {
        group: string;
        select: { name: string; show_name: string }[];
      }) => {
        const indicators = item.select
          .filter((ele) => indicatorsArr.includes(ele.name))
          .map((ele) => ele.show_name)
          .join();
        return {
          groupName: item.group,
          indicators,
        };
      },
    )
    .filter((item: any) => item.indicators);
  return indicatorsTipContent;
}
