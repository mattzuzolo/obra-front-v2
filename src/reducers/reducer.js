const defaultState = {
  artworkArray: [],
  selectedArtwork: {},
  loggedInUser: {},
}

export default function(state = defaultState, action) {

  switch(action.type){
    case "UPDATE_ARTWORK_ARRAY":
      return {...state, artworkArray: [...state.artworkArray, ...action.payload]}
    case "SELECT_ARTWORK":
      return {...state, selectedArtwork: action.payload}
    case "LOGIN_USER":
      return {...state, loggedInUser: action.payload}
    default:
      return state
  }
}
