import {createSlice,PayloadAction} from '@reduxjs/toolkit';

export type Log = {
    id:number | string,
    date: string | null,
    location: {
        place: string | null,
        placeObj: object | null,
        system: string | null
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
        barometric: number | null,
        cloudCover: string | null,
        precipitation: number | null,
        moonPhase: string | null

    }
}
//Define ddata type to be array of logs
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
        setLogs(state, action: PayloadAction<Log[]>){
            state.logs = action.payload;
        }
    }
})

export const {setLogs} = dataSlice.actions;
export default dataSlice.reducer;