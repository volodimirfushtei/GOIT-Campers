export const selectFavorites = (state) => state.favorites.favorites;
export const isFavorite = (state, camperId) =>
  state.favorites.favorites.includes(camperId);
export const getFavorites = (state) => state.favorites.favorites;
