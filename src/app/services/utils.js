import { WATCHED_LIST_KEY } from "../config/constants";

export const updateWatchedList = id => {
    const watchedList = JSON.parse(localStorage.getItem(WATCHED_LIST_KEY)) || []
    const watchedItem = {
      id,
      lastWatched: new Date()
    }
    // Remove the old entry for this id
    const filteredWatchList = watchedList.filter(item => item.id !== id)
    localStorage.setItem(WATCHED_LIST_KEY, JSON.stringify([ watchedItem, ...filteredWatchList]))
}