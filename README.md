# ReactDocStudy
React 공식 문서 사이트에서 배운 내용 학습 Repository

URL : https://react.dev/learn/tutorial-tic-tac-toe#setup-for-the-tutorial

<details>
<summary style="font-size: 25px">Section 1</summary>
- React Component들은 일반 태그와 구분하기 위해 반드시 대문자로 시작해야 한다. 

  그렇지 않았을 경우, 다음과 같은 오류 발생
  ![Alt text](./img/image.png)

- React 태그는 한번에 하나의 Component를 반환해야 한다. 그렇지 않을 경우에는  태그로 \<div> 혹은 \<>태그로 감싸야 한다.

  \<> 태그로 감싼 경우, 반환될 때에는 <>를 제외한 나머지 태그들이 반환됨

<br>

- class 사용시 "className" attribute 사용

<br>

- js로부터 데이터를 태그로 전달할 때에는 {객체.property} / {변수}와 같은 형태로 전달

  css에 데이터를 전달하고 싶다면 style={{ key : value }}와 같은 형태로 전달하기 (style를 객체 형태로 전달하기 위함)

<br>

- 동일한 Type의 Sibling Component 사이에는 각각의 Component를 구별하기 위한 "Key" attribute가 필요

  없다면 오류 발생 및 index를 key로써 사용

  ![Alt text](./img/image-1.png)


  다음과 같이 Component를 연속적으로 선언할 때에는 오류 구문이 발생하지 않지만, 리스트 타입으로 Component를 매핑시키려 할 때 ({리스트}) 오류 발생

  또한, sibling 간에 unique하지 못한 값을 사용한다면 추후, update / delete 시 문제가 발생할 확률 👆

  Ex) index를 key로 사용하고 첫번째 Component를 삭제했을 때, re-render 되면서 두번째 컴포넌트의 값이 첫번째 컴포넌트의 값으로 올라가는 현상 발생 가능 

<br>

- Component들이 상태값을 갖게 하고 싶다면, React의 useState(상태의 초기값) 사용하기 
    ```
    function Comp(){
        ...
        const [변수, set변수이름] = useState(초기값);
        ...
    }
    ```
  여기서 변수는 Component가 상태값으로써 관리할 값이고, "set변수이름" 함수는 상태값을 update시킬 수 있는 함수

  "set변수이름"의 함수를 사용한다면 React는 해당 컴포넌트의 변경된 상태값을 가지고 re-render를 시작

  <br>


- 부모 Component에서 자식 Component로 전달하는 데이터를 props라고 지칭

  props는 데이터를 부모로부터 전달 받았을 때, {props key}의 형태로 값 / 함수를 매핑시킬 수 있다. 

  ```
    function Parent() {
      function handleOnClick(e){
        console.log('clicked!');
      }

      return (
        <div>
          <Child text="child" handleOnClick=handleOnClick>
        </div>
      )
    }

    function Child({text, handleOnClick}){
      return (
        <button onClick={handleOnClick}>{text}</button>
      );
    }
  ```

  부모 Component가 update되면, 본인 및 그 하위의 모든 자식 컴포넌트들이 re-render 된다. 

  -> [핵심] 
  
  🎉만약 2개 이상의 자식들로부터 데이터를 가져오거나 자식들끼리 상호작용하는 것을 원한다면, 그 자식들의 상위 Component인 부모 Component에 상태를 선언하고 내려주기 

  🎉설계시 sibling Component 사이에서 상호작용이 일어난다면, 각 state를 최소 부모 Component로 끌어올려서 관리

  <br>

  항상 최소한의 state를 Component에 놓으려고 노력해야 한다. 


<br>

- Project \<Tic Tac Toe> : 
    
    - Component: Game <- Board <- Square

    - [핵심] 🎉Game이 유일하게 statue를 가지는 Component -> 게임 데이터가 우측의 button과 좌측의 board간 연동을 위한 "최소 공통 부모"이기 때문 🎉

    - 부모에서 자식에게 Handler를 넘겨주고, 자식에서 handler를 부착하고 이벤트를 발생시키면 부모의 statue(상태값) 업데이트 

      -> 자동으로 자식들도 상태 업데이트
</details>