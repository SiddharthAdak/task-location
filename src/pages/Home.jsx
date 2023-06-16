import axios from "axios"
import React, {useEffect, useState} from 'react'
import './Home.css'

function Home() {
    const [origin, setOrigin] = useState("");
    const [originOptions, setOriginOptions] = useState([]);
    const [destination, setDestination] = useState("");
    const [destOptions, setDestOptions] = useState([]);
    
    const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
    useEffect(() => {
        
        let timer = setTimeout(async() => {
            
            if (origin.trim() !== "") {
                const params = {
                    q: origin,
                    format: "json"
                };
                const queryString = new URLSearchParams(params).toString();
                try{
                    let response = await axios.get(`${NOMINATIM_BASE_URL}${queryString}`);
                    console.log(response);
                    setOriginOptions(response.data)
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
                    q: destination,
                    format: "json"
                };
                const queryString = new URLSearchParams(params).toString();
                try{
                    let response = await axios.get(`${NOMINATIM_BASE_URL}${queryString}`);
                    console.log(response);
                    setDestOptions(response.data)
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
                                return <p key = {option.place_id} onClick = {(e) => {
                                    
                                    setOrigin(option.display_name)
                                }}>{option.display_name}</p>
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
                                return <p key = {option.place_id} onClick = {(e) => {
                                    
                                    setDestination(option.display_name)
                                }}>{option.display_name}</p>
                            })}
                        </div>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Home
