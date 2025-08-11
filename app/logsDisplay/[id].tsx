import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import { LinearGradient } from 'expo-linear-gradient';

import Bar from '../../components/bar'
export default function LogDisplay() {
  const log = useSelector((state: RootState) => state.currLog.log);
  const exampleData = [
    { x: 'Jan', y: 1 },
    { x: 'Feb', y: 2 },
    { x: 'Mar', y: 3 },
    { x: 'Apr', y: 15 },
    { x: 'May', y: 42 },
    { x: 'Jun', y: 56 },
    { x: 'Jul', y: 41 },
    { x: 'Aug', y: 45 },
    { x: 'Sept', y: 12 },
    { x: 'Oct', y: 16 },
    { x: 'Nov', y: 23 },
    { x: 'Dec', y: 14 },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 180, 255, 0.4)', 'transparent']}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {log ? (
          <>
           {/**display image of catcch */}
            <Image
              style={styles.image}
              source={{uri:log.catch.image}}
              resizeMode="cover"
            />
            <Text style={styles.header}>Summary</Text>

            <View style={styles.cardContainer}>
              {/**display catch specific information */}
              <View style={styles.cardDark}>
                <Text style={styles.cardTextLight}>Species: {log.catch.name}</Text>
                <Text style={styles.cardTextLight}>Weight: {log.catch.weight} lbs</Text>
                <Text style={styles.cardTextLight}>Length: {log.catch.length} cm</Text>
                <Text style={styles.cardTextLight}>Time Caught: {log.catch.time}</Text>
              </View>

              <View style={styles.cardLight}>
                {/**display location specific information */}
                <Text style={styles.cardTextDark}>Location: {log.location.place}</Text>
                <Text style={styles.cardTextDark}>Date: {log.date}</Text>
                <Text style={styles.cardTextDark}>Time: {log.catch.time}</Text>
                <Text style={styles.cardTextDark}>Gear: {log.gear.name}</Text>
                <Text style={styles.cardTextDark}>
                  Bait Type: {log.gear.liveOrArtificial ? 'Live' : 'Artificial'}
                </Text>
              </View>
            </View>

            {/**display graph showing catch frequency vs month */}
            <Text style={styles.subHeader}>Number of Catches per Month</Text>
            <Bar data = {exampleData}></Bar>

          </>
        ) : (
           
          <Text style={styles.loading}>Loading...</Text>
        )}
      </ScrollView>
    </View>
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
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 160,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#000',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginVertical: 16,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A8A',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    gap: 20,
    marginTop: 12,
  },
  cardDark: {
    backgroundColor: '#4B5563',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  cardLight: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  cardTextLight: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 4,
  },
  cardTextDark: {
    color: '#000',
    fontSize: 16,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#374151',
    marginTop: 12,
  },
  loading: {
    fontSize: 16,
    marginTop: 20,
    color: '#6B7280',
  },
});
