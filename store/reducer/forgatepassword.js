import {FORGATE} from '../action/forgatepassword';
const initialState={
     
    student_id:null
   }
   export default(state=initialState,action)=>{
    
    switch(action.type){
       
        case FORGATE:
         return{
             student_id:action.st_id
         }
         console.log( "this is the finalise status"+finalstatus)
    
        default:
            return state        
    }
    
}  