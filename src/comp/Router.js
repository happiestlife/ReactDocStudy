import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Section1 from './section1/Section1';
import Navigator from './Navigator';

import Main from './Main';

const Routers = () => {
    const sections = [<Section1 />];

    const sectionRouters = sections.map((s, idx) => {
        return <Route key={idx} path={'/section/' + (idx + 1)} element={s}></Route>
    });

    console.log(sectionRouters);

	return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}></Route>
                {sectionRouters}
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path='*' element={<div>Not Found</div>}/>
            </Routes>
            <Navigator />
        </BrowserRouter>
	);
};

export default Routers;