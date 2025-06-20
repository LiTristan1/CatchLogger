import {createSlice, PayloadAction} from '@reduxjs/toolkit';


type facing = 'front' | 'back'
//Define type of cameraState
interface CameraState {
    latestPhotoUri: string | undefined;
    facing: facing
}

//give initial state to redux
const initialState: CameraState = {
    latestPhotoUri: undefined,
    facing: 'back'
}

//define state with initial state and reducers for properties
const cameraSlice = createSlice({
    name: "camera",
    initialState,
    reducers: {
        setPhotoUri(state, action: PayloadAction<string | undefined>){
            state.latestPhotoUri = action.payload;
        },
        setFacing(state) {
            state.facing = state.facing === 'back' ? 'front' : 'back'
        },
    }
})

export const {setPhotoUri,setFacing} = cameraSlice.actions;
export default cameraSlice.reducer;