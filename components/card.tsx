import { View, Text, ImageBackground, Pressable } from 'react-native';
import { Log } from '../app/Store/LogSlice';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrLog } from '@/app/Store/CurrentDisplaySlice';

type cardProps = {
  data: Log;
};

//UI component for each log in the logs.tsx file
export default function Cards({ data }: cardProps) {
  const router = useRouter();
  const dispatch = useDispatch();


  function press() {
    //set currentLog displayed via store
    dispatch(setCurrLog(data ? data : null));
    router.push({ pathname: '/logsDisplay/[id]', params: { id: data.id } });
  }

  return (
    <Pressable
      onPress={press}
      className="w-3/4 h-40 rounded-2xl overflow-hidden m-4"
    >
      {/**store image of catch in the background */}
      <ImageBackground
        source={{ uri: data.catch.image }}
        resizeMode="cover"
        className="flex-1 w-full h-full justify-end border-2 border-black"
        imageStyle={{ borderRadius: 16 }}
      >
        {/* Dark overlay behind text  */}
       
        <View className="bg-black bg-opacity-50 px-4 py-3 rounded-b-2xl">
           {/**synopsis of catch infoo */}
          <Text className="text-white text-sm font-bold">{data.date}</Text>
          <Text className="text-white text-sm">{data.location.place}</Text>
          <Text className="text-white text-sm italic">{data.catch.name}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
