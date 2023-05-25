import { getTickets } from '@/common/server-actions/getTickets';
import { Chart } from './tickets/Chart';

const Page = async () => {
  const tickets = await getTickets();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Chart data={tickets[0]} type="bar" title="Tickets By Type" />
      <Chart data={tickets[1]} type="bar" title="Tickets By Priority" />
      <Chart data={tickets[2]} type="bar" title="Tickets By Status" />
      <Chart data={tickets[3]} type="pie" title="Tickets By Developer" />
    </div>
  );
};

export default Page;
