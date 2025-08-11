import {View,Text,Image,Pressable} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {AppDispatch,RootState} from '../Store/Store';
import {useRouter} from 'expo-router';
import { setCatchImage } from '../Store/EntrySlice';
export default function ConfirmPhoto(){
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    //get the image lateset captured by the camera
    const photoURI = useSelector((state: RootState) => state.camera.latestPhotoUri);
 
    function returnBack(){
        //store the image in the log
        dispatch(setCatchImage(photoURI));
        //go back to main page
        router.push('/(tabs)/manualLog');
    }
    return(
        <View className = 'w-full h-full'>
            {
                photoURI? (
                    <View className = 'flex-1 w-full h-full justify-center items-center'>
                        <Image
                source = {{uri: photoURI}}
                className = 'flex-1 w-full h-full'
                />

                    <Pressable className = 'absolute justify-center items-center bottom-10' onPress = {returnBack}><Text className = 'text-white text-lg'>Next</Text></Pressable>
                    </View>

                    
                
                
                
                )
                : (
                    
                    <Text>Error Rendering Photo. Please Try Again!</Text>
                )
            }

            
        </View>
    )
}