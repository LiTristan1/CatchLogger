import { View, Text, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const Item: any = Picker.Item;

type Props <T = string | number> = {
    label: string,
    selectedValue: T,
    onValueChange: (val:T) => void,
    options: T[],
    unit?: string
}
export default function WeatherPicker<T extends string | number>({
    label,
    selectedValue,
    onValueChange,
    options,
    unit = ''
}: Props<T>){
    return(
        <View className = 'justify-center items-center'>
            <Text style = {styles.subheader}>{label}</Text>

            <Picker
                selectedValue = {selectedValue}
                onValueChange = {(v) => onValueChange(v)}
                accessibilityLabel="Styled Picker Accessibility Label"
                style = {styles.picker}
            >
                {
                    options.map((val,index) => {
                        return(
                            <Item
                                key = {index}
                                label = {`${val} ${unit ?? ''}`}
                                value = {val}
                            />
                        )
                    })
                }
            </Picker>
        </View>
    )

}


const styles = StyleSheet.create({
     picker: {
        width: 300,
        height: 200,
        position: "relative",
        bottom: 50,
        
    },
    subheader: {
        width: 300,
        height: 30,
        maxWidth: 400,
        fontSize: 24,
        fontWeight: 600,
        backgroundColor: "white",
        borderRadius:12,
        borderColor: "white",
        textAlign: 'center'
    }
   
})