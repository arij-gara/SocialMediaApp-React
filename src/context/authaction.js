

export const loginstart =(usercredenials)=>({
    type: 'LOGIN_START',
})
export const loginsuccess =(user)=>({
    type: 'LOGIN_SUCCESS',
    payload: user
})
export const loginfailure =(error)=>({
    type: 'LOGIN_FAILURE',
    payload: error
    
})