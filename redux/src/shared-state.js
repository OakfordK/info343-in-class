/**
 * shared-state.js
 * module for declaring our shared redux store
 * and various action creation functions
 */

import {createStore} from "redux";

// Unique values for names.
const ADD_FAV_ACTION = "addfav";
const REMOVE_FAV_ACTION = "removefav";

// default state for redux store
// empty array
const DEFAULT_STATE = {favorites: []};

// Local storage for whatever reason magic
const LS_KEY = "redux-store"; 

// reducer function for redux/
// (state, action) => state

function reducer(state, action) {
    // Switch is like if/elseif/elseif/elsie/else
    switch(action.type) {
        case ADD_FAV_ACTION:
            // if item exists, just return old state
            console.log(action.item.id);
            if(state.favorites.find(item => item.id === action.item.id)) {
                return state;
            }

            // Create new state object
            // Object.assign() will assign all properties from
            // the state object to a new obect we passed as 
            // param.  This is how we clone objects
            var newState = Object.assign({}, state);

            // use concat to generate a new array with the new item
            // concatenated on the end. THis preserves state.favorites
            // Using .push() mutates sstate.favorites which is a nono
            // always use .concat()
            newState.favorites = newState.favorites.concat(action.item);
            return newState;

        
        case REMOVE_FAV_ACTION:
            // return new state with given item removed
            return Object.assign({}, state, {favorites: state.favorites.filter(item => item.id != action.id)});
        
        default:
            return state;

    }
}

// Make function that returns an action creator function
// give it an item to remove
export function addFavorite(item) {
    return {
        type: ADD_FAV_ACTION,
        item: item
    }
}

// Must hand it the unique ID to remove
export function removeFavorite(id) {
    return {
        type: REMOVE_FAV_ACTION,
        id: id
    }
}

// Saved state for whatever reason stored in json
var savedState = JSON.parse(localStorage.getItem(LS_KEY));

// create redux store using any saved state or default. 
// make with our reducer as well
export var store = createStore(reducer, savedState || DEFAULT_STATE);

store.subscribe(() => localStorage.setItem(LS_KEY, JSON.stringify(store.getState())));