import axios from "axios"
import React, {useEffect, useState} from 'react'
import './Home.css'
import MyMap from "../components/MyMap";
function Home() {
    const [origin, setOrigin] = useState("");
    const [originOptions, setOriginOptions] = useState([]);
    const [destination, setDestination] = useState("");
    const [destOptions, setDestOptions] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDest, setSelectedDest] = useState(null);
    const GEOAPIFY_BASE_URL = "https://api.geoapify.com/v1/geocode/autocomplete?";
    useEffect(() => {
        
        let timer = setTimeout(async() => {
            
            if (origin.trim() !== "") {
                const params = {
                    text: origin,
                    filter: "countrycode:in",
                    apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY
                };
                const queryString = new URLSearchParams(params).toString();
                try{
                    let response = await axios.get(`${GEOAPIFY_BASE_URL}${queryString}`);
                    console.log(response);
                    setOriginOptions(response.data.features)
                }
                catch(err){
                    console.log(err)
                }
            
            }
            else{
                setOriginOptions([])
            }
        }, 500);
    
        // clear on component unmount
        return () => {
            clearTimeout(timer);
        };
      }, [origin]);

      useEffect(() => {
        
        let timer = setTimeout(async() => {
            
            if (destination.trim() !== "") {
                const params = {
                    text: destination,
                    filter: "countrycode:in",
                    apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY
                };
                const queryString = new URLSearchParams(params).toString();
                try{
                    let response = await axios.get(`${GEOAPIFY_BASE_URL}${queryString}`);
                    console.log(response);
                    setDestOptions(response.data.features)
                }
                catch(err){
                    console.log(err)
                }
            
            }
            else{
                setDestOptions([])
            }
        }, 500);
    
        // clear on component unmount
        return () => {
            clearTimeout(timer);
        };
      }, [destination]);
    
    

    return (
        <div className = "home">
        
            <div className = "container">
                <div className = "container-input">
                    <input value = {origin} type = "text" placeholder = "Enter origin" onChange = {(e) => {
                        setOrigin(e.target.value);
                    }} />
                    {originOptions.length!==0 && 
                        <div className = "options">
                            {originOptions?.map((option)=>{
                                return <p key = {option.properties.place_id} onClick = {(e) => {
                                    
                                    setOrigin(option.properties.formatted)
                                    setSelectedOrigin(option.properties)
                                }}>{option.properties.formatted}</p>
                            })}
                        </div>
                    }
                </div>
                <div className = "container-input">
                    <input value = {destination} type = "text" placeholder = "Enter destination" onChange = {(e) => {
                        setDestination(e.target.value);
                    }} />
                    {destOptions.length!==0 && 
                        <div className = "options">
                            {destOptions?.map((option)=>{
                                return <p key = {option.properties.place_id} onClick = {(e) => {
                                    setSelectedDest(option.properties)
                                    setDestination(option.properties.formatted)
                                }}>{option.properties.formatted}</p>
                            })}
                        </div>
                    }
                </div>
                
                
            </div>
            <MyMap selectedOrigin = {selectedOrigin} selectedDest = {selectedDest}  />
        </div>
    )
}

export default Home
