import {Text, View, TextInput,Pressable} from 'react-native';

import {useForm, useController,Control} from 'react-hook-form';
 
 type InputProps = {
     name: string;
     control: Control<any>;
 }
 
 export default function Input({name,control}: InputProps){
        const{field} = useController({
            control,
            defaultValue: '',
            name,
    })
//returns the form element
    return(
        <View className = 'justify-center items-center m-4'>
            <Text>{name}</Text>
             <TextInput 
             style={{
                width: 300, // ✅ Fixed width (number)
                borderWidth: 1, 
                borderColor: "black",
                padding: 10, 
                borderRadius: 5
              }}
            placeholder = {name}
            value = {field.value}
            onChangeText = {field.onChange}
            >
            
        </TextInput>
        </View>
       
    )
    }
