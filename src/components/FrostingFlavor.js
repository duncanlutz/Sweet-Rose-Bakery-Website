import React from 'react';
import $ from 'jquery';
import '../css/FlavorSelection.css';

function FlavorSelection(props) {

  const selectFlavor = (e) => {
    e.preventDefault();
    const t = e.target;
    if (t.classList.contains('frosting-option')) {
      if (t.classList.contains('frost-sel')) {
        t.classList.toggle('frost-sel');
        props.setState('');
      } else {
        $('.frost-sel').toggleClass('frost-sel');
        t.classList.toggle('frost-sel');
        props.setState(t.classList[0]);
      }
    } else if (t.parentElement.classList.contains('frosting-option')) {
      if (t.parentElement.classList.contains('frost-sel')) {
        t.parentElement.classList.toggle('frost-sel');
        props.setState('');
      } else {
        $('.frost-sel').toggleClass('frost-sel');
        t.parentElement.classList.toggle('frost-sel');
        props.setState(t.parentElement.classList[0]);
      }
    } else if (
      t.parentElement.parentElement.classList.contains('frosting-option')
    ) {
      if (t.parentElement.parentElement.classList.contains('frost-sel')) {
        t.parentElement.parentElement.classList.toggle('frost-sel');
        props.setState('');
      } else {
        $('.frost-sel').toggleClass('frost-sel');
        t.parentElement.parentElement.classList.toggle('frost-sel');
        props.setState(t.parentElement.parentElement.classList[0]);
      }
    }
  };

  return (
    <div className={props.flavor.toLowerCase().replace(/\s/, '-') + ' frosting-option' } onClick={selectFlavor}>
        <img src={props.imageUrl} className='flavor-image' />
      <div className='flavor-name'>{props.flavor}</div>
    </div>
  );
}

export default FlavorSelection;
