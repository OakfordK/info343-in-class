import {expect} from "chai";
import {store, addFavorite, removeFavorite} from "../src/shared-state.js";

// Write automated test in here. Going to test shared-state.js
var item = {id: 1, title: "Testing item"};

// Describe is a bunch of tests. "it" is a single test
// Test Driven/Behavioral driven development
// Write tests first from spec. Buzz words, industry
describe("redux store", function() {
    it("should initialize with a default state", function() {
        var state = store.getState();
        expect(state.favorites).to.be.instanceOf(Array);
        expect(state.favorites.length).to.equal(0);
    });

    it("should add a favorite", function() {
        var state1 = store.getState();
        store.dispatch(addFavorite(item));
        var state2 = store.getState();

        expect(state2.favorites.length).to.equal(1);
        expect(state2.favorites[0]).to.deep.equal(item);
        expect(state1).to.not.equal(state2);
    });

    it("Should remove a favorite", function() {
        store.dispatch(removeFavorite(item.id));
        var state = store.getState();
        expect(state.favorites.length).to.equal(0);
    });

    it("Should ignore an unknown action", function() {
        var state1 = store.getState();
        store.dispatch({type: "Bogus type"});
        var state2 = store.getState();
        expect(state1).to.equal(state2);
    });
});