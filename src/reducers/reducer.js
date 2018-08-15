const defaultState = {
  artworkArray: [],
  selectedArtwork: {},
  loggedInUser: {},
}

export default function(state = defaultState, action) {


  switch(action.type){
    case "UPDATE_ARTWORK_ARRAY":
      //not ideal to clear state in this way:
      return {...state, artworkArray: [...action.payload]}
      // return {...state, artworkArray: [...state.artworkArray, ...action.payload]}

    case "CHANGE_MESSAGE":
      return {testString: action.payload}

    case "SELECT_ARTWORK":
      return {...state, selectedArtwork: action.payload}

    case "LOGIN_USER":
      return {...state, loggedInUser: action.payload}

    default:
      return state
  }
}
