import {AUTHENTICATION} from '../type';
export const saveAuthentication = (name, token, username) => ({
  type: AUTHENTICATION,
  name,
  token,
  username,
});
