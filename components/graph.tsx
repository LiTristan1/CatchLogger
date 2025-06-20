import {View} from 'react-native';
import {
    VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine
} from 'victory-native';


//Define parameter list types
type props = {
    data: object[],
    xLabel: string,
    yLabel: string
}
//Function to graph based on data and give xLabel and yLabel
export default function graph({data,xLabel,yLabel} : props){
    return(
        <View>
            <VictoryChart
                theme = {VictoryTheme.material}
            >
                {/**X-axis */}
            <VictoryAxis/>
            {/**Y-axis */}
            <VictoryAxis dependentAxis/>
            <VictoryLine
                data = {data}
                x = 'xLabel'
                y = 'yLabel'
            >
            </VictoryLine>
            </VictoryChart>
        </View>
    )
}