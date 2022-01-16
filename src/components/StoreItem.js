import React from 'react';
import '../css/StoreItem.css';

function StoreItem(props) {
  return (
    <div className={'store-item id' + props.id}>
      <div className='img-cont'>
        <img className={'image id' + props.id} src={props.imageUrl} style={{objectFit: 'cover'}}/>
      </div>
      <div className='item-name'>{props.itemName}</div>
    </div>
  );
}

export default StoreItem;
