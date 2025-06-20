import {Text, View,TouchableOpacity,Pressable, Button,StyleSheet} from 'react-native';
import {CameraView,CameraMode,useCameraPermissions} from 'expo-camera';
import {useState,useRef} from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import {useDispatch,useSelector} from 'react-redux';
import {RootState,AppDispatch} from '../Store/Store'
import {setPhotoUri,setFacing} from '../Store/CameraSlice';
import { setCatchImage } from '../Store/EntrySlice';
import {useRouter} from 'expo-router';
export default function Camera(){
    //const[facing,setFacing] = useState<CameraType>('back');
    //move permissions to store so both manual and camera log can use it 
    const [permissions,requestPermissions] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [mode,setMode] = useState<CameraMode>("picture");
    const [recording, setRecording] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    
    const photoUri = useSelector((state: RootState) => state.camera.latestPhotoUri);
    const facing = useSelector((state: RootState) => state.camera.facing);
    const router = useRouter();
    //if camera not enabled then dont give take picture option
    if(!permissions){
        return (
            <View><Text>Camera perms not granted</Text></View>
        )
    }

    //if user hasnt indicated perms then ask for perms
    if(!permissions.granted){
        return (
            <View>
                <Text> We need your permission to access camera</Text>
                <Button onPress = {requestPermissions} title = "grant permissions" />
            </View>
        )
    }
   
    //take a photo
    async function takePhoto(){
      console.log("Here");
      const photo = await ref.current?.takePictureAsync();
      if(photo){
        dispatch(setPhotoUri(photo.uri)); //stores copy to camera
        dispatch(setCatchImage(photo.uri)); //stores copy to current log
      }
      router.push('/logProcess/ConfirmPhoto');
    }
    //turn camera the other way
    function toggleCameraFacing(){
        dispatch(setFacing());
    }
    function cancel(){
      router.push('/(tabs)/manualLog');
    }
    return (
        <View style={styles.container}>
          <CameraView 
            style = {styles.camera} 
            facing={facing}
            ref = {ref}
            mode = {mode}
            mute = {false}
            responsiveOrientationWhenOrientationLocked
          >
            <View className = 'flex-row justify-between items-center absolute bottom-5 bg-transparent w-full px-10'>

            <TouchableOpacity>
              <Pressable onPress = {cancel}><Text className = 'text-white text-lg'>Cancel</Text></Pressable>
            </TouchableOpacity>
            <TouchableOpacity className="justify-center items-center">
              <Pressable className="rounded-full bg-white w-20 h-20 border-4 border-grey" onPress = {takePhoto}/>
            </TouchableOpacity>

            <TouchableOpacity className = ''>
              <Pressable onPress = {toggleCameraFacing} ><Ionicons name="camera-reverse" size={48} color="white" /></Pressable>
            </TouchableOpacity>
               
            </View>
          </CameraView>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        position: "relative"
      },
      
      camera: {
        flex: 1,
        alignItems: "center"
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
      },
      button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
    });