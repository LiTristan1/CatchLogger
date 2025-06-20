import {Text, View, TextInput,Pressable} from 'react-native';
import {useEffect} from 'react';
import {useRouter} from 'expo-router';
import Species from '../logProcess/Species';


export default function ManualLog(){
    const router = useRouter();

    return(
        <Species/>
    )

}