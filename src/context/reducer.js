import { DISPLAY_ALERT, HIDE_ALERT, REGISTER_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS } from "./actions";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
          ...state,
          showAlert: true,
            alertType: 'danger',
            alertText: 'Provide All Values'
        }
      }
      if (action.type === HIDE_ALERT) {
        return {
          ...state,
          showAlert: false,
            alertType: '',
            alertText: ''
        }
      }
      if (action.type === REGISTER_ALERT){
        return {
          ...state,
          showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
      }
      if( action.type === REGISTER_USER_SUCCESS){
        return{
          ...state,
          isLoading: true,
          showAlert: true,
          user: action.payload.user,
          token: action.payload.token,
          alertType: "success",
          alertText: "Success! Redirecting..."
        }
      }
      if (action.type === REGISTER_USER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        };
      }
  throw new Error(`no such action as ${action.type}`);
};



export default reducer;
