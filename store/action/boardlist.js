export const BOARDLIST = 'BOARDLIST'
export const allboardlist = (data) => {
    return { type: BOARDLIST, dataarray: data }
}
export const board_list = (school_id) => {
    return async dispatch => {
        let details = {
            school_id: school_id,
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response = await fetch('http://ais.omsai.info/api/v1/board_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        if (response.status != 200) {
            throw new Error("there may be some entries missing")
        }
        const resdata = await response.json();
        const data = resdata.data;
        dispatch(allboardlist(data))
    }
}