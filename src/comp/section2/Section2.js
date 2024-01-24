import { Fragment } from "react";
import { Img, img }from "./Img";
const Section2 = () => {
    return (
        <>
            <div>
                <h3>Tag가 lowercase인 경우, React는 HTML태그로 인식</h3>
                <img/>
                <Img/>
                <Fragment></Fragment>
            </div>
            <div>
                <Parent />
            </div>
        </> 
    );
};

const Parent = () => {
    return (
    <>
        <Child1 text1='hi' text2='nice to meet you'/>
        <Child2 text1='hi' text2='nice to meet you'/>
    </>);
};

const Child1 = (props) => {
    return <div>Child1 {props.text1} {props.text2}</div>
};

const Child2 = ({text1, text2}) => {
    return <div>Child2 {text1} {text2}</div>
};

export default Section2;