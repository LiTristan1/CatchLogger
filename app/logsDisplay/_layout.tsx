import {Tabs} from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Layout(){
    //layout for specific log informattion
    return(
        <Tabs
        >
            <Tabs.Screen 
                name = "[id]"
                options = {{
                    title: 'Summary',
                    tabBarIcon: ({color,focused}) => (
                        <FontAwesome5 name="fish" size={24} color= {color}/>
                    )
                }}
            />
            <Tabs.Screen
                name = 'weather'
                options = {{
                    title: 'Weather',
                    tabBarIcon: ({color,focused}) => (
                        <MaterialCommunityIcons name="weather-fog" size={24} color= {color} />
                    )
                }}
            />
            <Tabs.Screen
                name = 'recommendation'
                options = {{
                    title : 'Recommendation',
                    tabBarIcon: ({color,focused}) => (
                <AntDesign name="checkcircle" size={24} color= {color}/>
                    )
                }}
            />
        </Tabs>
    )
}