import React from 'react'

function MyComponent() {
    const [dimensions, setDimensions] = React.useState({
      height: window.innerHeight,
      width: window.innerWidth
    });
    React.useEffect(() => {
      const debouncedHandleResize = debounce(function handleResize() {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
        });
      }, 1000);
  
      window.addEventListener("resize", debouncedHandleResize);
  
      return _ => {
        window.removeEventListener("resize", debouncedHandleResize);
      };
    });
    return (
      <div>
        Rendered at {dimensions.width} x {dimensions.height}
      </div>
    );
  }
  
  function debounce(fn, ms) {
    let timer;
    return _ => {
      clearTimeout(timer);
      timer = setTimeout(_ => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }