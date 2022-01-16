import React from 'react';
import $ from 'jquery';
import '../css/FlavorSelection.css';

function FlavorSelection(props) {

  const selectFlavor = (e) => {
    e.preventDefault();
    const t = e.target;
    if (t.classList.contains('flavor-select')) {
      if (t.classList.contains('selected')) {
        t.classList.toggle('selected');
        props.setState('');
      } else {
        $('.selected').toggleClass('selected');
        t.classList.toggle('selected');
        props.setState(t.classList[0]);
      }
    } else if (t.parentElement.classList.contains('flavor-select')) {
      if (t.parentElement.classList.contains('selected')) {
        t.parentElement.classList.toggle('selected');
        props.setState('');
      } else {
        $('.selected').toggleClass('selected');
        t.parentElement.classList.toggle('selected');
        props.setState(t.parentElement.classList[0]);
      }
    } else if (
      t.parentElement.parentElement.classList.contains('flavor-select')
    ) {
      if (t.parentElement.parentElement.classList.contains('selected')) {
        t.parentElement.parentElement.classList.toggle('selected');
        props.setState('');
      } else {
        $('.selected').toggleClass('selected');
        t.parentElement.parentElement.classList.toggle('selected');
        props.setState(t.parentElement.parentElement.classList[0]);
      }
    }
  };

  return (
    <div className={props.flavor.toLowerCase().replace(/\s/, '-') + ' flavor-select' } onClick={selectFlavor}>
        <img src={props.imageUrl} className='flavor-image' />
      <div className='flavor-name'>{props.flavor}</div>
    </div>
  );
}

export default FlavorSelection;
