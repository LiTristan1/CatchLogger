import {View, Text, Pressable,TextInput,Keyboard,TouchableWithoutFeedback,Image,StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useState} from 'react';
import {useRouter} from 'expo-router';
import {useSelector,useDispatch} from 'react-redux';
import {RootState,AppDispatch} from '../Store/Store';
import * as ImagePicker from 'expo-image-picker';
import Camera from './Camera';
import Feather from '@expo/vector-icons/Feather';
import { setCatchName,setCatchImage} from '../Store/EntrySlice';
import {setPhotoUri} from '../Store/CameraSlice'
import {Picker} from '@react-native-picker/picker';

export default function Species(){
    const router = useRouter();
    const  [text,setText] = useState<string>("");
    const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
    const [catchVal,setCatchVal] = useState<string | null>("Largemouth Bass");
    const dispatch = useDispatch<AppDispatch>();
    const photoURI = useSelector((state: RootState) => state.camera.latestPhotoUri);

    //array of all possible freshwather species (needs to be updated)
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

    

    const Item: any = Picker.Item;
    
    function next(){
        //set current information and move on to location info
        dispatch(setCatchImage(photoURI))
        dispatch(setCatchName(catchVal))
        router.push('/logProcess/Location');
    }

    //function to set theh camera view
    async function handleTakingPicture(){
        setIsTakingPicture(true);
    }

    async function selectPhoto(){

        {/**get picture from user device library */}
        const perms = await ImagePicker.requestCameraPermissionsAsync();

        if(perms.status !== 'granted'){
             alert('Permission to access media library is required!');
             return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images","videos"],
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })

        if(!result.canceled && result.assets.length > 0){
            dispatch(setPhotoUri(result.assets[0].uri))
        }
        

        

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
            {/**
             * picker for the catch species
             */}
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
                {
                    /**seperator for trout and salmon logging */
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
                                value = {value}
                            />
                        )
                    })
                }
                
            </Picker>

            
            
            <Pressable onPress = {handleTakingPicture} className = 'rounded-lg border-2 bg-white border-black w-4/5 h-48 justify-center items-center bottom-14'>
                {/**display image if already got image */}
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
            {/** option to upload an image instead */ }
            <Pressable className = 'justfy-center items-center bottom-10' onPress = {selectPhoto}><Text>Upload Image</Text></Pressable>
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
