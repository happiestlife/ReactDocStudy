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

<br>

<details>
  <summary style="font-size: 25px">Section 2</summary>

  ### Your First Component
  - JSX문법을 활용할 때, Component의 이름의 첫글자가 소문자면 React는 HTML 태그로, 대문자면 React Component로 판단

  - nested 형태로 Component 생성 시, 버그 및 속도 하락 야기 => 따로따로 구현 필요

  - Component import 시 "imprt ~ from './test'"와 같은 형태로도 js 파일 import 가능.

    다만, ~ from './test.js'와 같이 확장자를 붙여주는 것이 native ES Modules에 적합\

  <br>

  ### Writing Markup with JSX
  - JSX와 React는 서로 별개의 기술. 각각은 따로 사용이 가능하다.

    JSX만을 사용하고 싶다면 babel 라이브러리 설치 필요

  - JSX 문법

    1. 하나의 Root Component가 반한되어야 한다.

        다음과 같이 여러개의 Component를 반환해야 하는 경우, 특정 Tag 혹은 <></>(Fragment) 태그로 감싸야 한다.

        ```
          <h1>title 1</h1>
          <h2>title 2</h2>
          ...

          -> 

          <>
            <h1>title 1</h1>
            <h2>title 2</h2>
          </>
        ```

        * <></> == \<Fragment>\</Fragment>

          Fragment는 아래의 코드와 같이 리스트를 반환할 때 key 지정을 위해 불필요하게 생성되는 Component 제거를 위해 사용
          ```
          function Blog() {
            return posts.map(post =>
              <Fragment key={post.id}>
                <PostTitle title={post.title} />
                <PostBody body={post.body} />
              </Fragment>
            );
          }
          ```

    2. 모든 Tag에는 닫힘 문구가 들어가야 한다.

    3. 대부분의 속성들이 Camelcase로 작성된다.

        기존의 class 속성 -> className


    기존의 HTML을 JSX 문법으로 전화시키기 위해서는 많은 시간 소요 

    -> https://transform.tools/html-to-jsx 사이트에서 바꾸기

  <br>

  ### Javascript in JSX with Culy Braces

  - JSX 안에서 {변수 / 값}를 사용해 가변적으로 데이터를 넣을 수 있다.

    주로 text / 속성 / Component를 넣는데 사용 (Tag에는 적용 X. Ex. <{tag}>Gregorio Y. Zara's To Do List</{tag}> ) 

  - JSX에서 inline으로 style 지정 시 { key: value } 형식으로 전달 필요 
    ![Alt text](./img/JSX_inline_CSS.png)

  - JSX 내부에서 값에 대한 모든 연산은 {} 안에서 이루어저야 한다.

    ![Alt text](./img/JSX_operation.png)

    문자인 경우는 따로 따로 선언해서 사용 가능

    ![Alt text](./img/props_text.png)

  <br>

  ### Passing Props to a Component

  - 부모 Component에서 자식 Component로 데이터를 전달하는 방식은 props를 제외한고 존재 X

  전달 방식

  ![Alt text](./img/props.png)

  - desctructuring 문법을 사용하면 default parameter value 지정 가능

  

  - props로 객체의 모든 값들을 전달하고 싶다면 다음과 같이 사용 

    ![Alt text](./img/spread_props.png)

  - [핵심] 🎉아래와 같이 부모 자식간에 JSX 태그로 nested 되어 있다면 부모 Component 자식에 대한 값을 children 인자로 받을 수 있다. 

    ![Alt text](./img/nestedComp.png)    ![Alt text](./img/childrenProps.png)

    🎉 즉, 부모 Component는 상위 Component에 의해서 임의의 자식 Component를 가질 수 있다는 의미. 

  - [핵심] 🎉 리액트를 잘 설계하기 위해서는 Component의 재사용성과 예층 가능성에 초점을 두고 개발 필요

    그렇기 위해서, 자식 Component에서는 부모 Component로부터 받은 props를 절대 변경해서 사용하면 안된다.

    그렇다고 모든 데이터를 부모 Component에서 조작해야 한다는 의미는 X

    자식에서는 전달받은 props를 임의로 데이터를 cud하면 안되고 그 형태를 변형하는 것은 괜찮다. 

    ![Alt text](./img/handleProps.png)

  - props로 전달받은 데이터를 함수의 인자로 넣고 싶다면 {}를 사용하지 않기

<br>

### Conditional Rendering

- React Component에서 null을 반환하면 아무것도 랜더링 되지 않는다. (비추천방식)

- js에서 조건부 랜더링 방식

  1. { 조건식 ? comp1 : comp2 }

  2. { 조건식 && comp }

    js에서는 false에 대해서는 rendering 하지 않는다.

  3. 조건문을 사용하여 변수에 값 삽입 및 활용

<br>

### Rendering Lists

- Array에 저장된 Component들은 {}에 넣어서 한번에 매핑이 가능

  ``` 
    const list = {
      <div key={1}>test1</div>, 
      <div key={2}>test2</div>,
      <div key={3}>test3</div>
    };

    return (
      <div>{list}</div>
    );
  ```

- Array를 Comoponent로 전달하면 반드시 array의 요소들은 서로를 구분해줄 수 있는 key를 가져야 한다.

  이 key는 Component의 이동, 삽입, 삭제에 중요하게 작용 

  Tip. uuid 사용하기

  (자세한 내용은 Section2 내용에서 직접 해보기)

- key의 규칙

  1. key는 sibling 간에 unique해야 한다. (다른 배열 요소들의 key와는 같아도 됨)

  2. key는 한번 할당되면 불변해야 한다. 

      -> re-rendering 시 key를 재생성하면 안된다.

<br>

### Keeping Components Pure

- Pure Function의 조건

  1. 자신의 내부 로직에 대해서만 영향력을 끼치며 함수 호출 전의 변수 및 객체에는 영향을 주지 않는다.

  2. 같은 parameter를 넣었을 때, 같은 result가 도출된다. 

- React는 모든 Component가 pure function으로 구성되어 있다는 가정하에 설계됨 

- React의 Strict Mode는 Component를 만드는 함수를 2번씩 호출

  2개의 결과가 같다면 해당 요소는 pure function으로 판단

  Strict mode를 적용하려면 root Component를 <React.StrictMode>로 감싸주면 된다. 

- Event handler는 Component가 rendering될 때 작동하지 않기 때문에, pure할 필요 x

  만약 적절한 event를 찾지 못했다면 최후의 방법으로 useEffect를 활용해야 한다. 

- React가 purity를 핵심 특징으로 생각하는 이유

  1. Memo를 사용하여 같은 input이 들어온 경우, Component rendering을 생략 가능

  2. side effect가 없기 때문에, deep Component tree를 rendering 하는 중간에 다시 재빠르게 다시 rendering 가능
  (이전에 존재하던 값들에 영향을 주지 않기 때문 )

  <br/>


### Your UI as a Tree

- Render tree는 Component간에 관계를 나타낸다. 

- Dependency tree는 각 모듈이 어떤 모듈을 import 중인지 나타내는 지도

</details>

<br>

<details>
  <summary style="font-size: 25px">Section 3</summary>

### Responsding to Events

- event handler이름은 관습적으로 "handle + 이벤트 이름"을 가진다.

  Ex) handleStartBtnClick

- <div> / <button> 과 같은 primitive HTML 태그들이 아닌 React Component에 대해서 handler를 붙일 경우, 관습적으로 "on + 이름(첫글자 대문자)"의 형태로 써준다.

- onScroll 이벤트를 제외한 모든 이벤트는 event propagation이 진행된다. (최초 발생 Component부터 상위 Component까지 이벤트가 전파되는 기능)

  onScroll은 해당 Component에서만 발생

- 만약 event를 capture하고 싶다면 상위 컴포넌트들에 onClickCapture과 같은 형식으로 handler 지정

  (event 발생 순서: capture -> event handler(실제) -> event handler(상위) )

- rendering 함수와는 다르게 event handler 함수는 pure할 필요가 없기 때문에 변수의 값 변경과 같은 변화를 주기 용이 

<br />

### State: A Component's Memory

- Component 내부에 선언된 local 지역변수는 Component가 render 됐을 때 초기화 되고, 값이 변경되어도 re-render 되지 않는다. 



</details>

<br>

<details>
  <summary style="font-size: 25px">Section 4</summary>
</details>

<details>
  <summary style="font-size: 25px">Section 5</summary>
</details>