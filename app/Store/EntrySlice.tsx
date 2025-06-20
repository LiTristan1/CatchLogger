import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import { Log } from './LogSlice';


const initialState: Log = {
    id: -1,
    date: null,
    location: {
        place: null,
        placeObj: null,
        system: null,

    },
    catch: {
        name: null,
        weight: 0,
        length: null,
        time: null,
        image: undefined //
    },
    gear:{
        liveOrArtificial: null,
        name: null
    },
    weather: {
        airTemp: null,
        waterTemp: null,
        waterClarity: null,
        windSpeed: null,
        barometric: null,
        cloudCover: null,
        precipitation: null,
        moonPhase: null

    }
}

const EntrySlice = createSlice({
    name: 'Entry',
    initialState,
    reducers: {
    setID(state, action: PayloadAction<number | string>) {
      state.id = action.payload;
    },
    setDate(state, action: PayloadAction<string | null>) {
      state.date = action.payload;
    },
    setPlace(state, action: PayloadAction<string | null>) {
      state.location.place = action.payload;
    },
    setPlaceObj(state,action: PayloadAction<object | null>){
        state.location.placeObj = action.payload;
    },
    setSystem(state, action: PayloadAction<string | null>) {
      state.location.system = action.payload;
    },
    setCatchName(state, action: PayloadAction<string | null>) {
      state.catch.name = action.payload;
    },
    setCatchWeight(state, action: PayloadAction<number>) {
      state.catch.weight = action.payload;
    },
    setCatchLength(state, action: PayloadAction<number | null>) {
      state.catch.length = action.payload;
    },
    setCatchTime(state, action: PayloadAction<string | null>) {
      state.catch.time = action.payload;
    },
    setCatchImage(state,action: PayloadAction<string | undefined>){
        state.catch.image = action.payload;
    },
    setGearLiveOrArtificial(state, action: PayloadAction<boolean | null>) {
      state.gear.liveOrArtificial = action.payload;
    },
    setGearName(state, action: PayloadAction<string | null>) {
      state.gear.name = action.payload;
    },
    setAirTemp(state, action: PayloadAction<number | null>) {
      state.weather.airTemp = action.payload;
    },
    setWaterTemp(state, action: PayloadAction<number | null>) {
      state.weather.waterTemp = action.payload;
    },
    setWaterClarity(state,action: PayloadAction<string | null>){
        state.weather.waterClarity = action.payload
    },
    setWindSpeed(state, action: PayloadAction<number | null>) {
      state.weather.windSpeed = action.payload;
    },
    setBarometric(state, action: PayloadAction<number | null>) {
      state.weather.barometric = action.payload;
    },
    setCloudCover(state, action: PayloadAction<string | null>) {
      state.weather.cloudCover = action.payload;
    },
    setPrecipitation(state, action: PayloadAction<number | null>) {
      state.weather.precipitation = action.payload;
    },
    setMoonPhase(state, action: PayloadAction<string | null>) {
      state.weather.moonPhase = action.payload;
    },
    }
})

export const {setID,setDate,setPlace,setPlaceObj,setSystem,setCatchName,
    setCatchWeight,setCatchLength,setCatchTime,setCatchImage,setGearLiveOrArtificial,setGearName,setAirTemp,setWaterTemp,setWaterClarity,setWindSpeed,setBarometric,setCloudCover,setPrecipitation,setMoonPhase} = EntrySlice.actions;
export default EntrySlice.reducer;


