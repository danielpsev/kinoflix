import axios from "./axios"
import { toast } from "react-toastify";
export const likeFilm = async (id, setState) => {
        setState(true);
        try{
            const res = await axios.post("/films/like/" + id);
          }catch(err){
            setState(false);
            toast.error(err.response.data.mess);
          }
}
export const dislikeFilm = async (id, setState) => {
    setState(false);
    try{
      const res = await axios.delete("/films/like/" + id);
    }catch(err){
      setState(true);
      toast.error(err.response.data.mess);
    }
  }