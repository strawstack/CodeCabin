import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ResizableBox } from 'react-resizable';
import Editor from '@monaco-editor/react';
import styles from './styles/style.module.css';
import './styles/style.css';
import './styles/resizable-styles.css';
import { QueueTemplate, QueueTest } from './code/queue.js';

function syncLocalStorageWithState(key, initialState) {
  const [code, setCode] = React.useState(
    () => window.localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    window.localStorage.setItem(key, code);
  }, [code]);
  return [code, setCode];
}

function Container(props) {
  return <div className={styles.Container}>{props.children}</div>;
}

const queueDescription =
  'A queue is a first in first out datastructure. Like a line up of people.';
const queuePage = (
  <Code
    name="queue"
    description={queueDescription}
    imageLink="https://via.placeholder.com/500"
    videoLink="#"
    initialCode={QueueTemplate}
    test={QueueTest}
  />
);

let algorithmList = [
  { name: 'about this site', to: 'about', component: <About /> },
  { name: 'queue', to: 'queue', component: queuePage },
  { name: 'binary search', to: 'binary_search', component: <Code /> },
  { name: 'heap', to: 'heap', component: <Code /> },
  { name: 'prims', to: 'prims', component: <Code /> },
];

function Main() {
  const [focusIndex, setfocusIndex] = useState(0);

  useEffect(() => {
    window.addEventListener('keyup', keyUpEvent);
    return () => {
      window.removeEventListener('keyup', keyUpEvent);
    };
  });

  let algorithmLinks = algorithmList.map((d, uid) => {
    d.ref = useRef(null);
    return (
      <Link
        className={getClassIfFocused(focusIndex, uid)}
        to={`/${d.to}`}
        key={uid}
        ref={d.ref}
      >
        {uid} {d.name}
      </Link>
    );
  });

  function getClassIfFocused(focusIndex, uid) {
    return focusIndex === uid ? styles.Focus : '';
  }

  function keyUpEvent(e) {
    let key = e.key;
    if (key === 'ArrowUp') {
      let newFocusIndex = focusIndex - 1;
      if (newFocusIndex == -1) {
        newFocusIndex = algorithmList.length - 1;
      }
      setfocusIndex(newFocusIndex);
    } else if (key === 'ArrowDown') {
      let newFocusIndex = focusIndex + 1;
      if (newFocusIndex == algorithmList.length) {
        newFocusIndex = 0;
      }
      setfocusIndex(newFocusIndex);
    } else if (key === 'Enter') {
      algorithmList[focusIndex].ref.current.click();
    } else if (key === 'Escape') {
    }
  }

  return (
    <Container>
      <div className={styles.Main}>
        <h1>CodeCabin</h1>
        {algorithmLinks}
      </div>
    </Container>
  );
}

function About() {
  return (
    <Container>
      <div className={styles.About}>
        <h1>About</h1>
        <p>explain the intent of this site.</p>
      </div>
    </Container>
  );
}

function Code({ name, description, imageLink, videoLink, initialCode, test }) {
  const pageContainer = useRef(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(400);
  const [code, setCode] = syncLocalStorageWithState(name, initialCode);
  const [showLearn, setShowLearn] = useState(true);
  let shiftDown = false;

  function getHeight() {
    return pageContainer.current.offsetHeight;
  }

  function resizeEvent(e) {
    setHeight(getHeight());
  }

  function widthResizeEvent(e, data) {
    setWidth(data.size.width);
  }

  function onChangeEvent(value, event) {
    setCode(value);
  }

  function keyDownEvent(e) {
    let key = e.key;
    // Track if shift is pressed
    if (key === 'Shift') {
      shiftDown = true;
    }
  }

  function keyUpEvent(e) {
    let key = e.key;

    // Run code on shift + enter
    if (shiftDown && key === 'Enter') {
      testCode();

      // Track if shift is pressed
    } else if (key === 'Shift') {
      shiftDown = false;
    }
  }

  function testBtnPress() {
    testCode();
  }

  function resetBtnPress() {
    let response = confirm("Reset code? This can't be undone.");
    if (response) {
      setCode(initialCode);
    }
  }

  function keyPressEvent(e) {
    let key = e.key;
    // Prevent new line when code is run
    if (shiftDown && key === 'Enter') {
      e.preventDefault();
    }
  }

  function testCode() {
    console.log(test(code));
  }

  useEffect(() => {
    setHeight(getHeight());
    setWidth(width);
    setCode(code);
    window.addEventListener('keydown', keyDownEvent);
    window.addEventListener('keyup', keyUpEvent);
    window.addEventListener('keypress', keyPressEvent);
    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('keydown', keyDownEvent);
      window.removeEventListener('keyup', keyUpEvent);
      window.removeEventListener('keypress', keyPressEvent);
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return (
    <div className={styles.Code} ref={pageContainer}>
      <ResizableBox
        className="custom-box box"
        onResize={widthResizeEvent}
        width={400}
        height={height}
        axis={'x'}
        handle={<span className="custom-handle custom-handle-e" />}
        minConstraints={[200, height]}
        maxConstraints={[800, height]}
        handleSize={[8, 100]}
      >
        <div className={styles.CodeLeft}>
          <h1>{name}</h1>
          <div className={styles.TabsBar}>
            <div className={styles.Btn}>learn</div>
            <div className={styles.Btn}>test</div>
          </div>
          <div className={styles.Seperator}></div>
          <div className={styles.TabContent}>
            <p>{description}</p>
            <img
              className={styles.FlexImage}
              src={imageLink}
              alt="placeholder"
            />
          </div>
        </div>
      </ResizableBox>
      <div className={styles.CodeRight} style={{ left: `${width}px` }}>
        <div className={styles.BtnBar}>
          <div className={styles.Btn} onClick={resetBtnPress}>
            reset
          </div>
          <div className={styles.Btn} onClick={testBtnPress}>
            test
          </div>
        </div>
        <Editor
          height="100%"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={onChangeEvent}
          options={{ fontSize: 16 }}
        />
      </div>
    </div>
  );
}

let routes = algorithmList.map((d, i) => {
  return <Route path={`/${d.to}`} element={d.component} key={i} />;
});

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      {routes}
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
