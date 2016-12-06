import React from "react";

import UserCard from "./user-card.jsx";
import {store, removeFavorite} from "./shared-state.js";

export default class extends React.Component {
    constructor(props) {
        super(props);

        // Current state of store
        this.state = store.getState();
    }

    componentDidMount() {
        // Whenever the store changes, call this function
        this.unsub = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        // variable was set above
        this.unsub;
    }

    render() {
        var userCards;
        if (this.state.favorites) {
            userCards = this.state.favorites.map(record => 
                <UserCard key={record.id} 
                    user={record}>
                    <button
                    onClick={() => store.dispatch(removeFavorite(record.id))}>Remove</button>
                </UserCard>);
        }
        return (
            <div className="container">
                <h1>My Favorites</h1>
                {userCards}
            </div>
        );
    }
}
