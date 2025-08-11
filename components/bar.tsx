import React from 'react';
import { View } from 'react-native';
// @ts-ignore
import { BarChart, Grid,XAxis,YAxis } from 'react-native-svg-charts';

type dataPoint = {
    x: string,
    y: number
}
type props = {
    data: dataPoint[]
}
export default function Bar({data}: props) {
  

  return (
    <View style={{ height: 200, width: '100%', padding: 10 }}>
        <View className = 'flex flex-row flex-1'>

        <YAxis
            data = {data}
            yAccessor = {({item}: {item:dataPoint}) => item.y}
            svg = {{fontSize: 12}}
            contentInset={{ top: 10, bottom: 10 }}
            numberOfTicks={5}
        >


        </YAxis>
      <BarChart
        style={{ flex: 1 }}
        data={data}
        svg={{ fill: 'blue' }}
        yAccessor={({item}: {item:dataPoint}) => item.y} 
        contentInset={{ top: 10, bottom: 10 }}
        
      >
    
      

      </BarChart>
      </View>
        <XAxis
            data = {data}
            formatLabel = {(value:number,index: number) => data[index].x}
            contentInset ={{left: 20,right:20}}
        ></XAxis>
      

        
    </View>
  );
}
