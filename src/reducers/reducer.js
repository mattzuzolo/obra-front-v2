const defaultState = {
  artworkArray: [{
    title: "ABC",
    artist: "ABC",
    medium: "ABC",
    century: "20th Cenutry",
    culture: "American",
    url: "https://en.wikipedia.org/wiki/Nighthawks",
    primaryimageurl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg",
    id: 568,
}],
  selectedArtwork: {},
  loggedInUser: {},
}

export default function(state = defaultState, action) {

  switch(action.type){
    case "UPDATE_ARTWORK_ARRAY":
      console.log("Action.payload in UPDATE_ARTWORK_ARRAY", action.payload)
      console.log("State in UPDATE_ARTWORK_ARRAY", state)
      return {...state, artworkArray: [...state.artworkArray, ...action.payload]}
    case "SELECT_ARTWORK":
      return {...state, selectedArtwork: action.payload}
    case "LOGIN_USER":
      return {...state, loggedInUser: action.payload}
    default:
      return state
  }
}
