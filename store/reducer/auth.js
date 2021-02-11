import {AUTHENTICATEOTP} from '../action/auth';
import {AUTHENTICATEUSER} from '../action/auth';
import {ACCESSUSER} from '../action/auth';
import {USERDETAILL} from '../action/auth';
import {USERDETAILLALL} from '../action/auth';
import {DONOTALLOW}from '../action/auth';

const initialstate={
    Otp:null, 
    usernamee:null,
    userId:null,
    allowuser:null,
    userdata:null
}

export default(state=initialstate,action)=>{
    switch(action.type){
        case AUTHENTICATEOTP:
         return   {Otp:action.otp}
        case AUTHENTICATEUSER:
            return{userId:action.stu_id}
        case ACCESSUSER:
            return{allowuser:action.status} 
        case USERDETAILL:
            return{userdata:action.data}
        case USERDETAILLALL:
            return{usernamee:action.Alldata}
        case DONOTALLOW:
            return{allowuser:action.ttr}
        default:
            return state        
    }
}