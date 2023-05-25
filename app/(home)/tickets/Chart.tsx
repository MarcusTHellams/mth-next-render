'use client';

import { JSXElementConstructor, ReactElement } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

type ChartContainerProps = {
  title: string;
  children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
};

export const COLORS = ['#fd0000', '#ca0000', '#980000', '#730202', '#5a0101'];

const ChartContainer = ({ children, title }: ChartContainerProps) => {
  return (
    <div className="bg-gray-300 rounded-2xl shadow-lg">
      <ResponsiveContainer height={350} width="100%">
        {children}
      </ResponsiveContainer>
      <div className="flex justify-center items-center h-[3.125rem]">
        {title}
      </div>
    </div>
  );
};

type CardChartComponentProps = {
  data: any[];
  type?: 'pie' | 'bar';
  title: string;
};

export const Chart = ({ data, type = "bar", title }: CardChartComponentProps) => {
  if (type === 'pie') {
    return (
      <ChartContainer {...{ title }}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={'80%'}
            innerRadius={80}
            dataKey="count"
            label
          >
            {data.map((_: unknown, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ChartContainer {...{ title }}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickCount={1} />
          <Tooltip />
          <Bar label dataKey="count">
            {data.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ChartContainer>
    );
  }
  return null;
};
