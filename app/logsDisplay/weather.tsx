import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import {useState,useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import Line from '../../components/line';
import {point} from '../../components/line'
export default function Weather() {
  //URL for weather stats for specific species (store in .env later)
  const URL = "http://192.168.2.18:3500/logStats"
  //state for horizontala scroll
  const[scrollEnabled,setScrollEnabled] = useState<boolean | undefined>(true);

  //state for tetmperature
  const[tempData,setTempData] = useState<point| null>(null);
  //get current log info
  const log = useSelector((state: RootState) => state.currLog.log);
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

        console.log("setting temp data");
        setTempData(await response.json());
      }catch(err){
        console.log(err);
      }
    }
    getFishData();

  },[])

  useEffect(() => {
    console.log("Temp Data Changed");
    console.log(tempData);
  },[tempData])
  
  
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
        
  <View style={styles.weatherBox}>
    {/**display weather info */}
  <Text style={styles.label}>
    Air Temperature: <Text style={styles.value}>{log?.weather.airTemp}°C</Text>
  </Text>
  <Text style={styles.label}>
    Water Temperature: <Text style={styles.value}>{log?.weather.waterTemp}°C</Text>
  </Text>
  <Text style={styles.label}>
    Water Clarity: <Text style={styles.value}>{log?.weather.waterClarity}</Text>
  </Text>
  <Text style={styles.label}>
    Wind Speed: <Text style={styles.value}>{log?.weather.windSpeed} km/h</Text>
  </Text>
  <Text style={styles.label}>
    Barometric Pressure: <Text style={styles.value}>{log?.weather.barometric} hPa</Text>
  </Text>
  <Text style={styles.label}>
    Cloud Cover: <Text style={styles.value}>{log?.weather.cloudCover}</Text>
  </Text>
  <Text style={styles.label}>
    Precipitation: <Text style={styles.value}>{log?.weather.precipitation} mm</Text>
  </Text>
  <Text style={styles.label}>
    Moon Phase: <Text style={styles.value}>{log?.weather.moonPhase}</Text>
  </Text>
</View>

{/**graph for catch frequency to temperature */}
<Line data = {tempData} xLabel = {"Temperature"} yLabel = {"Catch Frequency"}></Line>



    
        
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
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  value: {
    fontWeight: '600',
    color: '#000',
  },
  weatherBox: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  paddingVertical: 20,
  paddingHorizontal: 24,
  width: '90%',
  marginTop: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 5, // Android shadow
  alignItems: 'flex-start',
},

});
