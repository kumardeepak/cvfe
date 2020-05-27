import C from "../actions/constants";

export default function(state = {}, action) {
  switch (action.type) {
      
    case C.CONFIGUPLOAD:
          console.log("error",action.type)
          return {[action.payload.name] :action.payload.data.filepath};
    default:
      return state;
  }
}
