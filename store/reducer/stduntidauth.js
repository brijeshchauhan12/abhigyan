
import {STDETAIL} from '../action/auth';


const initialstate={
    
      studentid:null,
    

  
}

export default(state=initialstate,action)=>{
    
    switch(action.type){
       
      
      
        
           case STDETAIL:
            
               return{
                studentid:action.tts
                   
               }
       
        default:
            return state        
    }
    
}