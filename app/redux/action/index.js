import {AUTHENTICATION} from '../type';
export const saveAuthentication = (name, token) => ({
  type: AUTHENTICATION,
  name,
  token,
})