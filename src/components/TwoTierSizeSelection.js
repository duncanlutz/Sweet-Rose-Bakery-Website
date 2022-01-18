import React from 'react';
import $ from 'jquery';
import '../css/SizeSelection.css';

function SizeSelection(props) {

    const handleSizeSelect = (e) => {
        e.preventDefault();
        const t = e.target;
        if (t.classList.contains('size-option')) {
          if (t.classList.contains('num-sel')) {
            t.classList.toggle('num-sel');
            props.setState('');
          } else {
            $('.num-sel').toggleClass('num-sel');
            t.classList.toggle('num-sel');
            props.setState(t.classList[1]);
          }
        } else if (t.parentElement.classList.contains('size-option')) {
          if (t.parentElement.classList.contains('num-sel')) {
            t.parentElement.classList.toggle('num-sel');
            props.setState('');
          } else {
            $('.num-sel').toggleClass('num-sel');
            t.parentElement.classList.toggle('num-sel');
            props.setState(t.parentElement.classList[1]);
          }
        } else if (
          t.parentElement.parentElement.classList.contains('size-option')
        ) {
          if (t.parentElement.parentElement.classList.contains('num-sel')) {
            t.parentElement.parentElement.classList.toggle('num-sel');
            props.setState('');
          } else {
            $('.num-sel').toggleClass('num-sel');
            t.parentElement.parentElement.classList.toggle('num-sel');
            props.setState(t.parentElement.parentElement.classList[1]);
          }
        }
    }

    return (
        <div className={`size-option ${props.sizeone}_${props.sizetwo}-inch`} onClick={handleSizeSelect}>
            <div className="size-name">{`${props.sizeone} & ${props.sizetwo} inch`}</div>
        </div>
    );
}

export default SizeSelection;