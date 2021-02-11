import {PROF} from '../action/profile';

const initialstate={
      profiledetails:{},
}

export default(state=initialstate,action)=>{
    switch(action.type){
        case PROF:
            return{
                profiledetails:action.datta  
            }
        default:
            return state        
    }
}