import { View, Text, TextInput, Pressable, TouchableWithoutFeedback,Keyboard,StyleSheet} from 'react-native';
import {useState,useEffect} from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import SizePicker from '../../components/sizePicker'
import { useDispatch } from 'react-redux';
import {setDate, setCatchTime} from '../Store/EntrySlice';
export default function Extra() {
  const dispatch = useDispatch();
  const Item: any = Picker.Item;
  const router = useRouter();
  const[timeIsVisible, setTimeIsVisible] = useState<boolean>(false);
  const[dateIsVisible,setDateIsVisible] = useState<boolean>(false);
  const[time,setTime] = useState<string | null>(null);
  const[dateVal,setDateVal] = useState<string | null>(null);
  const[weight,setWeight] = useState<number>(0);
  const[oz,setOz] = useState<number>(0);
  const[length,setLength] = useState<number>(0);

  const weightOptions = Array.from({length: 151}, (_,i) => i);
  const weightOzOptions = Array.from({length: 16}, (_,i) => i);
  const lengthOptions = Array.from({length: Math.round(70/0.1) + 1}, (_,i) => parseFloat((i * 0.1).toFixed(1)))
  useEffect(() => {
    const now = new Date();
    
    setTime(now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }))

    setDateVal(now.toLocaleDateString([], {
      month: 'long',
      day: 'numeric',
      year:'numeric'
    }))

  },[])

  function selectTime(e: Date){
    setTime(e.toLocaleTimeString([],{
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }));
    hideTimePicker();
  }
  function hideTimePicker(){
    setTimeIsVisible(false);
  }
  function showTimePicker(){
    setTimeIsVisible(true);
  }
 

  function selectDate(e: Date){
    setDate(e.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }))

    hideDatePicker();
  }

  function hideDatePicker(){
    setDateIsVisible(false);
  }
  function showDatePicker(){
    setDateIsVisible(true);
  }

  function next(){
    dispatch(setCatchTime(time));
    dispatch(setDate(dateVal));
    router.push('/logProcess/Weather');
  }
  return (
    
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        
        
       
        
    <View className = 'w-full justify-center items-center gap-8'>
        <Text className="text-lg mb-4">Catch Information</Text>
              <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0, 180, 255, 0.6)', 'transparent']}
        style = {styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1}}
        
      />

      <View className = 'flex-row w-full justify-center relative top-16'>
        <SizePicker
          selectedValue = {weight}
          onValueChange = {setWeight}
          options = {weightOptions}
          unit = {"lb"}
          size = {150}
        />
        <SizePicker
          selectedValue = {oz}
          onValueChange = {setOz}
          options = {weightOzOptions}
          unit = {"oz"}
          size = {150}
        />
      </View>
        
        
        <View className = 'relative bottom-10 justify-center w-full items-center'>
        <SizePicker
          selectedValue = {length}
          onValueChange = {setLength}
          options = {lengthOptions}
          unit = {"in"}
          size = {300}
        >

        </SizePicker>
        </View>
        <View className = 'relative w-full justify-center items-center bottom-24 gap-10'>
        <DateTimePickerModal
          onConfirm = {selectTime}
          onCancel = {hideTimePicker}
          isVisible = {timeIsVisible}
          mode = "time"
         
        />

        

        <DateTimePickerModal
          onConfirm = {selectDate}
          onCancel = {hideDatePicker}
          isVisible = {dateIsVisible}
          mode = "date"
        />

      <Pressable onPress={showTimePicker} className="w-3/4 max-w-[400px] px-4 py-4 bg-white rounded-lg border-2 border-white">
  <Text className="text-lg text-black">{time ?? 'Select Time'}</Text>
</Pressable>

<Pressable onPress={showDatePicker} className="w-3/4 max-w-[400px] px-4 py-4 bg-white rounded-lg border-2 border-white">
  <Text className="text-lg text-black">{dateVal ?? 'Select Date'}</Text>
</Pressable>

<TextInput
  placeholder="Bait"
  placeholderTextColor="black"
  className="w-3/4 max-w-[400px] h-16 text-xl bg-white rounded-lg px-4 border-2 border-white"
/>

<Pressable className="bg-white border-2 border-black px-6 py-3 rounded-xl active:opacity-80">
  <Text className="text-xl text-black" onPress = {next}>Next</Text>
</Pressable>
</View>
        </View>
        
       
        
     
        
    
    </TouchableWithoutFeedback>
  );
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
    }
})
