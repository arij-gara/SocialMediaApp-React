import axios from 'axios'

export const Logincall = async (usercredentials,dispatch ) =>{
    dispatch({type: 'LOGIN_START'})
    try{
        const res= await axios.post('http://localhost:8000/api/auth/login',usercredentials)
    dispatch( { type:'LOGIN_SUCCESS', payload: res.data})
    }catch(err){
     dispatch( { type:'LOGIN_FAILURE', payload: err})
    }
}