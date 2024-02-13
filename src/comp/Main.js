import { Routes, Route } from "react-router-dom";
import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
import Section3 from "./section3/Section3";

export default function Main() {  
    const sections = [<Section1 />, <Section2 />, <Section3 />];

    const sectionRouters = sections.map((s, idx) => {
        return <Route key={idx} path={'/section/' + (idx + 1)} element={s}></Route>
    });

    return (
        <div className="main">
            <Routes>
                <Route path="/" element={<h1>React Doc Study</h1>}></Route>
                {sectionRouters}
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path='*' element={<div>Not Found</div>}/>
            </Routes>
        </div>  
    );
}  