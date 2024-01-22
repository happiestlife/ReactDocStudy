import LeftMenu from "./LeftMenu";
import Main from "./Main";
import {BrowserRouter} from "react-router-dom";

const MainFrame = () => {
    return (
        <BrowserRouter>
            <div>
                <LeftMenu></LeftMenu>
                <Main></Main>
            </div>
        </BrowserRouter>
    );
}

export default MainFrame;