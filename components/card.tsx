import {View,Text,ImageBackground,StyleSheet,Pressable} from 'react-native';
import {Log} from '../app/Store/LogSlice'
import { useRouter } from 'expo-router';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@/app/Store/Store';
import { setCurrLog } from '@/app/Store/CurrentDisplaySlice';
type cardProps = {
    data: Log
}


export default function Cards({data}: cardProps){
    const router = useRouter();
    const dispatch = useDispatch();
    const logs = useSelector((state: RootState ) => state.data.logs)
    
    function press(){
        const log = logs.find((log) => log.id === data.id);
        dispatch(setCurrLog(log ? log : null));
        router.push({ pathname: '/logsDisplay/[id]', params: {id: data.id}})
    }
    return(
        //Individial log display
        //use params to pass information
        <Pressable 
          onPress = {press} className = 'w-3/4 overflow-hidden rounded-2xl justify-center h-40 items-center m-10'>
            {/**Background image is catch */}
            <ImageBackground  source = {require('../images/CardDevImage.jpg')}
            resizeMode = "cover"
            className = 'w-full h-full justify-center border-2 border-black flex-1 text-white p-16'
            imageStyle = {{borderRadius: 16}}
        >
            {/**Brief info on log */}
            <Text>{data.date}</Text>
            <Text>{data.location.place}</Text>
            <Text>{data.catch.name}</Text>
        
        </ImageBackground>

        
        </Pressable>
        
       
    )
}

const styles = StyleSheet.create({
    bgImage: {
        flex:1,

    }
})