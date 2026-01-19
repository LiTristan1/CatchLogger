import React from 'react';
import { View, Text, ScrollView } from 'react-native';
// @ts-ignore
import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

type DataPoint = { x: string; y: number };
type Props = {
  xLabel?: string;
  yLabel?: string;
  data: DataPoint[];
  height?: number;
  barColor?: string;   // fallback if you don’t want gradient
  keepXLabel? : boolean
};

import {scaleBand} from 'd3-scale';

let chartWidthFactor = 1;
export default function Bar({
  data,
  xLabel,
  yLabel,
  height = 240,
  keepXLabel = false,
  barColor = '#3B82F6',
}: Props) {
  if (!data?.length) return null;

  // y values for the chart + x indices for band scale
  const yValues = data.map(d => d.y);
  const xIndices = data.map((_, i) => i);

  // Make enough horizontal room so bars aren’t razor-thin

  
  const BAR = 28;             // visual width per bar (px)
  const GAP = 10;             // gap between bars (px)
  const MIN_WIDTH = 340;      // minimum chart width for small datasets
  const chartWidth = Math.max(data.length * (BAR + GAP), MIN_WIDTH);


  
  // Slightly below 0 so zero bars render a tiny baseline
  const yMin = -0.25;

  //colours for the bar
  const barColours = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#14B8A6', // teal
  '#F97316', // orange
  '#6366F1', // indigo
];

const bars = data.map((d, i) => {
  const color = barColours[i % barColours.length];
  return {
    value: d.y,
    svg: { fill: `url(#grad${i})`, rx: 6, ry: 6 },
    gradientColor: color,
  };
});

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style = {{
      
    }}>
      <View style={{ padding: 10, width: chartWidth + 50 /* room for YAxis */ }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Y axis title */}
          <Text style={{ width: 20, textAlign: 'center', transform: [{ rotate: '-90deg' }] }}>
            {yLabel}
          </Text>

          {/* YAxis + Bars */}
          <View style={{ flexDirection: 'row' }}>
            <YAxis
              data={yValues}
              min={yMin}
              svg={{ fontSize: 12, fill: '#374151' }}
              contentInset={{ top: 10, bottom: 10 }}
              numberOfTicks={5}
              style={{ marginRight: 8 }}
            />
            <BarChart
              style={{ width: chartWidth, height, borderRadius: 12 }}
              data={bars}
              contentInset={{ top: 10, bottom: 10 }}
              yMin={yMin}
              gridMin={yMin}
              spacingInner={0.3}
              spacingOuter={0.2}
              yAccessor={({ item }: { item: { value: number } }) => item.value}

              
              // svg={{ fill: barColor }}            // uncomment for solid color
            >
              {/* Optional gradient fill */}
              <Defs key="defs">
  {bars.map((bar, i) => (
    <LinearGradient key={i} id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0%" stopColor={bar.gradientColor} stopOpacity={0.95} />
      <Stop offset="100%" stopColor={bar.gradientColor} stopOpacity={0.65} />
    </LinearGradient>
  ))}
</Defs>

              {/* Horizontal grid lines */}
              <Grid direction={Grid.Direction.HORIZONTAL} svg={{ stroke: '#e5e7eb' }} />
            </BarChart>
          </View>
          
        </View>

        {/* X-axis with band scale so categories line up with bars */}
       


        {/* X axis title */}
        {xLabel ? <Text style={{ textAlign: 'center', marginTop: 6 }}>{xLabel}</Text> : null}
        {
          keepXLabel ?  (<XAxis
              style={{ width: chartWidth, height: 36, marginTop: 6}}
              data={xIndices}
                                // categorical scale
              tickValues={xIndices}                 // one tick per bar
              contentInset = {{left: 55}}
              formatLabel={(_:number, i:number) => data[i]?.x ?? ''}
              svg={{ fontSize: 11, fill: '#374151', rotation: 45, originY: 12, y: 6 }}
              // no left contentInset needed because it sits under the chart
            />
          ) : (
            <View className = 'col'>
            <Text>Legend (left to right)</Text>
            
            {
              data.map((datapoint,index) => {
                return(
                  <View className = 'flex-row items-center ' key = {index}>
                    <View style = {{
                      width: 14,
                      height: 14,
                      borderRadius: 2,
                      backgroundColor: barColours[index % barColours.length],
                      marginRight: 2
                    }}></View>
                    <Text>{datapoint.x}</Text>
                  </View>
                )
              })
            }
            
            
        </View>
          )
        }
       
        
        
        
      </View>
    </ScrollView>
  );
}
