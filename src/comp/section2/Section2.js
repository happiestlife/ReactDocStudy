import { Fragment, useState } from "react";
import { Img, img }from "./Img";
import SectionComp from "../utils/SectionComp";
const Section2 = () => {
    return (
        <>
            <SectionComp title={'Tag가 lowercase인 경우, React는 HTML태그로 인식'} Content={<>
                <img/>
                <Img/>
                <Fragment></Fragment>
            </>}/>
            <SectionComp title={'How to use props'}><Parent /></SectionComp>
            <SectionComp title={'list rendering'} ><ListRendering /></SectionComp>
            <SectionComp title={'Invalid Key rendering'} desc={`첫번째에 새로운 input을 넣으려고 하지만 새로 들어간 첫번째 input에 이전 첫번째의 input 데이터가 들어가는 오류 발생 <br/>-> 잘못된 key 지정으로 발생한 오류`} content={<InvalidKeyRendering />}><InvalidKeyRendering /></SectionComp>
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

const ListRendering = () => {
    const list = [
        <div key={1}>test1</div>, 
        <div key={2}>test2</div>,
        <div key={3}>test3</div>
    ];

    return (
        <div>{list}</div>
    );
};

const InvalidKeyRendering = () => {
    const [data, setData] = useState([]);

    const handleAddBtnOnClick = () => {
        setData(['cut', ...data])
    }

    const handleResetBtnOnClick = () => {
        setData([]);
    };
    console.log(data);

    const inputs = data.map((d, idx) => {
        return (
            <>
                <input key={idx} defaultValue={d}/>
                <br/>
            </>
        );
    }); 

    return (
        <div>
            <div>
                <button onClick={handleAddBtnOnClick}>add Button</button>
                <button onClick={handleResetBtnOnClick}>Reset</button>
            </div>
            <div>{inputs}</div>
        </div>
    );
};

export default Section2;