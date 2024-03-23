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

  -> **핵심** 
  
  ✨`약 2개 이상의 자식들로부터 데이터를 가져오거나 자식들끼리 상호작용하는 것을 원한다면, 그 자식들의 상위 Component인 부모 Component에 상태를 선언하고 내려주기 

  ✨`계시 sibling Component 사이에서 상호작용이 일어난다면, 각 state를 최소 부모 Component로 끌어올려서 관리

  <br>

  항상 최소한의 state를 Component에 놓으려고 노력해야 한다. 


<br>

- Project \<Tic Tac Toe> : 
    
    - Component: Game <- Board <- Square

    - **핵심** ✨`ame이 유일하게 statue를 가지는 Component -> 게임 데이터가 우측의 button과 좌측의 board간 연동을 위한 "최소 공통 부모"이기 때문 ✨`
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

  - JSX 내부에서 값에 대한 모든 연산은 {} 안에서 이루어저야 한다. (속성 한정)

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

  - **핵심** ✨`래와 같이 부모 자식간에 JSX 태그로 nested 되어 있다면 부모 Component 자식에 대한 값을 children 인자로 받을 수 있다. 

    ![Alt text](./img/nestedComp.png)    ![Alt text](./img/childrenProps.png)

    ✨`즉, 부모 Component는 상위 Component에 의해서 임의의 자식 Component를 가질 수 있다는 의미. 

  - **핵심** ✨`리액트를 잘 설계하기 위해서는 Component의 재사용성과 예측 가능성에 초점을 두고 개발 필요

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

- \<div> / \<button> 과 같은 primitive HTML 태그들이 아닌 React Component에 대해서 handler를 붙일 경우, 관습적으로 "on + 이름(첫글자 대문자)"의 형태로 써준다.

- onScroll 이벤트를 제외한 모든 이벤트는 event propagation이 진행된다. (최초 발생 Component부터 상위 Component까지 이벤트가 전파되는 기능)

  onScroll은 해당 Component에서만 발생

- 만약 event를 capture하고 싶다면 상위 컴포넌트들에 onClickCapture과 같은 형식으로 handler 지정

  (event 발생 순서: capture -> event handler(실제) -> event handler(상위) )

- rendering 함수와는 다르게 event handler 함수는 pure할 필요가 없기 때문에 변수의 값 변경과 같은 변화를 주기 용이 

<br />

### State: A Component's Memory

- Component 내부에 선언된 local 지역변수는 Component가 render 됐을 때 초기화 되고, 값이 변경되어도 re-render 되지 않는다. 

  이 문제를 해결할 수 있는 방법 => useState

- useStatue 사용법

  useState(초깃값): Component의 상태값 선언

  반환값의 첫번째 요소는 상태값을 담을 변수, 두번째 요소는 상태값을 업데이트할 수 있는 setter 함수

  ```
    function Comp () {
      const [data, setData] = useState(0);
    }
  ```

  setter 함수를 통해 값이 업데이트되면 해당 Component는 자동으로 re-render

- Hook: useEffect와 같이 use로 시작하는 React에서 제공해주는 함수

  hook은 반드신 Component나 custom hook의 최상단에 선언되어야 한다.

  조건문이나 반복문에서 선언한다면 오류 발생

- Component 내부에서 원하는 만큼의 state을 선언 가능

  만약 동일한 성격의 여러 statue가 따로 선언되었다면 하나로 묶어서 관리하는 것이 효과적

- state를 가진 Component를 여러개 선언했다면, 각각의 Component는 각자만의 state를 가진다.(독립적)

- 내부적으로 state가 관리되는 방법

  1. 각 Component마다 state pair를 array 형태로 소유

  2. useState를 사용할때마다 다음 차례의 state를 반환해주고 state 내부 index를 하나 증가

  * 이 문법이 가능한 이유는 위에서 설명했듯이 Hook은 Component의 최상단에 선언되어야 한다는 조건으로 인해 항상 동일한 순서로 hook이 호출되기 때문

  참고: https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e


<br />

### Render and Commit

- React에서 UI에 Component가 적용되는 프로세스

  1. trigger a render

      - render가 trigger되는 조건

        (1) 최초 render 시

          - createRoot 함수가 호출되면서 해당 및 그 하위의 모든 Component의 render 함수 작동

        (2) state 값 update 시 (setter 함수 이용시에만!)

  2. Rendering the component

      render가 trigger된 후, React는 Component에게 어떤 형태를 화면에 그릴 것인지 요청

      최초에는 root Component부터 render가 실행되지만 이후에는 render가 trigger된 Component부터 render 실행

      -> Component(1)의 반환값이 이전과 다르다면, 달라진 Component(2)에 대해서 다시 render 실행
      -> Component(2)의 반환값이 이전과 다르다면, 달라진 Component(3)에 대해서 다시 render 실행
      -> ... (재귀적으로 실행)

      * 만약 state가 update된 Component가 React Virtual DOM tree의 상단에 위치한다면 성능 하락 야기 
      -> 최적화 필요

  3. Committing to the DOM

    - 최초시, 생성한 모든 DOM node들을 appendChild()를 통해 붙이기

    - re-render시, 달라진 부분만 실제 DOM에 re-render

      -> 효율성 up!

<br/>


### State as a Snapshot

- state의 setter는 현재의 state를 다음 render에 적용할 수 있는 값으로 변경할 뿐이다. 

  **핵심** ✨`현재 진행되는 render에서 여러번의 state의 setter 호출은 마지막의 setter만 state에 영향을 준다.

  ![alt text](./img/call%20state%20setter%20multiple.png)

  다음과 같이 state setter를 동시에 여러번 호출해도 count는 하나씩만 증가

  ![alt text](./img/call%20state%20setter%20multiple%202.png)

  위 사진처럼 setter가 배치되었을 때 button을 누르면 number는 2씩 증가

- 한번의 render 중에는 state값은 setter를 호출하더라도 절대 변경되지 않는다. (snapshot)

  단지 다음번의 render에 대한 state값이 변경될 뿐이다.

  아래의 코드를 보면 number의 초깃값이 0이었을 때 alert로 5가 출력될 것 같지만, 실제로는 0이 출력

  ![alt text](./img/async%20set%20state%20ex.png.png)

  비동기적으로 render가 화면에 반영한 후 state를 호출하더라도, 해당 render가 진행됐을 때의 state 값으로 render 진행

  <br/>

### Queueing a Series of State Updates

- render 시 state 값이 고정되는 이유는 state 값을 update 동작은 state의 setter가 모두 호출된 후에 실행되기 때문

   => 이런한 형태의 동작 : Batching

  Batching은 안전한 상태에서만 진행된다.

  안전한 상태의 예시) 버튼의 첫번째 클릭이 form을 disable 시키면 두번째 버튼의 클릭은 다시 제출되지 않는다. 

