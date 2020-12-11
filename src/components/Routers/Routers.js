import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import Main from '../Main/Main';

function Routers() {
    return (
        <BrowserRouter>
            <Route path="/" component={Main} />
        </BrowserRouter>
    )
}

export default Routers;