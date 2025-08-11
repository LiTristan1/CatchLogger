import { Stack } from "expo-router";
import {Provider} from 'react-redux';
import {store} from './Store/Store';
import {Slot} from 'expo-router';

import '../global.css';
import { GestureHandlerRootView,GestureDetector } from "react-native-gesture-handler";
export default function RootLayout() {
  //Global layout of all paths from root
   return (
    <GestureHandlerRootView style = {{flex:1}}>
       <Provider store = {store}>

        <Stack>

          <Stack.Screen name = "(tabs)" options = {{headerShown: false}}/>
          <Stack.Screen name = "logsDisplay" options = {
            {
              headerTransparent: true,
              headerTitle : '',
              headerBackTitle: 'Back'

            }} />
          <Stack.Screen 
              name = 'logProcess' 
              options = {{
                headerTransparent: true,
                headerTitle: '',
                headerBackTitle: "Back"
              }}
          />
          <Stack.Screen 
            name = 'login'
            options = {{
                headerShown: false
            }}
          />
          <Stack.Screen name = "not-Found"/>
        </Stack>
    </Provider>
    </GestureHandlerRootView>
   
  )
}