- 만약 render 시 setter를 통한 state 값의 변경을 원한다면 setter의 인자로 값을 변경하는 함수 전달하기 

  ![alt text](./img/changeStateAtSameRender.png)

  setter에 인자로 전달된 함수: updater function

  작동 원리

    1. event handler(setter)가 모두 호출된 후 updater function이 실행되도록 queue에 저장됨

    2. 다음 render 시, queue에 저장된 모든 updater function이 실행되고 최종적으로 update된 state 값을 useState의 반환값으로 전달

  - queue에 전달된 처리 로직 중 update func는 기존의 update가 진행중이던 state의 값을 이어받아 update를 진행하지만, 단순 replace with value 로직은 이전의 update되고 있던 state 값을 무시하고 state에 새로운 값 할당 

  2가지 예시

  - 예시1

    ![alt text](./img/updateFuncEx1.png)

    버튼을 눌렀을 때: number += 6;

    render 시 state 업데이트 과정

    ![alt text](./img/updateFuncEx1Process.png)

  - 예시2

    ![alt text](./img/updateFuncEx2.png)

    버튼을 눌렀을 때: number = 42;

    render 시 state 업데이트 과정

    ![alt text](./img/updateFuncEx2Process.png)

<br />

### Updating Objects in State

- state에 저장된 객체를 다룰 때에는 객체를 복사하든, 새롭게 만들든 기존의 state 객체에 영향을 주어서는 안된다.

  다음과 같은 코드는 위험

  ![alt text](./img/treat%20state%20obj%20immutable.png)

  이 코드에서 버튼을 누른다고 해서 render가 실행되지 않고 backgroud에서 state의 값만 변경되기 때문에 코드의 버그를 알아차리기 매우 어렵게 된다. 

-  **핵심** ✨`객체 state의 특정 property만 변경시켜서 state에 반영하고 싶다면, 새로운 객체를 만들어서 setter에 적용시키기!

- 만약 객체의 특정 property만 변경되고 나머지 property는 이전 값과 동일하다면 ... 문법(spread syntax) 사용하기

  ![alt text](./img/spread%20syntax.png)

  spread syntax는 객체 property의 1-depth까지밖에 영향을 끼치기 때문에 state가 nested된 객체 형태라면 반드시 재귀적으로 호출 필요

- 여러 input의 값 변경에 대한 event handler에 대해서 한번에 적용하고 싶다면 다음과 같은 코드 작성

  ![alt text](./img/spread%20syntax%20util1.png)  ![alt text](./img/spread%20syntax%20util2.png)

  e.target.name은 input의 name 속성에 지정한 값을 나타냄

  ->  여러개의 input change event handler에 동일한 handler 지정 가능 


- 만약 state가 deep nested 되어 있고 state의 특정 property만 변경하고 싶다면 immer를 통해 특정 property만 변경하는 코드 작성 가능

  ![alt text](./img/immer%20example.png)

  위의 코드와 같이 useState 대신 useImmer를 통해 사용 가능

  immer는 setter를 통해 변경된 state의 property 값을 "draft"라는 proxy에 저장해두었다가 추후 state에 적용

- React에서 state 객체의 property 값을 변경(mutate)하는 것을 추천하지 않는 강력한 이유

  1. Debugging

      state의 값을 변경하지 않는다면, state의 이전 값들을 확인 가능

  2. Optimization

      대부분의 React 최적화 전략은 이전 props / state 값과 다음 render 시의 props / state 값이 같다고 판단하는 것

      state값을 변경하지 않는다면 render는 빠르게 동작 (re-render하지 않기 때문)

  3. New feature

      React에서 개발중인 새로운 기능들은 render 중 state가 변경되지 않는다는 가정하에 개발중

<br/>

### Updating Arrays in State

- state 객체와 마찬가지로 array도 immutable 하게 다루어야 한다.

  예를 들어, arr[0] = 'test' / push() / pop() 와 같은 형태로는 사용하면 안된다. 

  객체와 동일하게 새로운 배열을 생성해서 update해주기
  
  ![alt text](./img/updateArrStateFuncs.png)


- 배열에 대한 삽입, 수정, 삭제 방법 

  1. 배열에서 특정 요소 삭제: filter

  2. 배열의 요소 변경: map
    
      일부 -> index 사용

  3. 삽입: spread syntax

      중간에 삽입을 원한다면 spread syntax + slice 활용

      ```
      const updateArr = [
        ...arr.slice(0, index),
        , // new component
        ...arr.slice(index)
      ];
      ``` 

- spread syntax는 shallow copy이기 때문에 reference type인 배열의 요소에 대해서는 값을 변경하면 안된다. 

  ![alt text](./img/wrongArrStateUpdateEx.png)

  js에서 reference type은 Object인 경우로 array, function, object가 있다. 

- 객체와 동일하게 immer를 사용하여 nested reference type 변수에 대한 수정을 간편하게 할 수 있다. 

  ![alt text](./img/immerWithArr.png)

  Immer가 제공하는 draft라는 객체를 수정하는 것이기 때문에, 기존의 array state는 변경되지 않는다. 


</details>

<br/>

<details>
  <summary style="font-size: 25px">Section 4</summary>

  ### Reacting to Input with State

- 선언적(declarative) 프로그래밍 vs 명령형(imperative) 프로그래밍

  명령형 프로그래밍은 기능의 구현을 위한 "코드의 구조"를 주 관점으로 바라보면서 개발하는 방법

  - 기능에 대한 알고리즘의 구현에 초점

  ```
    function test(arr){
      for(let i = 0; i < arr.length; i++){
        arr[i]++;
      }
    }
  ```

  선언적 프로그래밍은 기능에 초점을 두고 개발하는 방식 

  - 구현보다는 어떤 기능을 구현하는지를 명확하게 보여줌

  ```
    function test(arr) {
      return arr.map(i => i + 1);
    }
  ```

- 명령형 프로그래밍 방법은 당시의 조건에 따른 모든 상황에 대해 프로그래밍 해야 하기 때문에 프로그램이 복잡해질수록 관리가 어려워짐

  -> React가 이 문제를 해결하기 위해서 출시 

  React는 직접적으로 개발자가 UI를 조작하기 보단 "어떤 UI를 표시하고 싶은지"에 집중

  **핵심** ✨`React는 state 값을 사용해서 UI를 가변적으로 표시

  Ex. isEdit / isSubmitting 와 같은 상태

