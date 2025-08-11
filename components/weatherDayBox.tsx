import { View, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type Props = {
  weekDay: string | null;
  minVal: number;
  maxVal: number;
  windSpeed: number;
  isSunny: boolean;
  isRainy: boolean;
  rainDepth: number;
  recommended: string;
};

//UI component to give synopsis of weather for a specific day within the next 2 weeks
export default function WeatherDayBox({
  weekDay,
  minVal,
  maxVal,
  windSpeed,
  isSunny,
  isRainy,
  rainDepth,
  recommended,
}: Props) {
  //image displayed based on weataher its sunny or cloudly of windy
  const renderIcon = () => {
    if (isSunny && isRainy) {
      return <FontAwesome5 name="cloud-sun-rain" size={32} color="#2563EB" />;
    } else if (isSunny) {
      return <Feather name="sun" size={32} color="#FACC15" />;
    } else if (windSpeed >= 24) {
      return <Feather name="wind" size={32} color="#3B82F6" />;
    } else {
      return <View className="w-10 h-10 rounded-full bg-blue-500" />;
    }
  };

  return (
    <View className="w-11/12 max-w-sm bg-white rounded-2xl p-4 mb-4 shadow-md items-center space-y-3">
      {/**display day of week */}
      <Text className="text-lg font-semibold text-blue-800">{weekDay}</Text>

      {/* Weather Icon */}
      <View className="items-center justify-center">
        {renderIcon()}
      </View>

      {/* Temperature Range */}
      <View className="flex-row justify-between w-full px-4">
        <Text className="text-base text-gray-600">Min: {minVal}°C</Text>
        <Text className="text-base text-gray-600">Max: {maxVal}°C</Text>
      </View>

      {/* Wind and Rain */}
      <View className="flex-row justify-between w-full px-4">
        <Text className="text-base text-gray-600">Wind: {windSpeed} km/h</Text>
        <Text className="text-base text-gray-600">Rain: {rainDepth} mm</Text>
      </View>

      {/* Recommendation */}
      <Text
        className={`text-base font-semibold ${
          recommended === 'ideal'
            ? 'text-green-600'
            : recommended === 'ok'
            ? 'text-yellow-500'
            : 'text-red-500'
        }`}
      >
        {recommended === 'ideal'
          ? 'Recommended'
          : recommended === 'ok'
          ? 'Okay Conditions'
          : 'Not Ideal'}
      </Text>
    </View>
  );
}
