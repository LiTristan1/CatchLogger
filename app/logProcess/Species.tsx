import {View, Text, Pressable,TextInput,Keyboard,TouchableWithoutFeedback,Image,StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useState,useEffect} from 'react';
import {useRouter} from 'expo-router';
import {useSelector,useDispatch} from 'react-redux';
import {RootState,AppDispatch} from '../Store/Store';
import {CameraView,CameraType,CameraMode,useCameraPermissions} from 'expo-camera';
import Camera from './Camera';
import Feather from '@expo/vector-icons/Feather';
import { setCatchName,setCatchImage} from '../Store/EntrySlice';
import {Picker} from '@react-native-picker/picker';

export default function Species(){
    const router = useRouter();
    const  [text,setText] = useState<string>("");
    const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
    const [catchVal,setCatchVal] = useState<string | null>("Largemouth Bass");
    const dispatch = useDispatch<AppDispatch>();
    const photoURI = useSelector((state: RootState) => state.camera.latestPhotoUri);

    const popularList = [
        "Largemouth Bass",
        "Smallmouth Bass",
        "Northern Pike",
        "Musky",
        "Walleye (Yellow Pickerel)",
        "Chain Pickerel",
        "Sauge",
        "Bluegill",
        "Yellow Perch",
        "Pumpkin Seed",
        "Black Crappie",
        "White Crappie",
        "Common Carp",
        "Bullhead Catfish",
        "Channel Catfish",
        "Flathead Catfish",
        "Freshwater Drum (Sheephead)",
        "Lake Whitefish",
        "Sturgeon"
    ]

    const SalmonAndTrout = [
        "Chinook Salmon",
        "Coho Salmon",
        "Steelhead Trout",
        "Brown Trout",
        "Lake Trout",
        "Cuttthroat Trout",
    ]

    const baitFish = [
        "Minnow"
    ]
    const Item: any = Picker.Item;
    
    function next(){
        dispatch(setCatchImage(photoURI))
        dispatch(setCatchName(catchVal))
        router.push('/logProcess/Location');
    }
    async function handleTakingPicture(){
        setIsTakingPicture(true);
    }

    //if picture button clicked then dispay the camera for the user to access
    if(isTakingPicture){
        return (
            <Camera/>
        )
    }
    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View className = 'justify-center items-center flex-1 gap-10'>
               <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0, 180, 255, 0.6)', 'transparent']}
                    style = {styles.background}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1}}
                />
            <Text className = 'text-lg text-semibold text-white'>Enter Name of Species</Text>

            <Picker
                selectedValue={catchVal}
                onValueChange = {(v) => setCatchVal(v)}
                accessibilityLabel="Styled Picker Accessibility Label"
                style = {styles.picker}
            >
                
                {
                    popularList.map((value,index) => {
                        return(
                            <Item 
                                key = {index}
                                label = {value}
                                value = {value}
                            />
                        )
                    })
                }

                <Item
                    label = "--- Trout & Salmon ---"
                    value = ""
                    enabled = {false}
                    key = {popularList.length}
                />
                {
                    SalmonAndTrout.map((value,index) => {
                        return(
                            <Item
                                key = {index}
                                label = {value}
                                
                            />
                        )
                    })
                }
                
            </Picker>

            
        
            <Pressable onPress = {handleTakingPicture} className = 'rounded-lg border-2 bg-white border-black w-4/5 h-48 justify-center items-center bottom-14'>
                {
                    photoURI? (
                        <Image
                            source = {{uri: photoURI}}
                            style = {{resizeMode: 'contain'}}
                            className = 'flex-1 w-full h-full'
                        />
                    ) : (
                        <Feather name = "camera" size = {48}/>
                    )
                }
               
            </Pressable>
            
            <Pressable className = 'justfy-center items-center bottom-10'><Text>Upload Image</Text></Pressable>
            <Pressable className="border border-white px-6 py-3 rounded-xl mt-2 active:opacity-80" onPress = {next}><Text>Next</Text></Pressable>

        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    background:{
        position: 'absolute',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        height: 1000,
        justifyContent: "center",
        paddingHorizontal: 16
    },
    picker: {
        width: 300,
        height: 200,
        position: "relative",
        bottom: 60
    },
   
})