- React를 통해 선언적 프로그래밍 방법

  1. Component로 보여줄 여러 UI 상태를 식별

      기능 로직 구현 전에 mock 형태의 UI를 먼저 구현
  
  2. 어떤 이벤트가 state의 변화를 불러오는지 결정

  3. useState를 통해 state 저장

      어떤 state 변수를 선언해야 할지 애매모호하다면, 모든 visual state에 대해서 변수 선언

  4. 불필요한 state 삭제

      "최소한의" state를 선언하는 것이 핵심

      불필요한 state 제거를 위한 질문

        1. 이 state 변수가 역설(paradox)를 발생시키는가?

            isSubmitting과 isTyping은 동시에 발생할 수 없는 state

            역설을 발생시키지 않는 state는 제거 대상이 될 수 있다.

        2. 이 state 값이 다른 state를 통해 얻을 수 있는가?


  5. state 값을 변경하는 event handler 부착하기 


### Choosing the State Structure

  - Component에 state 설계 시 Tip

    1. 관련된 state 묶기

        동시에 여러 개의 state를 update 한다면, update 되는 state끼리 묶기 (to Object / array)

        object / array로 묶어야 하는 다른 경우는 얼마나 많은 state가 생겨날지 모를 때

        Ex. 개인정보 info에서 custom info를 추가적으로 계속 늘릴 수 있는 경우

    2. state에 대한 모순 피하기

       isSending & isSent와 같이 서로의 state 값이 같은 값일 수 없고 state 값이 변경됨과 함께 isSending 이후 isSent를 항상 같이 변경해야 할 때는 state가 잘못 선언된 상황

       ```
        function submit(){
          setIsSending(true);
          // sending code
          setIsSending(false);
          setIsSent(true);
        }
       ```

       이럴 경우는 isSending, isSent 라는 2개의 state를 하나의 state 변수에 저장하는 것이 관리에 효율적

    3. 불필요한 state 제거

        다른 state들을 가지고 특정 state 값을 얻을 수 있다면 계산으로 얻을 수 있는 state는 불필요

    4. 중복된 state 제거

    5. 깊게 nested된 state는 피하기

        nested된 state를 flat하게 만들기 위해서는 child를 가지는 property에 값 대신 id를 적고 child 값은 다른 곳에 선언하기 

        ![alt text](./img/aviodDeepNestedObj.png)

    이 원칙의 궁극적인 목표는 실수를 하지 않으면서 state 값을 쉽게 변경하기 위함

  - useState를 통해 state가 초기화되는 것은 최초에 Component가 render될 때에만 작동

    ![alt text](./img/mirrorPropErr1.png)

    따라서 아래와 같이 변수에 direct로 할당해서 사용하거나 초기화용 prop으로 사용

    ![alt text](./img/mirrorPropErr2.png)

    ![alt text](./img/mirrorPropErr3.png)

  - useState의 초기값으로 object가 전달되면 deep copy가 이루어진다. 

  <br/>

  ### Sharing State Between Components

  - 여러 개의 Component들이 각각의 state를 가졌는데 그 state들이 연동되어야 한다면, 여러 Component들의 최소 공통 부모 Component로 state를 올리고 자식 Component에게 props를 통해 전달하는 방식 이용

    -> lifting state up 방식 

    또한, 중복된 state들이 여러 곳에 퍼져서 관리되기 보단 부모 Component에서 관리하고 자식에게 내려주는 형식이 이후의 유지보수 측면에서도 좋다.

  - uncontrolled Component: state를 가지고 있는 Component

    controlled Component: state를 부모가 가지고 자신에게 props로 전달해주는 Component

  <br />

  ### Preserving and Resetting State

  - Component의 state는 Component에서가 아닌 React단에 존재하며 render tree를 가지고 어느 Component에 속한 state인지 파악

    **핵심** ✨`Component는 render tree의 어디서 속했는지에 따라 다른 Component로 파악된다

    => 같은 위치에 같은 Component가 온다면 render X

    **핵심** ✨`만약 같은 Component가 render tree의 같은 자리에서 사라졌거나 동일한 자리에 다른 Component가 온다면 이전 Component는 보존되지 않는다.

    아래의 예시에서 같은 JSX 태그 변수를 활용하고 있지만 render tree에서 다른 위치에 위치하기 떄문에 state가 각각 관리되고 있다.

    ![alt text](./img/renderTreeEx1.png)

    ![alt text](./img/renderTreeEx2.png)

    만약 같은 Component가 같은 자리에 사라졌다가 나타난다 하더라도 이미 해당 Component는 render tree에서 사라진 상태이기 때문에 보존되지 않았다. 

    따라서 2번째 Counter는 다시 나타났을 때 0으로 count가 초기화

    ![alt text](./img/renderTreeEx3.png)

    ![alt text](./img/renderTreeEx4.png)

    ![alt text](./img/renderTreeEx5.png)

  - render tree는 반환되는 JSX 태그에서의 Component들 간의 위치, parent-child 등으로 정해진다. 

    ```
      <div>
        <Component />
      </div>
      
      <ol>
        <Component />
      </ol>
      // 2개의 Component는 다른 Component로 간주됨
    ```

  - 만약 re-render될 때 Component 내부의 state 값을 보존(preserve)하고 싶다면 이전 render tree와 re-render tree를 동일하게 가지면 된다. 

  - 이번 장에서 설명한 이유 때문에 Component 선언 function을 nested하게 선언하면 안된다.

    왜냐하면 re-render 될 때마다 Component 선언 function들이 새로 생성될 것이기 때문

    ```
      // nested function example
      function Comp1() {
        function Comp2(){
          return <div>Comp2</div>;
        }

        return <>
          <Comp1/>
          <div>Comp2</div>
        </>;
      }
    ```

  - state 값을 초기화하고 싶다면 다음의 방법 사용

    1. Component를 다른 위치에 생성하기 

        조건에 따른 UI 변경 시나리오가 적을 경우 유용하다.

        아래와 같이 선언하면 동일한 위치에 생성한 Component로 판단되지만

        ![alt text](./img/resetState1.png)

        다음과 같이 다른 {}에 Component를 선언한다면 다른 Component로 인식

        ![alt text](./img/resetState2.png)

    2. Component에 다른 key를 삽입하기 

        **핵심** ✨`key를 Component에 props로 삽입해준다면, 동일한 Component type의 같은 key 값을 가진 Component라면 어느 곳에 위치하던 같은 Component로 판단

        아래와 같이 같은 위치에 선언된 Component일지라도 key 값이 다르기 때문에 다른 Component로 판단

        ![alt text](./img/resetState3.png)

  - render tree에서 삭제된 Component의 state 보존 방법

    1. 여러 개의 Component를 모두 UI에 올려놓고 현재 필요한  Component만 남기고 나머지 hide (비추천)

    2. 부모 Component로 lifting state up 하기

    3. localstorage와 같은 다른 browser 도구 사용하기

    <br/>

  ### Extracting State Logic into a Reducer

  - event handler 여러 곳에서 state를 직접적으로 수정한다면 보기 어려울 것.

    따라서, 직접적으로 state를 수정하는 외부의 함수인 Reducer를 두고 event handler에서 reducer를 호출하는 형태로 관리

  - useState에서 useReducer로 변경하는 방법

    1. setState 함수를 모두 dispatch 함수를 호출하는 형태로 변경

        dispatch 함수는 "action"이라는 프로퍼티를 전달함으로써 사용자가 어떤 행위를 했는지를 알려주는 형식으로 setState 함수처럼 React에 무엇을 지시하는 형식과는 다르다.

        ![alt text](./img/reducer%20dispatch%20.png)

        위처럼 dispatch의 인자로 전달한 객체를 "action"이라고 지칭

        action은 최소한의 데이터만 가지도록 설정해야 하고 어떠한 객체의 형태도 가능

    2. reducer 함수 생성

        reducer는 state를 update할 로직을 가지는 함수

        현재의 state와 dispatch를 통해 전달된 action 객체가 인자로 전달되고, update된 state를 return해주어야 한다.

        ![alt text](./img/reducer%20func.png)

        Ex) 관습적으로 action의 종류에 대해서는 switch 문을 사용

        <img src='./img/reducer func ex.png' height='500' />


    3. Component에서 reducer 사용

        아래와 같이, useReducer에는 실제 state update 함수, 초기 state 값을 차례대로 인자로 전달하면 state와 인자로 전달한 state update 함수를 호출해줄 dispatch 함수 전달

        ![alt text](./img/useReducer%201.png)

        ![alt text](./img/useReducer2.png)

        state를 인자로 전달하기 때문에 Component 외부에 reducer 함수를 선언해서 사용 가능

        -> 다양한 곳에서 사용 가능함으로 유지보수성 증가


    - useReducer의 장단점

      1. 코드 길이

          보통 useState를 사용했을 때 코드의 길이가 적지만 state를 update하는 방식이 각 Component마다 비슷하다면 useReducer가 더 적은 코드 창출

      2. 가독성

          단순한 Component에서는 useState가 직관적으로 읽기 좋지만 Component의 크기가 커짐에 따라 useReducer를 사용하는 것이 읽기 쉬워진다.

      3. 디버깅

          useState를 사용한 경우 모든 state를 update하는 모든 구절의 코드를 돌아보면 디버깅해야 하지만, useReducer를 사용한다면 reducer 함수에 console.log를 찍어봄으로써 빠르게 디버깅 가능

      4. 테스트

          reducer를 pure function임으로 테스트에 용이

    - React 개발 부서에서는 몇몇의 Component에서 state를 update할 때 오류가 자주 발생하거나, 더 복잡한 구조를 Component에 넣으려고 하는 경우에 reducer 추천


    - reducer를 잘 작성하는 방법

      1. reducer는 pure function이어야만 한다.

      2. 사용자의 행동이 여러 데이터에 변화를 주어도, 하나의 action으로 사용자 행동을 처리해야 한다.

          Ex) 사용자가 reset 버튼을 눌렀을 때 5가지의 개인정보 입력란을 초기화 해야 한다면, 5번의 setField가 아닌 1번의 resetForm를 action으로 호출해야 한다.

    - reducer는 immer와 같이 사용될 수 있다.

        ![alt text](./img/useImerr%20with%20reducer1.png)

        ![alt text](./img/useImmer%20with%20reducer2.png)


 <br />

 ### Passing Data Deeply with Context

  - 하나의 부모 Component에서 여러 depth 아래의 여러 Component에 같은 props를 전달해야 하는 경우, 중간에 위치한 모든 Component에 props를 전달해주어야 한다.

    -> 장황하고 불필요한 코드

    이 문제를 해결하기 위해 나온 것이 바로 Context

  - Context는 자식 tree에 위치한 모든 Component에서 부모 Component에 위치한 데이터를 사용할 수 있도록 해주는 기술

  - Context 사용 방법

    1. Context 생성하기

        ![alt text](./img/use%20context%20step1.png)


    2. 데이터를 필요로 하는 Component에서 Context 사용

        중간 Component에는 전달해주었던 props를 삭제 & 실제로 데이터를 필요로 하는 Component에서 useContext를 통해 데이터 가져오기

        ![alt text](./img/use%20context%20step2.png)

        만약 context 제공 Component에서 데이터를 제공하지 않으면 context를 초기화한 값이 전달된다.

    3. 데이터를 제공하는 Component에서 context 제공

        전달된 자식 Component JSX에 Context 태그를 wrap해주어 provider 설정
        
        ```
          <Context.Provider value={전달할 값}> 
            {자식 Component} 
          <Context.Provider/>
        ```

        ![alt text](./img/use%20context%20step3.png)

  - 하나의 Component에서 context.provider 제공 시, 하위 tree에 위치한 Component들에서는 설정해준 Context 값을 useContext를 통해 사용 가능
      
      아래 예시의 출력을 보면 context.provider로 값이 제공되기 전과 후의 값이 다르게 나오는 것을 확인 가능

      ![alt text](./img/context%20code%20ex1.png)

      ![alt text](./img/context%20code%20ex2.png)

      전달된 context 값을 바꾸는 유일한 방법은 context.provider를 사용하는 것

     만약 context가 객체 / 배열이고 다음과 같이 직접적으로 context를 변경하는 경우 디버깅에 어려움을 느낄 것

     ![alt text](./img/wrong%20use%20context%20ex1.png)  ![alt text](./img/wrong%20use%20context%20ex2.png)

  - createContext를 통해 생성된 context는 각각 독립적으로 작동

    여러 Context를 같은 곳에서 적용시키는 방법

      ![alt text](./img/multi%20context.png)

  - context 사용 전 고려 대상

    1. props를 전달하는 방식

        props를 전달하는 방식은 코드상으로 데이터의 흐름이 노출되기 때문에 디버깅에 유리

    2. children component를 전달하는 방식

        중간에 위치한 Component에 이들이 사용하지 않을 데이터를 전달한다는 것은 Component 추출이 잘 되어있지 않다는 의미

        ![alt text](./img/transfer%20children%20component.png)

    이 방식을 채택하지 않았을 경우 Context 사용 고려

  - Context 사용 사례

    - 테마: 웹사이트 배경색을 검정으로 변경할 경우, App의 최상단에 context.provider로 color를 black으로 지정

    - 로그인 계정 정보: 하위 여러 Component에서 로그인한 사용자 정보를 가지고 권한 등을 판별해야 하는 경우

    - 라우팅: 대부분의 Router 라이브러리에는 현재 경로를 context로 저장 및 관리

    - state 관리: App이 커짐에 따라 많은 state들이 App의 최상단에 위치 -> context와 reducer를 함께 사용한 코드 사용으로 효율성 증대

    **핵심** ✨`일반적으로 서로 다른 tree에서 멀리 위치한 Component끼리 동일한 정보가 필요할 때 Context를 사용 

  <br/>

