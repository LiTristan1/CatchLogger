import { View, Text, ScrollView, Image, StyleSheet,Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
export default function Summary() {
  const id = useSelector((state: RootState) => state.entry.id);
  const owner = useSelector((state: RootState) => state.login.username);
  const date = useSelector((state: RootState) => state.entry.date);

  // Location
  const place = useSelector((state: RootState) => state.entry.location.place);
  const placeObj = useSelector((state: RootState) => state.entry.location.placeObj);
  const system = useSelector((state: RootState) => state.entry.location.system);
  const latitude = useSelector((state: RootState) => state.entry.location.latitude);
  const longitude = useSelector((state: RootState) => state.entry.location.longitude)
  // Catch
  const catchName = useSelector((state: RootState) => state.entry.catch.name);
  const catchWeight = useSelector((state: RootState) => state.entry.catch.weight);
  const catchLength = useSelector((state: RootState) => state.entry.catch.length);
  const catchTime = useSelector((state: RootState) => state.entry.catch.time);
  const catchImage = useSelector((state: RootState) => state.entry.catch.image);

  // Gear
  const gearType = useSelector((state: RootState) => state.entry.gear.liveOrArtificial);
  const gearName = useSelector((state: RootState) => state.entry.gear.name);

  // Weather
  const airTemp = useSelector((state: RootState) => state.entry.weather.airTemp);
  const waterTemp = useSelector((state: RootState) => state.entry.weather.waterTemp);
  const waterClarity = useSelector((state: RootState) => state.entry.weather.waterClarity);
  const windSpeed = useSelector((state: RootState) => state.entry.weather.windSpeed);
  const windDirection = useSelector((state: RootState) => state.entry.weather.windDirection)
  const barometric = useSelector((state: RootState) => state.entry.weather.barometric);
  const cloudCover = useSelector((state: RootState) => state.entry.weather.cloudCover);
  const precipitation = useSelector((state: RootState) => state.entry.weather.precipitation);
  const moonPhase = useSelector((state: RootState) => state.entry.weather.moonPhase);
  //url for backend (store in .env file later on)
  const URL = "http://192.168.2.18:3500/log"
  async function submit(){
    //post this to backend
    const token = await SecureStore.getItemAsync('accessToken');
    //give all data to backend
    await fetch(URL, {
      method: "POST",
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        owner: owner,
        date: date,
        location: {
        place: place,
        placeObj: placeObj,
        latitude: latitude,
        longitude: longitude,
        system: system
      },
      catch: {
        name: catchName,
        weight: catchWeight,
        length: catchLength,
        time: catchTime,
        image: catchImage
      },
      gear: {
        liveOrArtificial: gearType,
        name: gearName,
      },
      weather: {
        airTemp: airTemp,
        waterTemp: waterTemp,
        waterClarity: waterClarity,
        windSpeed: windSpeed,
        windDirection: windDirection,
        barometric: barometric,
        cloudCover: cloudCover,
        precipitation: precipitation,
        moonPhase: moonPhase,
      },
      })
    })

    console.log("Submitting");
    console.log(owner);
  }

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
                            // Background Linear Gradient
                            colors={['rgba(0, 180, 255, 0.6)', 'transparent']}
                            style = {styles.background}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1}}

                
                        />
      <View style = {styles.section}>
        {/**if image exists display it or indicate there is no image */}
        {catchImage? (
          <Image
            source={{ uri: catchImage }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
            <Text style = {styles.sectionTitle}>No Image</Text>
        )
        
        }
      </View>
      <View style={styles.section}>
        {/**display catch specific info */}
        <Text style={styles.sectionTitle}>Catch</Text>
        
        <Text style={styles.text}>Species: {catchName}</Text>
        <Text style={styles.text}>Weight: {catchWeight} lb</Text>
        <Text style={styles.text}>Length: {catchLength} in</Text>
        <Text style={styles.text}>Time: {catchTime}</Text>
        <Text style = {styles.text}>Date: {date}</Text>
      </View>

      <View style={styles.section}>
        {/**display location info */}
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.text}>Place: {place}</Text>
        <Text style={styles.text}>System: {system? system: "Not Specified"}</Text>
      </View>
        {/**display gear info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gear</Text>
        <Text style={styles.text}>Type: {gearType ? 'Live' : 'Artificial'}</Text>
        <Text style={styles.text}>Name: {gearName? gearName: "Not Specified"}</Text>
      </View>

      <View style={styles.section}>
        {/**display weather info */}
        <Text style={styles.sectionTitle}>Weather</Text>
        <Text style={styles.text}>Air Temp: {airTemp}°C</Text>
        <Text style={styles.text}>Water Temp: {waterTemp}°C</Text>
        <Text style = {styles.text}>Water Clarity: {waterClarity}</Text>
        <Text style={styles.text}>Wind Speed: {windSpeed} km/h</Text>
        <Text style = {styles.text}>Wind Direction: {windDirection}°</Text>
        <Text style={styles.text}>Barometric: {barometric} hPa</Text>
        <Text style={styles.text}>Cloud Cover: {cloudCover ? cloudCover: "Not Specified"}</Text>
        <Text style={styles.text}>Precipitation: {precipitation} mm</Text>
        <Text style={styles.text}>Moon Phase: {moonPhase ? moonPhase: 'Not Specified'}</Text>
      </View>
        {/**button to submit log */}
      <Pressable style = {styles.button} onPress = {submit}><Text>Submit</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  section: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
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
    button: {
  backgroundColor: '#0077cc',
  paddingVertical: 14,
  paddingHorizontal: 32,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
  width: '100%',
  maxWidth: 400,
  elevation: 2,
},
});
