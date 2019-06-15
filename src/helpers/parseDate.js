import moment from 'moment';

export default (dateUtc) => {
  return moment(parseInt(dateUtc));
};