import styled from 'styled-components';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useNavigate } from 'react-router-dom';

const Bar = styled.div`
  position: sticky;
  // top: 200px;
  width: 13rem;
  height: 100%;
  position: fixed;
  // left: 19rem;
  // top: 12rem;
  // transform: translate(1em, 12rem); 
  border-right: 1px solid black;
`;

export default function Navigator() {
  const navigate = useNavigate();

  let arr = Array(2);
  const items = arr.map((i, idx) => {
    return {
      title: `Section${idx+1}`,  
      itemId: `/section/${idx+1}`
    }
  });

  const handleClickSidebar = (id) => {
    navigate(id);
  } 


  return (
    <>
      <div className='sidebar'>
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId="/management/members"
          onSelect={({itemId}) => {
            handleClickSidebar(itemId);
          }}
          items={[
            {
              title: 'Section1',
              itemId: '/section/1',
            },
            {
              title: 'Section2',
              itemId: '/section/2',
              // subNav: [
              //   {
              //     title: 'Projects',
              //     itemId: '/management/projects',
              //   },
              //   {
              //     title: 'Members',
              //     itemId: '/management/members',
              //   },
              // ],
            },
          ]}
        />
      </div>
    </>
  );
}