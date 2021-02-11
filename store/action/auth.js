import AsyncStorage from '@react-native-community/async-storage'
export const AUTHENTICATEOTP='AUTHENTICATEOTP';
export const AUTHENTICATEUSER='AUTHENTICATEUSER';
export const ACCESSUSER='ACCESSUSER';
export const USERDETAILL='USERDETAILL';
export const USERDETAILLALL='USERDETAILLALL';
export const DONOTALLOW='DONOTALLOW';
export const STDETAIL='STDETAIL';

const clearAsyncStorage = async() => {
    await AsyncStorage.clear();
}

export const accesslogin=(data)=>{
    return{type:ACCESSUSER,status:data}
}
export const authenticateotp=(otp)=>{
    return {type:AUTHENTICATEOTP,otp:otp}
}
export const authenticateuser=(stu_id)=>{
    return{type:AUTHENTICATEUSER,stu_id:stu_id}
}
export const userdetail=(data)=>{
    return{ type:USERDETAILL,data:data}
}
export const userdetailalls=(data)=>{
    return {type:USERDETAILLALL,Alldata:data}
}
export const donotallowuser=(data)=>{
    clearAsyncStorage()
    return{type:DONOTALLOW,ttr:data}
}
export const studentidd=(data)=>{
    return{type:STDETAIL,tts:data}
}

export const login=(school_id,mobile,password)=>{
    return async dispatch=>{
      let details = {
        school_id:school_id,
        mobile:mobile,
        password:password,
    };

    let formBody = []; 
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response=await fetch('http://ais.omsai.info/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
    if(response.status!=200){
        throw new Error('Invalid mobile no. or password!')
    }
    const resdata=await response.json();
    await AsyncStorage.setItem('@auth', JSON.stringify(resdata.data))
     dispatch(userdetailalls(resdata.data.st_name))
     dispatch(accesslogin(resdata.status))
     dispatch(studentidd(resdata.data.st_id))
     dispatch(userdetail(resdata.data))
    }
}

export const Signupp=(school_id,board_id,mobile,password,name)=>{
    return async dispatch=>{
        let details = {
            school_id:school_id,
            board_id:board_id,
            mobile:mobile,
            password:password,
            name:name,
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response=await fetch('http://ais.omsai.info/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        if(response.status!=200){
            throw new Error('error')
        }
        const resdata=await response.json();
        const  credentials=resdata.data
        dispatch(authenticateotp(credentials.otp))
        dispatch(authenticateuser(credentials.st_id))
    }
}
