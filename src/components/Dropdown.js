import React, { useEffect, useState, useRef } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  //addEventListener are called first. after that react event listener are called . first child and then it parents are called

  useEffect(() => {
    // console.log("use effect");

    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  // console.log(open);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          // console.log("item clicked");

          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });

  // console.log(ref.current);
  // console.log("ref");

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className=" label">{label}</label>
        <div
          onClick={() => {
            // console.log("dropdown clicked");
            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
