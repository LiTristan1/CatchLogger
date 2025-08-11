import { Picker } from "@react-native-picker/picker";
import {View,StyleSheet} from 'react-native';
type Props <T = number | string> = {
    selectedValue: T
    onValueChange: (val: T) => void
    options: T[]
    unit: string
    size: number
}
//UI component to select the size of the catch
//very similar to /weatherPicker but has size option for styling 
export default function SizePicker<T extends number | string>({selectedValue,onValueChange,options,unit,size}: Props<T>){
    const Item: any = Picker.Item;

    return(
        <View>
            <Picker
                selectedValue = {selectedValue}
                onValueChange = {(v) => onValueChange(v)}
                accessibilityLabel="Styled Picker Accessibility Label"
                style = {[styles.picker, {width: size}]}
            >
                {options.map((val,index) => {
                    return(
                        <Item
                            key = {index}
                            label = {`${val} ${unit}`}
                            value = {val}
                        >

                        </Item>
                    )
                })}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
     picker: {
        height: 200,
        position: "relative",
        bottom: 70
    },
})