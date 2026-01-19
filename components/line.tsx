import React from 'react';

import { useState} from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis
} from 'victory-native'

import {ScrollView} from 'react-native'
export type points = {
  xAxis: number[];
  yAxis: number[];
};

type Props = {
  xLabel: string;
  yLabel: string;
  data: points | null;
};




export default function LineGraph({ xLabel, yLabel, data }: Props) {
  let yMax = 100;
  let xMax = 100;
  let xMin = 0;
  if(data != null){
     yMax = Math.max(...data.yAxis)
     xMax = Math.max(...data.xAxis)
     xMin = Math.min(...data.xAxis)
  }

  let yTickIntervals: number[] = []
  let index = 0;
  for(let i = 0; i < yMax; i += yMax/5){
    yTickIntervals[index] = i;
    index++;
  }

  let xTickIntervals: number[] = [];
  let indexX = 0;
  for(let i = xMin; i < xMax; i += xMax/5){
    xTickIntervals[indexX] = i;
    indexX++;
  }
  return(
    <ScrollView horizontal = {true} style = {{
      maxHeight: 300,
      padding: 10
    }}>
      <VictoryChart domainPadding = {20} animate  padding={{ top: 20, bottom: 60, left: 70, right: 20 }} >
        <VictoryAxis
        label = {"XAxis"}
          tickValues = {
            xTickIntervals
          }
          tickFormat = {(tick) => `${tick}`}
        
        />
        <VictoryLine
          data = {data?.xAxis.map((d,i) => (
            {
              x: d,
              y: data.yAxis[i]
            }
          ))}
        
        />

        <VictoryAxis
          label = {"Y-Axis"}
          dependentAxis
          tickValues = {yTickIntervals}
          tickFormat={(tick) => `${tick}`}
          
        
        />
      </VictoryChart>
    </ScrollView>
  )
  
}
