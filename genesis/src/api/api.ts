import axios from "axios";
import type { IAuthResponse } from "./types";


export const postEntity = async (entityType: string) => {
  
    const response = await axios.post( `${import.meta.env.VITE_API_URL}/create-entity`, {
      entityType
    }, {
      headers: {
        "Content-Type": 'application/json',
      },
    });

    return response.data; 
  
};




