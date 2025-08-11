import {Tabs, withLayoutContext} from 'expo-router';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

const {Navigator} = createMaterialTopTabNavigator();

const TopTabs = withLayoutContext(Navigator);

export default function Layout(){
    //layout for specific log informattion
    return(
        <TopTabs
        >
            <TopTabs.Screen 
                name = "[id]"
                options = {{
                    title: 'Summary'
                }}
            />
            <TopTabs.Screen
                name = 'weather'
                options = {{
                    title: 'Weather'
                }}
            />
            <TopTabs.Screen
                name = 'recommendation'
                options = {{
                    title : 'Recommendation'
                }}
            />
        </TopTabs>
    )
}