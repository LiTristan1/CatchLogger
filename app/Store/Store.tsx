import {configureStore} from '@reduxjs/toolkit';
import cameraReducer from './CameraSlice';
import logReducer from './LogSlice';
import entryReducer from './EntrySlice';
import currReducer from './CurrentDisplaySlice'
import loginReducer from './LoginSlice';
//global store for app
export const store = configureStore({

    //reducers defined
    reducer: {
        login: loginReducer,
        camera:cameraReducer,
        data: logReducer,
        entry: entryReducer,
        currLog: currReducer
    }
})

//RootState is all the reducers
export type RootState = ReturnType<typeof store.getState>;
//AppDispatch allows for useDispatch later tot set values
export type AppDispatch = typeof store.dispatch;