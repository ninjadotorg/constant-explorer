export default (state = {}, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      document.title = 'constant blockchain';
      return state;
    }
    default: {
      return state;
    }
  }
};
