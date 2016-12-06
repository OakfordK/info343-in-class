"use strict";

var females = BABYNAMES.filter(rec => 'F' == rec.sex);
var topFemNames = females.sort((rec1, rec2) => rec2.count - rec1.count).slice(0, 100);


//main application React component
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var colMeta = {
            count: {
                type: columnTypes.numeric,
                caption: "baby#"
            }
        }
        return (
            <div className="container">
                <h1>Most Popular Female Baby Names from 1996</h1>
                <DataTable records={this.props.records}
                    columnMeta = {colMeta} />
            </div>
        );
    }
}

// <ul>
//     {
//         this.props.records.map(rec => <li key={rec.name}>{rec.name} {rec.count}</li>)
//     }
// </ul>

//render the App component to the element with id="app"
ReactDOM.render(<App records={topFemNames}/>, document.getElementById("app"));
