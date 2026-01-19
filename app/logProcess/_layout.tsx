import {Stack} from 'expo-router';

//layout page for creating a new log

export default function Layout(){
    return (
        <Stack>
            <Stack.Screen 
                name = 'Species'
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name = 'Camera'
                options = {{
                    headerShown: false
                }}

            />
            <Stack.Screen 
                name = 'ConfirmPhoto'
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name = 'Weather'
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name = 'Location'
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name = 'Extra'
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name = 'Summary'
                options = {{
                    headerShown: false
                }}
            />
        </Stack>
    )
}