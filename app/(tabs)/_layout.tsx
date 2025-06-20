import {Tabs} from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout(){
    return (
        <Tabs
            screenOptions = {{
                  
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
                }}
             />
             
             <Tabs.Screen
                name = 'manualLog'
                options = {{
                    headerShown: false
                }}
             />
        </Tabs>
    )
}