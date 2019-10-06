import {ADD_PHONE_NUMBER, DELETE_PHONE} from '../type';
const initState = {
  listPhoneNumber: [],
};
export default function phone(state = initState, action) {
  switch (action.type) {
    case ADD_PHONE_NUMBER: {
      const data = [action.payload, ...state.listPhoneNumber];
      const dataFilter = data
        .map(e => e.drg_drug_cd)
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => data[e])
        .map(e => data[e]);
      return {
        ...state,
        listPhoneNumber: dataFilter,
      };
    }
    case DELETE_PHONE: {
      return {
        ...state,
        listPhoneNumber: state.listPhoneNumber.filter(
          item => item !== action.payload,
        ),
      };
    }

    default:
      return state;
  }
}
