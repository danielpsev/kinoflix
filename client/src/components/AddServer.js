// import React, { useEffect, useState, useContext } from "react";
// import {useLocation} from "react-router";
// import axios from "../axios";
// import { Context } from "../context/Auth";

// const AddServer = () => {
//     const defaultFormVal = {
//         title: '',
//         description: '',
//     }
    
//     const {user, dispatch, isFetching} = useContext(Context);

//     const [formInputs, setFormInputs] = useState(defaultFormVal);
//     const {title, description} = formInputs;

//     const [hashtags, setHashtags] = useState([]);
//     const [hashtagInput, setHashtagInput] = useState();

//     const handleChange = (e) => {
//         const name = e.target.name;
//         const val = e.target.value;
//         setFormInputs({...formInputs, [name]: val});
//         console.log({...formInputs, [name]: val})
//     }

//     const handleSubmit = async (e) => {
//         console.log("Submit");
//         e.preventDefault();
//         if(title && description){
//             try{ 
//                 const res = await axios.post("/servers/", {
//                     author: user.username,
//                     title, description, hashtags
//              });
//              setFormInputs(() => defaultFormVal);
//              setHashtags([]);
//              console.log("Server added");
//             } catch (err) {
//                 console.log("err: " + err);
//             }
//         }else{
//             console.log("Add server err");
//         }


//         setFormInputs(() => defaultFormVal);
//     }


//     function isOnlySpaces(str) {
//         return /^\s*$/.test(str);
//       }      

//     const addHashtag = (e) => {
//         console.log("add hashtag");
//         e.preventDefault();
//         if(hashtagInput){
//             if(!hashtags.includes(hashtagInput)){
//                 if(!isOnlySpaces(hashtagInput)){
//                     setHashtagInput('');
//                     setHashtags([...hashtags, hashtagInput]);
//                     console.log("hashtags:" + hashtags);
//                 }

//             }else{
//                 console.log("Toks raktazodis jau egzistuoja")
//             }

//         }
        
//     }

//     const removeHashtag = (val) => {
//         console.log("clicked");
//         setHashtags(hashtags.filter((el) => el != val));
//     }   


//     let hashtags_render;
//         if(hashtags.length){
//              hashtags_render = hashtags.map((el) => {
//                 return (<span className="AddServer-hashtag" onClick={() => removeHashtag(el)}>{'#' + el + ", "}</span>);
//             });
       
//         }

//     const handleKeyDown = (event) => {
//         // Allow letters and numbers
//         const regex = /^[a-zA-Z0-9]*$/;
//         const key = event.key;
//         if (regex.test(key)) {
//             return true;
//         }
//         // Prevent all other keys
//         event.preventDefault();
//         return false;
//         };
        

//     return (
//         <main>
//         <div className="wrapper">
//             <div className="about__main-inner">
//                 {user ?( 
//                     <div style={{display: 'flex', flexWrap: 'wrap', gap: 100}}>
//                 <form onSubmit={handleSubmit}>
//                     <label className="label__1 AddServer-label">Pavadinimas</label>
//                      <p className="AddServer-form-p"><input type="text" placeholder="Pavadinimas" name="title" className="input__body" onChange={handleChange} value={title} /></p>

//                      <label className="label__1 AddServer-label">Aprašymas</label>
//                      <p className="AddServer-form-p"><input type="text" placeholder="Aprašymas" name="description" className="input__body " onChange={handleChange} value={description}/></p> 



//                     <input type="submit" className="btn-success pointer" value="Pridėti serverį" style={{marginTop: 15, width:150}}/>
//                 </form>


//                 <form onSubmit={addHashtag}>
//                 <label className="label__1 AddServer-label">Raktažodžiai ({hashtags.length})</label>
//                 <p style={{marginTop: 10, wordBreak: 'break-all'}} >{hashtags ? hashtags_render : null}</p>
//                 <p className="AddServer-form-p"><input type="text" placeholder="Raktažodis" name="hashtag" className="input__body" pattern="[A-Za-z0-9]+" onKeyDown={handleKeyDown} onChange={(e) => setHashtagInput(e.target.value)} value={hashtagInput} /></p>

//                 <input type="submit" className="btn-secondary pointer" value="Pridėti raktažodį" style={{marginTop: 15}}/>
//                 </form>

//                 </div>


//                 ) : <p style={{color: '#4B5057'}}>Informacija pasiekiama tik prisijungusiems vartotojams</p>}
//            </div>     
//         </div>
//     </main>
//     );
// }

// export default AddServer;