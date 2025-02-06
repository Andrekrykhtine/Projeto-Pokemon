import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { MainPage } from "./pages/MainPage/index.jsx";

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={MainPage} />
            </Switch>
        </Router>
    );
}