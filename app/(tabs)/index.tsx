import { Text, View, Pressable} from "react-native";
import Button from '../../components/button';

export default function Index() {
  
  return (
    <View
     className = 'justify-center items-center content-center bg-blue-950 w-full h-full'
    >
      
      <Button text = "Photo Recognition Logging" ></Button>
      <Button text = "Manual Logging"></Button>
      
    </View>
  )
}
