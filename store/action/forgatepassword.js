export const FORGATE='FORGATE'
export const forgatepass=(data)=>{
    return {type:FORGATE,st_id:data}
}
export const forgating=(school_id,mobile)=>{
    return async dispatch=>{
        let details = {
            school_id:school_id,
            mobile:mobile
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response=await fetch('http://ais.omsai.info/api/v1/forgot_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        if(response.status!=200){
            throw new Error("there may be some entries missing")
        }
        const resdata=await response.json();
        dispatch(forgatepass(resdata.data.st_id))
    }
}
export const resetforgating=(student_id,otp,new_password,confirm_password)=>{
    return async dispatch=>{
        let details = {
            student_id:student_id,
            otp:otp,
            new_password:new_password,
            confirm_password:confirm_password
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response=await fetch('http://abhigyaan.local/api/v1/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        if(response.status!=200){
            throw new Error("there may be some entries missing")
        }
        const resdata=await response.json();
    }
}