import * as actionsTypes from './actionsTypes';
import axios from 'axios';

export const authStart = ()=>{
    return {
        type: actionsTypes.AUTH_START,
        loading:true
    }
}

export const authSuccess = token=>{
    
    return {
        type: actionsTypes.AUTH_SUCCESS,
        token: token,
        loading:false
    }
}

export const authFail = error=>{
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error,
        loading:false
    }
}
export const logout = ()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("expirationDate");
    return {
        type: actionsTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut= (expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>[
        dispatch()
        ],expirationTime*1000)
    }
}

export const authLogin = (username,password)=>{
   return dispatch =>{
       dispatch(authStart());
       axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username:username,
            password:password
       }).then(response =>{
           const token = response.data.key;
           const expirationDate = new Date(new Date().getTime()+ 3600*1000);
           localStorage.setItem("token",token);
           localStorage.setItem("expirationDate",expirationDate);
           dispatch(authSuccess(token));
           dispatch(checkAuthTimeOut(3600));
       }).catch(err=>{
           dispatch(authFail(err))
       });
   }
}

export const authRegistration = (username,email,password1, password2)=>{
    return dispatch =>{
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/',{
             username:username,
             email:email,
             password1:password1,
             password2:password2
        }).then(response =>{
            const token = response.data.key;
            const expirationDate = new Date(new Date().getTime()+ 3600*1000);
            localStorage.setItem("token",token);
            localStorage.setItem("expirationDate",expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));
        }).catch(err=>{
            dispatch(authFail(err))
        });
    }
 }

 export const authCheckState = ()=>{
     return dispatch =>{
         const token = localStorage.getItem("token")
         if(!token)
         {
             dispatch(logout())
         }
         else{
             const expirationDate = new Date(localStorage.getItem("expirationDate"));
             if(expirationDate <= new Date())
             {
                 dispatch(logout())
             }
             else{

                 dispatch(authSuccess(token))
                 dispatch(checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000))
             }
         }
     }
 }