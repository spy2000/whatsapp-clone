export const HOST = "http://localhost:5000"

export const AUTH_ROUTE = `${HOST}/api/auth`
export const MESSAGES_ROUTE = `${HOST}/api/messages`

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`
export const ONBAORD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`


export const ADD_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-message`
export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/get-messages`