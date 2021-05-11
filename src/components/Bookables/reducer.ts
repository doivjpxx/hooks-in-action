interface State {
  bookables: any[],
  group: any;
  bookableIndex: number;
  hasDetails: boolean;
}

export default function reducer(state: State, action: any) {
  switch (action.type) {
    case 'SET_GROUP':
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0
      };
    case 'SET_BOOKABLE':
      return { ...state, bookableIndex: action.payload };
    case 'TOGGLE_HAS_DETAILS':
      return {
        ...state, hasDetails: !state.hasDetails
      };
    case 'NEXT_BOOK':
      const count = state.bookables.filter(b => b.group === state.group);
      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % +count,
      };
    default: return state;
  }
}
