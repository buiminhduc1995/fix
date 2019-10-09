import {AUTHENTICATION} from '../type';
const initState = {
  name: '',
  token: '',
  username: '',
};
export default function saveAuthentication(state = initState, action) {
  switch (action.type) {
    case AUTHENTICATION:
      return {
        ...state,
        name: action.name,
        token: action.token,
        username: action.username,
      };

    default:
      return state;
  }
}
