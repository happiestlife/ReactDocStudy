import styled from 'styled-components';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const Bar = styled.div`
  position: sticky;
  top: 200px;
  width: 13rem;
  height: 100%;
  /* position: fixed;
  left: 19rem;
  top: 12rem;
  transform: translate(1em, 12rem); */
  border-right: 1px solid black;
`;

export default function App() {
    return (
      <>
        <Bar>
          <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({itemId}) => {
              // maybe push to the route
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <div>inbox</div>,
              },
              {
                title: 'Management',
                itemId: '/management',
                elemBefore: () => <div>user</div>,
                subNav: [
                  {
                    title: 'Projects',
                    itemId: '/management/projects',
                  },
                  {
                    title: 'Members',
                    itemId: '/management/members',
                  },
                ],
              },
              {
                title: 'Another Item',
                itemId: '/another',
                subNav: [
                  {
                    title: 'Teams',
                    itemId: '/management/teams',
                  },
                ],
              },
            ]}
          />
        </Bar>
      </>
    );
}