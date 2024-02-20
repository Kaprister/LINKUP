
export const host = import.meta.env.VITE_APP_HOST;

export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`
export const logoutRoute = `${host}/api/auth/logout`;

export const setAvatarRoute = `${host}/api/auth/setAvatar`

export const allUsersRoute = `${host}/api/auth/allUsers`

export const sendMessageRoute = `${host}/api/messages/addMsg`
export const getAllMessagesRoute = `${host}/api/messages/getMsg`