### Scaling Up with Reducer and Context

  - reducer를 사용하고 부모 Component ~ 자식 Component 사이에 많은 중간 Component가 위치할 경우, state와 dispatch 함수를 context로 전달하여 문제 해결

    방법

      1. context 생성

          전달하려는 Component의 state와 dispatch 함수를 담을 context를 각각 생성

      2. 부모 Component에서 context에 state 및 dispatch 전달

          아래와 같이, Component를 생성하고 전달된 Children Component들을 context.provider로 감싸므로서 한 곳에서 provider 관리 가능 

          ![alt text](./img/context%20provider%20component.png)

      3. 부모 Component 하위 tree에 있는 모든 Component에서 context 및 dispatch 함수 사용 가능

  - context를 Component에서 direct로 호출하기보다 함수로 감싸서 호출한다면, 추후에 context 분활 혹은 로직 추가 등의 작업을 수행할 때 좀 더 쉬워진다. 

      ![alt text](./img/wrap%20useContext.png)

</details>

<br/>

<details>
  <summary style="font-size: 25px">Section 5</summary>

  ## **핵심** ✨ 이 단원에 나오는 기술들은 모든 특수한 경우에 사용해야 하는 기술들로, 과용해서는 안된다.

  ### Referencing Values with Refs

  - state처럼 값이 Component에서 유지되지만 값이 update됨에 따라 re-render되는 것을 원하지 않는다면 useRef 사용

      ref는 값을 current에 저장해서 관리하고 특별한 setter 없이 직접 ref.current에 값을 넣어줌으로써 update

      ref에 객체가 저장되어 있더라도 mutate한 update도 허용

      ![alt text](./img/useRef%20code%201.png)

      ![alt text](./img/useRef%20code%202.png)

  - rendering에 사용되는 데이터는 state로 관리하지만, render에 사용되지 않고 event handler에만 필요한 데이터는 ref로 관리 가능

  - ref는 render 중일 때 사용되어서는 안된다. 

    Stop watch로 예를 들 때, setInterval의 id를 ref로 보유하다가 start button 클릭 시 ref에 저장되어 있는 setInterval id로 clearInterval를 해주고 새로운 interval 시작

    중점적으로 보아야 할 점은 rendering에 ref 갑이 사용되지 않은 점

    ![alt text](./img/useRef%20code%203.png)

  - ref는 내부적으로 아래의 사진과 유사하게 구현되어 있다.

    ![alt text](./img/ref%20logic.png)

  - ref는 React 외부의 API를 사용할 때 유용

    Ex) 1. DOM 요소 저장 (대표적인 case)

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. timeout ID와 같이 render에 영향을 주지 않는 데이터

  - Ref는 특수한 상황에서만 사용되어야 하며, render 시 절대 사용되어서는 안된다.

    이 규칙을 지키지 않으면 예측하기 어려움 Component가 된다.

  <br/>

  ### Manipulating the DOM with Refs

  - ref가 주로 사용되는 목적은 DOM element를 저장해서 DOM API를 사용하기 위함

  - tag의 attribute로 ref={선언한 Ref}를 넣어줌으로써 DOM element의 reference가 저장됨

    ![alt text](./img/dom%20ref%20ex1.png)

    ref에 태그의 reference가 저장된 이후에는 ref.current.DOM api()를 사용 가능

  - 여러 DOM element들을 배열로 관리하는 방법

    1. 부모 parent를 ref에 저장하고 querytSelectorAll()를 사용하기 (비추천)

    2. 관리하고 싶은 여러 DOM element들의 attribute로 ref call 전달하기

        ref callback은 element가 DOM에 생성될 떄 DOM element를, DOM element가 제거될 때 null를 반환

        ![alt text](./img/ref%20callback.png)

        이 기술을 활용할 때, ref에 Map을 저장하고 ref callback을 이용해서 key: id, value: DOM element를 넣음으로써 DOM element 관리

        ![alt text](./img/ref%20callback%20ex.png)

  - 이미 존재하는 HTML 태그에 대해서 ref attribute를 지정하면 해당 태그에 대한 DOM element가 ref에 저장되지만, 개발자가 만든 Component에 ref attribute를 지정하면 null이 저장된다. (default)

    이것은 React가 기본적으로 Component가 자신이 아닌 다른 Component의 DOM node를 가질 수 없도록 하는 정책 때문

    Custom Component에도 ref를 전달하고 싶다면, forwardRef()를 통해 Component 선언하기

    ![alt text](./img/forwardRef%20ex1.png)

    ![alt text](./img/forwardRef%20ex2.png)

    button, input 등과 같은 low level에 위치한 Component를 forwardRef를 종종 허용하지만, form, list 등의 high-level Component에는 다른 Component에서 자신의 DOM node에 대한 접근을 허용하지 않는다.

    만약 다른 Component에서 자신의 DOM node를 사용할 때 제한을 걸고 싶다면 useImperativeHandler 선언을 통해 제한

      1. Custom Component에 실제 DOM node를 저장할 ref 선언

      2. useImperativeHandler(전달받은 ref, 허용할 api 목록(오버라이딩 필요))

          ![alt text](./img/useImperativeHandler.png)

  - React에서 update는 2가지 단계로 진행

    1. render: React가 component에게 어떤 UI를 그릴지 요청

    2. commit: React가 DOM에 전달받은 UI를 그림

    React는 commit 단계에서 ref.current의 값을 update. 

    DOM을 update하기 전에 null로 설정하고 update 후에 적용하려는 값(DOM element) 삽입

  - ref에는 주로 event handler에서 접근하지만, 마땅한 event가 없다면 useEffect 사용

  - state setter 함수 실행 후 바로 DOM에 반영하기를 원한다면 flushSync(() => {}) 활용

    ![alt text](./img/flushSync1.png)

    ![alt text](./img/flushSync2.png)

  - **핵심** ✨ DOM node를 가지고 수동적으로 변화를 주지 않기. focus, scrolling과 같은 api만 활용할 것

    예외적으로 React가 update하지 않는 부분의 DOM element에 대해서는 수정 가능(but 항상 주의 필요)

  <br/>

  ### Synchronizing with Effects

  - Component에는 2가지 종류의 규칙이 존재

    1. rendering code: state와 props를 활용하여 JSX를 반환. 반드시 pure 해야 한다.(같은 입력 => 같은 결과)

    2. event handler: side effect를 발생시킴

    하지만 일부 경우에서는 이 규칙이 깨지기도 한다
    
    이 경우 effect를 사용하여 rendering 중 발생한 side effect를 명시할 수 있다.

    effect는 commit 단계 마지막에 실행된다 -> render 이후 항상 실행됨

  - effect 작성 방법  

    1. effect 선언
    
       render 중에는 side effect 없이 항상 pure한 계산들로 구성되어야 한다. (state, constance, ...)

       또한, DOM element는 commit 단계에서 DOM tree에 Component가 부착되어야 사용이 가능

       -> useEffect(() => {}); 훅을 사용해서 render가 끝난 이후 side effect을 발생시키는 코드 실행 

       Ex) 아래와 같이 ref를 사용하면 DOM element가 ref에 저장되기 전에 ref 값(DOM element 호출) => 오류 발생

       ![alt text](./img/useEffect%20ex1.png)

       useEffect로 감싸서 side effect를 발생시키는 코드를 수행하면 render가 끝나고 실행되기 때문에 오류 발생 X

       ![alt text](./img/useEffect%20ex2.png)

    2. effect 의존성 명시

        rendering 될 때마다 useEffect가 마지막에 실행되지만 그렇지 않아도 되는 경우에는 useEffect에 호출 조건을 걸어서 해결.

        ![alt text](./img/useEffect%20when%20update.png)

        첫번째 인자로 의존성이 update될 때마다 호출될 callback, 두번째 인자로 첫번째 인자의 호출을 야기할 의존성(변수)를 지정

        ![alt text](./img/useEffect%20ex3.png)

        첫번째 버튼을 눌렀을 때만 'val1 updated' 문구의 alert창이, 두번째 버튼을 눌렀을 때만 'val2 updated' 문구의 alert창이 뜬다.

    3. 필요한 경우 cleanUp 함수 추가

        만약 Component가 소멸 / 제거되었을 경우 특별한 종료 로직이 필요할 경우에도 useEffect 사용 가능

        -> Component가 remount될 때 Component에 버그 / 오류가 생기는 경우

        첫번째 인자로 전달한 callback의 return으로 DOM이 제거되었을 때 호출할 함수 작성

        ![alt text](./img/useEffect%20when%20removed.png)

    - 정리해보면 

      1) DOM에 최초로 mount된 직후

          ![alt text](./img/useEffect%20when%20init.png)

      2) 지정한 denpendency의 값이 update 되었을 때

          의존성이 마지막 render때와 동일한 값을 가진다면 React는 useEffect 무시

          ![alt text](./img/useEffect%20when%20update.png)

      3) DOM에서 해당 DOM element가 제거되기 직전

          ![alt text](./img/useEffect%20when%20removed.png)

  - 개발 React에서 보면 분명 DOM에 처음 나타날 때에 호출하는 useEffect 하나만 작성했는데, 안에 작성한 console.log가 2번 실행되는 경우가 있다.

    이는 application의 최상단에 React.StrictMode를 사용하기 때문. 제거하면 정상적으로 1번만 호출됨

    **핵심** ✨ 개발에서 useEffect를 2번 호출하는 문제를 해결하는 방법은 주로 setup(1) -> cleanup(3) -> 다시 setup(1)하는 방식

    - network로 request를 송신하는 경우, JS의 abortController를 호출하거나 ignore flag 활용

      ![alt text](./img/ignore%20flag%20of%20useEffect.png)

    - 로그를 전송하는 경우, 수정하지 않기 (개발서버에서의 로그는 remount가 빈번히 작동되는 것과 같이 중복이 발생할 수 있기 때문)

        테스트를 원한다면 일시적으로 React.strictmode를 제거하거나 stg서버에 올려서 테스트 하기

    - 반드시 한번만 호출되어야 하는 경우, App 외부에 위치시키기 

        ![alt text](./img/out%20side%20of%20app%20useEffect.png)

    - useEffect에서 제품 구매 정보 upodate를 위한 api오 같은 네트워크 통신을 전송하는 경우는 코드가 잘못된 경우

        해당 코드는 사용자가 구매 버튼을 클릭했을 때만 작동해야 하기 때문에 위치 바꾸기

  - **핵심** ✨ useEffect는 다음 render를 진행할 때, 이전 render에서의 모든 effect를 삭제시킨다.

      즉, 다음 useEffect 호출때마다 이전 useEffect의 cleanup 함수 실행

      ![alt text](./img/useEffect%20cleanup%20cur%20render%20useEffect.png)

      위와 같은 코드에서 text가 변경되더라도 결국 timer에 의해 찍히는 text는 가장 마지막에 입력창에 위치했던 문자열

      예를 들어, a를 입력하고 그후 bc를 추가적으로 입력하면 마지막에 timer에 의해 찍히는 로그는 abc (a, ab에 대한 useEffect는 사라졌기 때문)

  - 각 effect는 effect 당시의 Component에 대한 snapshot을 가지고 있다.

      위의 예시에서 clearTimeout을 지우고 문자열 입력창에 abcde를 입력하면 타이머에의해 'a', 'ab', 'abc', 'abcd', 'abcde'가 차례대로 찍힌다.

  - useEffect에서 데이터를 fetch하는 것이 가지는 단점

    1. server에서는 useEffect를 사용할 수 없다.

        그렇기 때문에 HTML를 불러온 다음 화면에 필요한 데이터 및 js를 불러와야 하기에 비효율적

    2. useEffect에서 데이터를 불러오는 것은 굉장히 느린 사용자 경험 제공 가능

        Parent - Child Component가 있을 때, parent가 render될 때와 child가 render될 때 각각 데이터를 불러오는 것은 모든 Component가 render된 후 한번에 데이터를 불러오는 것보다 비효율적

    3. useEffect에서 데이터를 불러오는 것은 데이터를 미리 불러오지 못했거나 cache화시키기 못했다는 의미

    4. fetch api 사용 시 여러 handler들이 race condition을 해결하기 위한 boilerplate 코드가 있을 수 있다.

    이를 해결하기 위한 React 개발자들의 추천

      1. framework를 사용한다면, 내부에 개발되어 있는 fetching 매커니즘 활용

      2. 아니면, client-side에서 캐시를 활성화할 수 있는 기능 만들기

          활용하면 좋은 open source library: React Query, userSWR, React Router

  <br/>

  ### You Might Not Need an Effect

  - useEffect가 필요하지 않는 상황

    1. render 시 데이터를 변형해야 하는 경우
      
      render된 후 useEffect를 호출하여 데이터를 정재한 후 다시 render를 호출시키는 것은 비효율적

      state 및 props update 시 Component이 상단에서 데이터를 정재하는 것을 추천

    2. 사용자 이벤트를 처리해야 하는 경우

      useEffect에 event handler를 넣는다면 사용자가 어떤 행동을 했는지 알 수 없다.

    **핵심** ✨ 다시 한번 강조하지만, useEffect는 외부 시스템과의 동기화를 위해서 사용되어야 한다.

  
  - 불필요한 useEffect를 제거하는 방법

    1. props나 state를 가지고 state를 update하기

        기존에 존재하는 state나 props로 다른 state를 만들 수 있다면, 만들어질 수 있는 state는 삭제시키기

    2. 비용이 많이 드는 계산은 캐시화 시키기

        시간 & 자원이 많이 소요되는 계산은 useMemo를 사용해서 캐시화

        ![alt text](./img/cache%20cost%20expensive%20calcuation.png)

        위의 코드는 todos나 filter가 달라지지 않는다면 이전에 저장해두었던 결과를 반환

        ** 비용이 많이 드는 계산의 기준: 평균적인 계산 시간이 1ms 이상일 때

    3. props이 변경되었을 때 모든 state 초기화

        아래와 같이, ProfilePage로 navigate 된 후 다른 ProfilePage로 navigate되면 comment가 reset되지 않음

        ![alt text](./img/reset%20state%20when%20prop%20change1.png)

        이를 해결하기 위해, inner component를 만들고 key로 userId 변경하면 항상 Component가 unmount & mount 되기 때문에 정상 작동

        ![alt text](./img/reset%20state%20when%20prop%20change2.png)

    4. prop이 변경되었을 때 몇가지의 state 변경 방법

        List에 다른 prop이 전달된 경우 selected를 모두 null로 초기화하고 싶은 예제 코드

        useEffect를 사용한다면 1. 임시값으로 render 2. useEffect 호출로 re-render 프로세스로 실행됨으로 비효율적

        ![alt text](./img/adjust%20some%20state%20when%20prop%20change1.png)

        * **핵심** ✨ render 중에 state가 변경되면, React는 반환된 JSX를 버리고 다시 render 시작.

          React는 수많은 render를 방지하기 위해 render 중인 Component의 state만 변경하도록 함.

        따라서, 이전 props를 저장하고 있는 state를 하나 추가하고 비교를 통해 selected를 초기화할 것인지 결정

        아래의 코드가 효율적인 이유
        
        - props가 변경되어 setSelection이 호출되었을 때 List의 하위 Component를 render하기 전에 다시 List의 re-render가 실행되기 때문에 

        - 첫번째 코드는 임의의 값으로 List 및 하위 Component들이 초기화되기 때문에 비효율

        ![alt text](./img/reset%20state%20when%20prop%20change2.png)

    5. event handler간 로직 공유

      코드가 event handler / useEffect에 위치해야 하는지 모르겠다면, 그 코드가 왜 동작하는 지 물어보자

      - 사용자가 행동을 해서 동작하는 코드라면 event handler

      - **핵심** 사용자에게 보여졌기 때문에 동작하는 코드라면 useEffect

    6. effect chain을 발생시키기 않기 
    
      useEffect에서 다른 state를 update 시켜주어 연속적인 effect chain이 발생하면, 비효율적일 뿐만 아니라 유지보수에도 어려움이 생김(Ex. 중간에 새로운 process 추가)

      ![alt text](./img/effect%20chain1.png)

      따라서 effect를 제거하고 process ode를 Component단에 기재

      ![alt text](./img/effect%20chain2.png)

      그치만 update된 값에 따라 다른 값들을 보여주어야 하는 것과 같이 effect chain이 필요한 경우도 있다.

      Ex. 여러개의 dropdown이 있는데, 이전에 선택한 dropdown 값이 다른 dropdown의 값을 결정하는 경우

    7. 자식 Component에서 부모 Component에게 state 변경 알리기

      아래 코드의 문제점
      
      1. 자식 Component에서 isOn state가 update됨에 따라 render

      2. onChange가 호출되어 부모 state가 update & render

      3. 다시 자식 Component render => 비효율적

      ![alt text](./img/notify%20state%20change%20to%20parent1.png)

      아래 코드의 경우, 동일한 batch에서 state가 update되기 때문에 한번의 render만 호출

      ![alt text](./img/notify%20state%20change%20to%20parent2.png)

    8. 데이터의 흐름은 항상 Parent -> Child Component

    9. 데이터 불러오기

        아래의 코드는 각각의 query와 page마다 호출되는 request들에 대해서 race condition 문제 야기

        ![alt text](./img/data%20fetch1.png)

        이 문제를 해결하기 위해서는 useEffect에서 cleanup 함수를 명시

        ![alt text](./img/data%20fetch2.png)


        race condition은 response를 캐싱하는 방법, 데이터를 서버로부터 불러오는 방법, network waterfall을 방지하는 방법 등 많은 문제 야기

        따라서 framework를 사용중이라면, framework의 data fectching 매커니즘 활용

        framework을 사용하지 않는다면, custom hook을 작성

        ![alt text](./img/data%20fetch3.png)

  <br/>

  ### Lifecycle of Reactive Effects

  - useEffect를 작성할 때에는 Component 관점이 아닌 Effect 관점으로 작성

    Component 관점: effect의 동작 시점(mount, update, unmount)

    Effect 관점: 동기화의 시작과 종료 사이클

  - strict mode에서는 useEffect의 모든 시점을 한번씩 호출하면서 start sync ~ end sync까지 동작이 잘 작동하는지 확인

  - React가 useEffect 호출을 언제하는지 아는 방법

    render가 끝난 후, 의존성으로 전달한 배열의 값을 이전 render때와 현재 render 시점으로 비교해서 다르면 호출

  - 각각의 effect 하나의 동기화 과정을 나타내어야 한다.

    아래의 코드에서 첫번째 effect는 log를, 두번째 effect는 connection을 담당
  
    ![alt text](./img/effect%20represent%20separate%20sync1.png)

  - 변경되지 않는 변수에 대해서는 의존성에 명시할 필요가 없다.

    serverUrl과 같이 변경되지 않는 값에 대해서는 의존성을 명시하지 않아도 된다.

    ![alt text](./img/not%20need%20to%20%20include%20dependency.png)

    대신 props, state, component 안에 선언된 변수와 같은 경우에는 변경될 수 있음으로 의존성에 사용하면 유용

    - 전역 변수(Ex. Ref)와 같은 mutable한 변수는 의존성에 포함될 수 없다.

      이런 변수들은 React의 제어범위에 들어있지않기 때문에 값이 변경되더라도 re-render가 호출되지는 않는다. 

      또한 render 중에 값이 변경될 수 있기 때문에 effect를 pure하게 만들지 못함

  - ESlint가 useEffect에서 사용하는 reactive한 변수 중 dependency로 선언되지 않는 변수를 검사하고 있다면 오류 발생시킴

    Component안에 선언되었더라도 절대 변경되지 않는 값에 대해서는 오류를 발생시키지 않는다. 

    - 아래와 같이 reative하지 않은 변수에 대해서는 의존성 명시를 하지 않아도 오류 발생 X

      ![alt text](./img/include%20reactive%20value%20in%20dependency1.png)

      하지만 reactive한 변수를 useEffect 코드 안에 사용했을 경우, lint가 오류 발생

      ![alt text](./img/include%20reactive%20value%20in%20dependency2.png)

    ** lint가 추천한 오류 수정 로직을 적용할 경우 가끔 loop를 만든다. 그럴 경우 lint를 무시하지 말고 다른 해결 방법 모색

    ** useState로부터 반환된 setter와 같이 non-reactive한 변수들도 의존성에 포함될 수 있다.

  - 의존성으로 reactive 변수 포함시 주의할 점

    1. 각각의 effect가 독립된 process를 처리하고 있는지 확인

    2. function과 object를 의존성으로 포함 X

  <br/>

  ### Separating Events from Effects

  - Component의 props, state, 내부에 선언된 변수들은 reactive 값으로 지칭

    reactive란? 특정 값이 변경됨에 따라 특정 코드를 실행시킨다. 

    반대로 non-reactive란? 사용자의 특정 행동에 따라 특정 코드를 실행시킨다.

  - 종종 non-reactive에 대한 실행 코드와 reactive에 대한 실행 코드가 겹칠 때가 있다.

    상황: roomId가 변경될 때마다 연결이 변경되어야 하고 연결이 됐을 때 전달된 theme 색깔로 notification이 떠야한다.

    문제: 사용자가 theme 색깔을 변경하였을 때도 연결이 변경되고 notificaion이 뜬다.
    
    ![alt text](./img/react%20and%20non%20react%20code1.png)

    이런 경우의 해결책들 <b>(아직 안정적인 버전에는 배포되지 않음)</b>

    - effect event 선언하기

        아래와 같이, non-reactive에 대한 처리 로직을 useEffectEvent()로 wrap 해주기

        ![alt text](./img/effect%20event.png)

        useEffectEvent()로 감싸지 않아도 될 것 같지만 감싸지 않으면 해당 함수가 reactive 값이 되기 때문에(이유: reactive한 변수를 사용) 의존성에 포함해야 한다.

        effect event 코드들은 주로 onMessage, onTick, onVisit, or onConnected와 같은 이벤트 핸들링 코드에 적합
        <-> 
        onMount, onUpdate, onUnmount, or onAfterRender 등의 이벤트 핸들링에서는 reactive한 변수를 사용할 가능성이 높음으로 적절하지 않음
    
    - effect event 주의 사항
    
      1. effect 내부에서만 사용 가능

      2. 다른 Hook이나 Component에 전달 불가능

  ** linter를 주석으로 강제로 막으면 안되는 이유

  - React에서 앞으로 effect에서 depedency를 선언하지 않고 사용하더라도 오류를 띄우지 않을 예정이기 때문 -> 버그 야기

  <br/>

  ### Removing Effect Dependencies

  - Effect에서 불필요한 dependency를 줄이는 방법

    1. 사용자의 상호작용으로 인해 발생하는 코드들을 effect에서 제거하기 

        ![alt text](./img/remove%20effect%20with%20user%20interaction.png)

        위의 코드에서는 /api/register로 데이터를 전송하는 코드를 submit 버튼 클릭을 처리하는 이벤트 handler로 옮기기

    2. 하나의 effect에서 2개 이상의 sync 코드 돌리지 않기

        -> 각각의 effect는 독립적인 sync 코드로 구성하기

    3. effect에서 다음 state를 계산하기 위해 현재 state를 읽는 경우, updater function 사용하기  

        다음과 같은 코드가 있을 때, message가 전달될 때마다 connection이 재연결된다. (dependency에 message가 있기 때문) 

        ![alt text](./img/remove%20effect%20with%20updater%20func1.png)

        그 해결책으로 state setter에 updater function을 넣고 dependency에서 message를 제거

        ![alt text](./img/remove%20effect%20with%20updater%20func2.png)

    4. effect에서 reactive한 value를 사용하지만 해당 value의 값이 변경되어도 effect가 동작하지 않기를 원한다면, useEffectEvent 사용 (아직 안정 버전에는 X)

        useEffectEvent함수로 값이 변경되어도 effect가 동작하지 않길 바라는 변수들을 사용한 코드를 wrap 해줌으로써 활용

        ![alt text](./img/remove%20effect%20dpdc%20with%20effectEvent1.png)

        혹은 아래와 같이 props로 event handler가 전달된 경우 useEffectEvent로 감싸줌으로써 re-connect가 발생하지 않도록 방지

        ![alt text](./img/remove%20effect%20dpdc%20with%20effectEvent2.png)

        ![alt text](./img/remove%20effect%20dpdc%20with%20effectEvent3.png)

    5. dependency에 object / function 사용 지양하기

        Component 내부에, effect 외부에 생성되는 object / function은 항상 새로운 객체 / 함수를 의미하기 때문 항상 re-render 작동

        ![alt text](./img/avoid%20dependency%20with%20object%20and%20function%20type.png)

        해결책

        1) Component 외부에 object / function 선언하기 (외부에 위치하기 때문에 항상 고정적인 값을 갖음)

        2) effect 내부에 object / function 선언

        3) props로 object가 전달된 경우, 객체를 해제하고 사용하기

  <br/>

  ### Reusing Logic with Custom Hooks

  - React 개발자는 custom hook을 개발함으로써 중복된 코드를 제거할 수 있고, hook의 기능을 how가 아닌 what에 초점을 둘 수 있다는 장점 소유

  - 특징

      1. hook의 이름은 use로 시작 (관습)

          만약 linter가 React에 맞게 설정되어 있는 경우, use로 시작하지 않으면 hook에서 useState, useEffect를 사용할 수 없도록 한다.

      2. 동일한 hook을 여러번 호출해도 그 안의 값들(state 등)은 서로 독립적이다 -> 로직만 공유하고 state 등은 공유 X

      3. Component가 re-render될 때, hook도 가장 최신의 parameter를 받아 동작한다.

  - custom hook을 작성해야 할 적절한 상황
    
      - Component가 외부 시스템과 연동하거나 built-in API로는 해결하지 못하는 상황

      - 각 custom hook이 명확한 목적성을 가지고 사용되어야 함

      - 반대로 아래의 코드 같이 useEffect의 대안책으로는 사용하지 않기

        ![alt text](./img/avoid%20custom%20hook%20case1.png)

  - custom hook의 장점

      1. [**핵심**] Component를 작성할 때 구현 방식(how)이 아닌 어떤 의도(what)로 로직이 구성됐는지 집중할 수 있게 해준다.

      2. effect에서의 데이터를 흐름을 명시적으로 표시

      3. react에 새로운 기술이 생겼을 때, component를 수정하지 않고 적용 가능

  - custom hook 제작 시 react 개발자가 자체적으로 외부 시스템을 만들어서 custom hook을 효과적으로 사용할 수 있게 만들 수 있다.

    아래의 코드에서 FadeInAnimation을 외부 시스템인 것처럼 만들면서 custom hook 작성의 타당성 부여

    ![alt text](./img/good%20custom%20hook1.png)

    ![alt text](./img/good%20custom%20hook2.png)
  <br/>
</details>