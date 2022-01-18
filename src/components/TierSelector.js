import React from 'react';
import $ from 'jquery';
import '../css/TierSelector.css';

function TierSelector(props) {

  const selectFlavor = (e) => {
    e.preventDefault();
    const t = e.target;
    if (t.classList.contains('tier-option')) {
      if (t.classList.contains('tier-sel')) {
        t.classList.toggle('tier-sel');
        props.setState('');
      } else {
        $('.tier-sel').toggleClass('tier-sel');
        t.classList.toggle('tier-sel');
        props.setState(t.classList[0]);
      }
    } else if (t.parentElement.classList.contains('tier-option')) {
      if (t.parentElement.classList.contains('tier-sel')) {
        t.parentElement.classList.toggle('tier-sel');
        props.setState('');
      } else {
        $('.tier-sel').toggleClass('tier-sel');
        t.parentElement.classList.toggle('tier-sel');
        props.setState(t.parentElement.classList[0]);
      }
    } else if (
      t.parentElement.parentElement.classList.contains('tier-option')
    ) {
      if (t.parentElement.parentElement.classList.contains('tier-sel')) {
        t.parentElement.parentElement.classList.toggle('tier-sel');
        props.setState('');
      } else {
        $('.tier-sel').toggleClass('tier-sel');
        t.parentElement.parentElement.classList.toggle('tier-sel');
        props.setState(t.parentElement.parentElement.classList[0]);
      }
    }
  };

  return (
    <div className={props.flavor.toLowerCase().replace(/\s/, '-') + ' tier-option' } onClick={selectFlavor}>
      <div className='flavor-name'>{props.flavor}</div>
    </div>
  );
}

export default TierSelector;
