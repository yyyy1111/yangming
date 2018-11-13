export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "userInfo/GET_USER_INFO_FAIL";


//返回actions的函数们
function getUserInfoRequest(){
    return {
        type : GET_USER_INFO_REQUEST
    }
}

function getUserInfoSuccess(userInfo){
    return {
       type :  GET_USER_INFO_SUCCESS,
       userInfo: userInfo
    }
}

function getUserInfoFail(){
    return {
        type : GET_USER_INFO_FAIL
    }
}


//用dispatch把函数派发出去

export function getUserInfo(){
    // console.log('1111');
    return function (dispatch){
        //发送异步请求
        dispatch(getUserInfoRequest());

        return fetch('http://localhost:8080/api/user.json')
            .then((response => {
                return response.json()
            }))
            .then((json) => {
                    dispatch(getUserInfoSuccess(json))
                }
            ).catch(
                () => {
                    dispatch(getUserInfoFail());
                }
            )
    }
}