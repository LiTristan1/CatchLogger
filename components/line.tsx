import React from 'react';

import { useRef} from 'react';
import { ScrollView } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory-native';

export type point = {
  xAxis: number[];
  yAxis: number[];
};

type Props = {
  xLabel: string;
  yLabel: string;
  data: point | null;
};

const scrollRef = useRef(null);


export default function LineGraph({ xLabel, yLabel, data }: Props) {
  if (!data || data.xAxis.length !== data.yAxis.length) return null;

  // Combine xAxis and yAxis into [{ x, y }, ...]
  const chartData = data.xAxis.map((x, i) => ({
    x,
    y: data.yAxis[i],
  }));

  // Calculate xMin and yMax
  const xMin = Math.min(...data.xAxis);
  const xMax = Math.max(...data.xAxis);
  const yMin = 0;
  const yMax = Math.max(...data.yAxis);

  // Generate tick labels
  function getTicks(start: number, end: number, interval: number): number[] {
    const ticks = [];
    for (let i = start; i <= end; i += interval) {
      ticks.push(Math.round(i));
    }
    return ticks;
  }

  const xTickLabels = getTicks(xMin, xMax, 10);
  const yTickLabels = getTicks(yMin, yMax, Math.max(1, yMax / 10));

  return (
    <ScrollView  horizontal showsVerticalScrollIndicator = {true} ref = {scrollRef}>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20} width = {500}containerComponent={
    <VictoryVoronoiContainer
      labels={({ datum }) => `(${datum.x}, ${datum.y})`}
      labelComponent={
        <VictoryTooltip
          flyoutStyle={{ fill: '#E0F2FE' }}
          style={{ fontSize: 10 }}
        />
      }
    />
  }>
        <VictoryAxis
          label={xLabel}
          tickValues={xTickLabels}
          style={{
            axisLabel: { padding: 30, fontSize: 14 },
           
          }}
        />
        <VictoryAxis
          dependentAxis
          label={yLabel}
          tickValues={yTickLabels}
          style={{
            axisLabel: { padding: 35, fontSize: 14 },
          }}
        />

        <VictoryLine
          animate
          data={chartData}
          style={{
            data: { stroke: '#1D4ED8', strokeWidth: 2 },
          }}
        />

        <VictoryScatter
          animate
          data={chartData}
          size={5}
          style={{ data: { fill: '#1D4ED8' }}}
          labels={({ datum }) => `(${datum.x}, ${datum.y})`}
          
        />
      </VictoryChart>
    </ScrollView>
  );
}
