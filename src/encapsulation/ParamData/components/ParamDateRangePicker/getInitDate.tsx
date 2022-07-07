import moment, { Moment } from 'moment';

export default () =>
  [moment().subtract(1, 'days'), moment().subtract(1, 'days')] as [
    Moment,
    Moment,
  ];
