import {VERIFYSTATUS} from '../action/otpverification'
const initialState={
     
    finalstatus:null
   }
   export default(state=initialState,action)=>{
    
    switch(action.type){
       
        case VERIFYSTATUS:
         return{
             finalstatus:action.status
         }
         console.log( "this is the finalise status"+finalstatus)
    
        default:
            return state        
    }
    
}  