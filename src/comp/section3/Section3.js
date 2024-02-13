import SectionComp from "../utils/SectionComp";
import { useState } from "react";

export default function Section3() {
    return (
        <>
            <SectionComp title={'useState의 초기화값으로 객체를 넣으면 deep copy가 작동한다.'}><UseStateInitObjDeepCopy /></SectionComp>
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