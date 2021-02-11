
export const TOPICARRAY='TOPICARRAY';
export const topichandle=(data)=>{
    return{type:TOPICARRAY,topics:data}
}
export const topicandvideo=(subject_id)=>{
    return async dispatch=>{
        let details = {
            subject_id:subject_id
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response=await fetch('http://ais.omsai.info/api/v1/topic_with_videos', {
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
        const dataa=resdata.data
        // console.log(dataa)
        dispatch(topichandle(dataa))
    }
}