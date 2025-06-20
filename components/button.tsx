import {Text, Pressable} from 'react-native';
import { Link } from 'expo-router';
import {useNavigation} from 'expo-router';

type Props = {
    text: string;
}

export default function Button({text}: Props){
    const navigation = useNavigation();
   
    return(
           <Pressable className = 'w-64 h-32 bg-white content-center justify-center rounded-xl m-5' ><Link href = "/manualLog"><Text className = 'text-center'>{text}</Text></Link></Pressable> 
    )
}