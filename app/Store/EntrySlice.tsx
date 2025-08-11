import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import { Log } from './LogSlice';

//store for new entry

//define initial entry values
const initialState: Log = {
    id: -1,
    owner: "",
    date: null,
    location: {
        place: null,
        placeObj: null,
        system: null,
        latitude:  0,
        longitude: 0

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
        windDirection: null,
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
    //define reducers to change values of state variable
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
    setLatitude(state, action: PayloadAction<Number>){
      state.location.latitude = action.payload;
    },
    setLongitude(state, action: PayloadAction<Number>){
      state.location.longitude = action.payload;
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
    setWindDirection(state,action: PayloadAction<number | null>){
      state.weather.windDirection = action.payload;
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

export const {setID,setDate,setPlace,setPlaceObj,setLatitude,setLongitude,setSystem,setCatchName,
    setCatchWeight,setCatchLength,setCatchTime,setCatchImage,setGearLiveOrArtificial,setGearName,setAirTemp,setWaterTemp,setWaterClarity,setWindSpeed,setWindDirection,setBarometric,setCloudCover,setPrecipitation,setMoonPhase} = EntrySlice.actions;
export default EntrySlice.reducer;


