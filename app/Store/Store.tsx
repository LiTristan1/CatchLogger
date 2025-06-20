import {configureStore} from '@reduxjs/toolkit';
import cameraReducer from './CameraSlice';
import logReducer from './LogSlice';
import entryReducer from './EntrySlice';
import currReducer from './CurrentDisplaySlice'
//import loginReducer from './LoginSlice';
//global store for app
export const store = configureStore({
    reducer: {
        
        camera:cameraReducer,
        data: logReducer,
        entry: entryReducer,
        currLog: currReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;