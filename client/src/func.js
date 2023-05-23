import axios from "./axios"
import { toast } from "react-toastify";
export const likeFilm = async (id, setState) => {
        try{
            const res = await axios.post("/films/like/" + id);
            setState(true);
            toast.success('Pridėtas');
          }catch(err){
            toast.error(err.response.data.mess);
          }
}
export const dislikeFilm = async (id, setState) => {
    try{
      const res = await axios.delete("/films/like/" + id);
      setState(false);
      toast.warning('Pašalintas');
    }catch(err){
      toast.error(err.response.data.mess);
    }
  }