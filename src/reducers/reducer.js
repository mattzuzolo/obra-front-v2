const defaultState = {
  artworkArray: [],
  selectedArtwork: {},
  loggedInUser: {
    _id: "5b7464d118664e1696ee9a46",
    email: "matt@gmail.com",
    password: "matt1234",
    __v: 0
},
}

export default function(state = defaultState, action) {

  switch(action.type){
    case "UPDATE_ARTWORK_ARRAY":
      return {...state, artworkArray: [...action.payload]}
      // return {...state, artworkArray: [...state.artworkArray, ...action.payload]} //this maintains running list. NO DELETION
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
