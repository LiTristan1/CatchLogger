import {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {RootState,AppDispatch} from '../app/Store/Store';
import {setLogs} from '../app/Store/LogSlice';
import axios from 'axios';

//path to logs data
const URL = 'http://localhost:3000/testObjects';
export default function useFetch(){
    
    const dispatch = useDispatch<AppDispatch>();
  
    useEffect(() => {

        //async function to fetch data from backend api
        async function getData(){

            try{
                //get response from server
                const response = await axios.get(URL);

                //if response exists then we can get the data
                if(response){
                console.log("Data: " + response.data);
                dispatch(setLogs(response?.data));

                
                }
                
            }
            catch(err){
                //error in getting response
                console.log("Error: ", err);
                //if there is a problem we throw the error
                throw new Error("Problem getting data");
            }
        }
        
        getData();

    },[dispatch])
}