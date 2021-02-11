
import {USERDETAILLALL} from '../action/auth';

const initialstate={
      usernamee:null
}

export default(state=initialstate,action)=>{
    switch(action.type){
           case USERDETAILLALL:
               return{
                usernamee:action.Alldata
               }
        default:
            return state        
    }
    
}