import {createSlice,PayloadAction} from '@reduxjs/toolkit';
//store the stores all logs pertaining to the user
//define log type
export type Log = {
    id:number | string,
    owner: string,
    date: string | null,
    location: {
        place: string | null,
        placeObj: object | null,
        system: string | null,
        latitude: Number,
        longitude: Number
    }
    catch: {
        name: string | null,
        weight: number | null,
        length: number | null,
        time: string | null,
        image: string | undefined
    }
    gear:{
        liveOrArtificial: boolean | null,
        name: string | null
    }
    weather: {
        airTemp: number | null,
        waterTemp: number | null,
        waterClarity: string | null,
        windSpeed: number | null,
        windDirection: number| null,

        barometric: number | null,
        cloudCover: string | null,
        precipitation: number | null,
        moonPhase: string | null

    }
}
//Define data type to be array of logs
interface data  {
    logs: Log[],
}
//initiailize starting state to empty array
const initialState: data = {
    logs:  []
}

//Crete state manager for log slice with reducers
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // reducer to change logs 
        setLogs(state, action: PayloadAction<Log[]>){
            state.logs = action.payload;
        }
    }
})

export const {setLogs} = dataSlice.actions;
export default dataSlice.reducer;