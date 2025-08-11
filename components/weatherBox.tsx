import { View, Text, Image } from 'react-native';

type Props = {
  time: number;
  image?: string;
  temp: number;
};
//UI component to display weather information at specific time for current date
export default function WeatherBox({ time, image, temp }: Props) {
  return (
    <View className="w-20 h-28 bg-white rounded-xl items-center justify-around p-2 shadow-md mx-1">
      <Text className="text-sm text-gray-700">{time}:00</Text>
      {/**UPDATE image display based on weather info (e.g. cloud, sun etc) */}
      {image && (
        <Image
          source={{ uri: image }}
          className="w-8 h-8"
          resizeMode="contain"
        />
      )}

      <Text className="text-base font-semibold text-blue-700">
        {temp}°C
      </Text>
    </View>
  );
}
