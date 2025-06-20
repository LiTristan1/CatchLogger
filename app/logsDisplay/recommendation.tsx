import { ScrollView,Text,StyleSheet,View} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState,useEffect } from 'react'
import WeatherBox from '@/components/weatherBox';
import WeatherDayBox from '@/components/weatherDayBox';
import { useSelector } from 'react-redux'
export default function Recommendation(){
    const daysOfWeek = ["Sunday","Tuesday","Wednesday","Thursday","Friday","Saturday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    const [time,setTime] = useState<number[]>([]);
    const [dayOfWeekIndex,setDayOfWeekIndex] = useState<number>(0);
    useEffect(() => {
        //get curr date time
        const date = new Date();
        const now = date.getHours();
        const day = date.getDay()
        setDayOfWeekIndex(day);
        //set an array to wrap around 24
        const timeArray = Array.from({length: 24}, (_,i) => (now + i) % 24);
        //store the time Array
        setTime(timeArray);
    },[])
    return(
        <ScrollView
            contentContainerStyle = {{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
             <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0, 180, 255, 0.6)', 'transparent']}
                    style = {styles.background}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1}}
            />
            
            <Text className = "text-2xl font-bold text-blue-800">Today</Text>

            <ScrollView
                horizontal = {true}
                contentContainerStyle = {{  
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10
                }}
            >
                {
                    time.map((val,index) => {
                        return(
                            <WeatherBox
                                key = {index}
                                time = {val}
                                image = {""}
                                temp = {12}
                            >

                            </WeatherBox>
                        )
                    })
                }

                

            </ScrollView>
            <Text className="text-2xl font-bold text-blue-800">Recommendation</Text>
            <Text className="text-xl font-semibold text-gray-700">Two Week Forecast</Text>
            <View className = 'items-center w-full mt-4 space-y-4'>


                
                {
                    daysOfWeek.map((val,index) => {
                        return(
                            <WeatherDayBox

                                key = {index}
                                weekDay = {index === 0? "Today":daysOfWeek[(index + dayOfWeekIndex) % 7]}
                                minVal = {23}
                                maxVal = {30}
                                windSpeed = {24}
                                isRainy = {true}
                                isSunny = {true}
                                rainDepth = {12}
                                recommended = {"ideal"}
                                
                            />
                        )
                    })
                }
                </View>
          

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background:{
        position: 'absolute',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        height: 1000,
        justifyContent: "center",
        paddingHorizontal: 16
    },
})