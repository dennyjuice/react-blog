import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const formatDate = (date: string) => format(parseISO(date), 'MMMM, d, yyyy');

export default formatDate;
