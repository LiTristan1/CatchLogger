import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { useState,useEffect } from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { points } from './line';
import Bar from './bar';
import LineGraph from './line';

type Props = {
    label: string,
    value: number | string | null | undefined,
    unit?: string,
    data: points[] | null
}

export default function WeatherGraphBox({ label, value, unit,data }: Props) {
    const [imageIcon, setImageIcon] = useState<string | null>("");
    const[iconColour,setIconColour]  = useState<string>("");
    const[useFulData,setUsefulData] = useState<points | null>(null);
    const[graphType,setGraphType] = useState<string>("");
    const[xLabel,setXLabel] = useState<string>("");
    const[yLabel,setYLabel] = useState<string>("Catch Frequency");
    //function to get the image icon corresponding to type of weather displayed
    //and the magnitude of its reading
    useEffect(() => {
         function getImageIcon(){
        switch(label){
            case "Air Temperature": {
                setXLabel("Air Temperature");
                setGraphType('line');
                setUsefulData(data ? data[0] : null);
                if(value && typeof(value) === "number"){
                    if(value <= 0){
                        
                        setImageIcon("cube")
                        setIconColour('blue')
                    }else if(value <= 15){
                        setImageIcon("wind")
                        setIconColour('blue')
                    }else if(value<=25){
                        setIconColour('yellow')
                        setImageIcon("sun")
                    }else{
                        setIconColour('red');
                        setImageIcon('fire-alt');
                    }
                }
                break;
            }
            case "Water Temperature": {
                setXLabel("Water Temperature");
                setGraphType('line');
                setUsefulData(data ? data[1] : null);
                if(value && typeof(value) === "number"){
                    if(value <= 0){
                        setIconColour('blue');
                        setImageIcon("cube");
                    }else if(value <= 15){
                        setIconColour('blue');
                        setImageIcon("wind");
                    }else if(value <= 25){
                        setIconColour('yellow')
                        setImageIcon("sun")
                    }else{
                        setIconColour('red')
                        setImageIcon("fire-alt")
                    }
                }
                break;
            }
             case "Water Clarity": {
                setXLabel("Water Clarity");
                setGraphType('bar');
                setUsefulData(data? data[2] : null);
                setImageIcon('water');
                if(typeof(value) === 'string'){
                    if(value.includes('Crystal Clear')){
                        setIconColour('turquoise')
                    }else if(value.includes("Clear")){
                        setIconColour('blue')
                    }else if(value.includes("Slightly Muddy")){
                        setIconColour("brown")
                    }else{
                        setIconColour("black")
                    }
                }

                break;
            }
             case "Wind Speed": {
                setXLabel("Wind Speed");
                setGraphType('line');
                setUsefulData(data? data[3] : null);
                setImageIcon("wind");
                if(value && typeof(value) === "number"){
                    if(value <= 5){
                        setIconColour("green");
                    }else if(value <= 22){
                        setIconColour("yellow");
                    }else{
                        setIconColour("red");
                    }
                }
                break;
            }
             case "Barometric Pressure": {
                setXLabel("Barometric Pressure")
                setGraphType('line');
                setUsefulData(data? data[5] : null);
                setImageIcon('tachometer-alt');

                if(value && typeof(value) === "number"){
                    if(value <= 1000){
                        setIconColour("blue");
                    }else if(value <= 1020){
                        setIconColour("green")
                    }else{
                        setIconColour("red")
                    }
                    
                }
                
                break;
            } case "Cloud Cover": {
                setXLabel("Cloud Cover");
                setGraphType('bar');
                setUsefulData(data? data[6] : null);
                if(value && typeof(value) === "string"){
                    if(value.includes('Sunny')){
                        setImageIcon("sun")
                        setIconColour("yellow");
                    }else if(value === "Partly Cloudy"){
                        setImageIcon("cloud");
                        setIconColour("green");
                    }else if(value === "Mostly Cloudy"){
                        setImageIcon("cloud");
                        setIconColour("yellow")
                    }else if(value === "Overcast"){
                        setImageIcon("cloud");
                        setIconColour("grey");
                    }else{
                        setImageIcon("cloud-meatball");
                        setIconColour("grey");
                    }

                }
                break;
            }
             case "Precipitation": {
                setXLabel("Precipitation");
                setGraphType('line');
                setUsefulData(data ? data[7] : null);
                setImageIcon("cloud-rain")
                if(value && typeof(value) === "number"){
                    if(value <= 2.5){
                        setIconColour("green");
                    }else if(value <= 7.6){
                        setIconColour("yellow");
                    }else{
                        setIconColour("red");
                    }
                }
                break;
            }
             case "Moon Phase": {
                setXLabel("Moon Phase");
                setGraphType('bar');
                setUsefulData(data? data[8] : null);
                setImageIcon("moon");
                setIconColour("grey");
                break;
            }
        }
    }
    getImageIcon();

    
    },[value,label,data])
   
    return (
        <View style={styles.box}>
            <Text style={styles.label}>{label}</Text>
            <View className = 'flex flex-row gap-10'>
                <Text style={styles.value}>
                    {value} {unit}
                </Text>
                <FontAwesome5 name = {imageIcon} color = {iconColour} size = {48}/>
            </View>
            
            {/* Graph placeholder */}
            {
                graphType === 'bar' ? (
                    
                        <ScrollView horizontal = {true}>
                            <Bar
                        data={(useFulData?.xAxis ?? []).map((x, i) => ({
                            x: String(x),
                            y: useFulData?.yAxis?.[i] ?? 0,
                        }))}
                />
                        </ScrollView>
                          
                ):
                (
                    <View className = "max-h-24">
                        <LineGraph xLabel = {""} yLabel = {""} data = {useFulData}/>
                    </View>
                )
            }

        </View>
    )
}




const styles = StyleSheet.create({
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        minHeight: 300,
        backgroundColor: '#fff',        // Card background
        borderWidth: 2,                 // Border thickness
        borderColor: 'black',            // Border color
        borderRadius: 12,               // Rounded corners
        padding: 16,                    // Space inside the box
        shadowColor: '#000',            // Shadow (iOS)
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4                     // Shadow (Android)
    },
    label: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    value: {
        fontSize: 18,
        fontWeight: '400',
        color: '#333',
        padding: 10
    }
});
