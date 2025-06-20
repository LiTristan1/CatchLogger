import { Stack } from "expo-router";
import {Provider} from 'react-redux';
import {store} from './Store/Store';
import {Slot} from 'expo-router';

import '../global.css';

export default function RootLayout() {
  //Global layout of all paths from root
   return (
    <Provider store = {store}>
      <Stack
      >
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
          <Stack.Screen name = "not-Found"/>
          
      </Stack>
    </Provider>
  )
}
