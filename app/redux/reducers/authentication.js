import {AUTHENTICATION} from '../type';
const initState = {
  name: '',
  token: '',
};
export default function saveAuthentication(state = initState, action) {
  switch (action.type) {
    case AUTHENTICATION:
      return {
        ...state,
        name: action.name,
        token: action.token,
      };
    default:
      return state;
  }
}
