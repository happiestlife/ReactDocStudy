import SectionComp from "../utils/SectionComp";
import { useState, useContext, createContext } from "react";

export default function Section3() {
    return (
        <>
            <SectionComp title={'useState의 초기화값으로 객체를 넣으면 deep copy가 작동한다.'}>
              <UseStateInitObjDeepCopy />
            </SectionComp>
            <SectionComp title={'Context 시 Provider를 한번이라도 설정해주었다면 그 하위 tree의 자식 Component에서는 설정한 Context 사용 가능'}>
              <UseContextParentComp/>
            </SectionComp>
            <SectionComp title={'Multi Context 사용 방법'} >
              <UseMultipleContextComp />
            </SectionComp>
        </>
    );
}

const UseStateInitObjDeepCopy = () => {
    const initialItems = [
        { title: 'pretzels', id: 0 },
        { title: 'crispy seaweed', id: 1 },
        { title: 'granola bar', id: 2 },
    ];

    const [items, setItems] = useState(initialItems);
    const [selectedItem, setSelectedItem] = useState(
      items[0]
    );
  
  
    function handleItemChange(id, e) {
      setItems(items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            title: e.target.value,
          };
        } else {
          return item;
        }
      }));
    }
  
    return (
      <>
        <h2>What's your travel snack?</h2> 
        <ul>
          {items.map((item, index) => (
            <li key={item.id}>
              <input
                value={item.title}
                onChange={e => {
                  handleItemChange(item.id, e)
                }}
              />
              {' '}
              <button onClick={() => {
                setSelectedItem(item);
              }}>Choose</button>
            </li>
          ))}
        </ul>
        <p>You picked {selectedItem.title}.</p>
      </>
    );
}

const CustomContext = createContext({
  prop1: 'val1',
  prop2: 'val2'
});
const UseContextParentComp = () => {
  const value = useContext(CustomContext);

    return (
      <div>
        <CustomContext.Provider value={{... value, prop2: 'updated val2'}}>
          Current Context: {value.prop1} {value.prop2}
          <UseContextChildComp1 />
        </CustomContext.Provider>
      </div>
    )
};

const UseContextChildComp1 = () => {
  const value = useContext(CustomContext);
  return (
    <h1>
      child comp1 <br/>
      Current Context: {value.prop1} {value.prop2}
      <UseContextChildComp2 />
      <WrongUseContextChildComp2 />
    </h1>
  )
};

const UseContextChildComp2 = () => {
  const value = useContext(CustomContext);
  return (
    <h2>
      child comp2 <br/>
      Current Context: {value.prop1} {value.prop2}
      <UseContextChildComp3 />
    </h2>
  )
};

const WrongUseContextChildComp2 = () => {
  const value = useContext(CustomContext);

  value.prop1 = 'Interrupted val1';

  return (
    <h2>
      child comp2 <br/>
      Current Context: {value.prop1} {value.prop2}
      <UseContextChildComp3 />
    </h2>
  )
};

const UseContextChildComp3 = () => {
  const value = useContext(CustomContext);

  return (
    <h3>
      child comp3 <br/>
      value: {value.prop1} {value.prop2}
    </h3>
  )
};


const Context1 = createContext(1);
const Context2 = createContext(2);
const UseMultipleContextComp = () => {

  return (
    <Context1.Provider value={10}>
      <Context2.Provider value={20}>
        <UseMultipleContextChildComp />
      </Context2.Provider>
    </Context1.Provider>
  );
}

const UseMultipleContextChildComp = () => {
  const context1Value = useContext(Context1);
  const context2Value = useContext(Context2);

  return (
    <div>
      <div>Context1 value: {context1Value}</div>
      <div>Context2 value: {context2Value}</div>
    </div>
  )
}