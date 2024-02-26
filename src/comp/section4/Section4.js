import SectionComp from "../utils/SectionComp";
import { useRef, useState, useEffect } from "react";

export default function Section3() {
    return (
        <>
            <SectionComp title={'Ref는 값이 update 되어도 re-render 되지 않는다.'}>
                <RefComp />
            </SectionComp>
            <SectionComp title={'useEffect 사용 방법'}>
                <UseEffectComp />
            </SectionComp>
        </>
    );
}

const RefComp = () => {

    // declare
    let ref = useRef(0);

    // setter
    ref.current = ref.current + 'hello world';

    // getter
    const refExTag = (
        <>
            <div>{ref.current}</div>
        </>
    );

    let [state, setState] = useState(0);

    function handleClick() {
        ref.current = ref.current + 1;
        alert('You clicked ' + ref.current + ' times!');
    }

    function handlerClick2() {
        setState(state + 1);
    }

    return (
    <>
        <button onClick={handleClick}>
        Increase ref
        </button>
        <button onClick={handlerClick2}>
        Re-render
        </button>
        <div>{ref.current}</div>
    </>
    );
}

const UseEffectComp = () => {
    const [state, setState] = useState(100);
    const [isShowChild, setIsShowChild] = useState(true);
      
    return (
        <div>
            <button onClick={() => {setState(state + 100)}}>add 100 to props</button>
            <button onClick={() => {setIsShowChild(!isShowChild)}}>Toggle child</button>
            {isShowChild && <UseEffectChildComp testPrps={state}/>}
        </div>
    )
}

const UseEffectChildComp = ({testPrps}) => {
    const [val1, setVal1] = useState(0);
    const [val2, setVal2] = useState(0);

    // 처음으로 Tree에 mount 됐을 때
    useEffect(() => {
        console.log('initialized!');
    }, []);

    useEffect(() => {
        console.log('value updated');
    }, [value]);

    // state / props가 업데이트 되었을 때
    useEffect(() => {
        if(val1 == 0) return;

        console.log('val1 updated');
    }, [val1]);

    useEffect(() => {
        if(val2 == 0) return;

        console.log('val2 updated');
    }, [val2]);

    useEffect(() => {
        console.log('testProps updated, ', testPrps);
    }, [testPrps]);

    // 이 Component가 DOM tree에서 제거되었을 때
    useEffect(() => {
        return () => {
            console.log('This DOM element is removed');
        };
    }, []);
      
    return (
        <div>
            <div>Tag1: {val1}</div>
            <div>Tag2: {val2}</div>
            <div>Parent props: {testPrps}</div>
            <button onClick={() => {setVal1(val1 + 1);}}>add tag1 1</button>
            <button onClick={() => {setVal2(val2 + 1)}}>add tag2 1</button>
        </div>
    )
}