import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import {useState,useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import Line from '../../components/line';
import {points} from '../../components/line';
import WeatherGraphBox from '@/components/weatherGraphBox';
import { VictoryLabel } from 'victory-native';
export default function Weather() {
  //URL for weather stats for specific species (store in .env later)
  const URL = "http://192.168.2.18:3500/logStats"
  //state for horizontala scroll
  const[scrollEnabled,setScrollEnabled] = useState<boolean | undefined>(true);

  //state for tetmperature
  const[fishData,setFishData] = useState<points[]| null>(null);
  //get current log info
  const log = useSelector((state: RootState) => state.currLog.log);

  
 const displayElements = [
  {
    label: 'Air Temperature',
    value: log?.weather.airTemp,
    unit: '°C'
  },
  {
    label: 'Water Temperature',
    value: log?.weather.waterTemp,
    unit: '°C'
  },
  {
    label: 'Water Clarity',
    value: log?.weather.waterClarity,
    unit: ''
  },
  {
    label: 'Wind Speed',
    value: log?.weather.windSpeed,
    unit: 'km/h'
  },
  {
    label: 'Wind Direction',
    value: log?.weather.windDirection,
    unit: "°"
  },
  {
    label: 'Barometric Pressure',
    value: log?.weather.barometric,
    unit: 'hPa'
  },
  {
    label: 'Cloud Cover',
    value: log?.weather.cloudCover,
    unit: ''
  },
  {
    label: 'Precipitation',
    value: log?.weather.precipitation,
    unit: 'mm'
  },
  {
    label: 'Moon Phase',
    value: log?.weather.moonPhase,
    unit: ''
  }
];

  useEffect(() => {

    //get species specific info from backend
    console.log("Inside useEffect")
    async function getFishData(){
      try{
        const token = await SecureStore.getItemAsync('accessToken');
        //console.log("Getting response");
        const response = await fetch(`${URL}/${log?.catch.name}`,{
          method: 'GET',
          headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        console.log("setting data");

        setFishData(await response.json());
      }catch(err){
        console.log(err);
      }
    }
    getFishData();
    
  },[])

  useEffect(() => {
    console.log("Temp Data Changed");
    console.log(fishData);
  },[fishData])
  
  
  return (
    <ScrollView 
       contentContainerStyle={styles.scrollContent}
  keyboardShouldPersistTaps="handled"
  scrollEnabled={scrollEnabled}
    >
      <LinearGradient
        colors={['rgba(0, 180, 255, 0.4)', 'transparent']}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      
    <Text style={styles.title}>Weather Conditions</Text>
    <View className = 'justiffy-center items-center gap-10'>
      {
        fishData ? (
      displayElements.map((value,index) => {
        
        return(
          <WeatherGraphBox key = {index} label = {value.label} value = {value.value} unit = {value.unit} data = {fishData}/>
        )
      })
    ) : (
      <View>
        <Text>Loading...</Text>
      </View>
    )
    }
    </View>
    
        



{/**graph for catch frequency to temperature */}


    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center'
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
 


});
