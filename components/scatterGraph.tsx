import { View } from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryTheme,
  VictoryLabel
  
} from 'victory-native';

const dummyData = [
  { x: 13, y: 14 },
  { x: 14, y: 8 },
  { x: 15, y: 12 },
  { x: 16, y: 23 },
  { x: 17, y: 31 },
  { x: 18, y: 12 },
  { x: 19, y: 15 },
  { x: 20, y: 5 },
  { x: 21, y: 16 },
  { x: 22, y: 23 },
  { x: 23, y: 12 },
];

export default function StyledLineGraph() {
  return (
    <View className="justify-center items-center">
      <VictoryChart
        padding={{ top: 50, bottom: 70, left: 60, right: 40 }} 
        domainPadding={10}
      >
        <VictoryLabel
            text = {'test'}
        />
         <VictoryAxis
          dependentAxis
          label="Fish-Caught"
          style={{
            axisLabel: { padding: 40, fontSize: 14, fill: '#374151' },
            tickLabels: { fontSize: 12, fill: '#374151'},
            grid: { stroke: '#E5E7EB' },
            
          }}
        />
        <VictoryAxis
         label = "Temperature "
          style = {{
            tickLabels: {
                fontSize: 10,
            },
            axisLabel: {
              padding: 30,
              fontSize: 14,
              fill: '#374151',
            }
          }}
        />
       
        <VictoryLine
          data={dummyData}
          interpolation="monotoneX" // Smooth curve
          style={{
            data: {
              stroke: "#1D4ED8",
              strokeWidth: 2,
            },
            labels: {
              fill: "#1D4ED8",
              fontSize: 10,
            },
          }}
          animate
        />
      </VictoryChart>
    </View>
  );
}
