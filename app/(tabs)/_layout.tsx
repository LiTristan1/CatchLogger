import {Tabs} from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout(){
    return (
        <Tabs
            screenOptions = {{
                  animation: 'fade'
            }}
        >
            <Tabs.Screen 
                name = 'index' 
                options = {{
                    title: 'home', 
                    headerShown:false,
                    tabBarIcon: ({color,focused}) => (
                        <AntDesign name = {'home'} color = {color} size = {24} />
                    )
            }}/>
            <Tabs.Screen 
                name = 'logs'
                options = {{
                    title: 'Logs',
                    headerShown: false,
                    tabBarIcon:  ({color,focused}) => (
                        <MaterialCommunityIcons name = "notebook" color = {color} size = {24}/>
                    )
                }}
                
             />
             
             <Tabs.Screen
                name = 'manualLog'
                options = {{
                    title: 'New Entry',
                    headerShown: false,
                    tabBarIcon: ({color,focused}) => (
                        <Ionicons name="add-circle-sharp" size={24} color= {color} />
                    )
                }}
             />
        </Tabs>
    )
}