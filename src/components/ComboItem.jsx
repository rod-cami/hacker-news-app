import React,{useState} from 'react';
import './styles/Combo.css'

const ComboItem = ({ image, text, index, clickEvent, selected}) => {
  const [isSelected, setSelected] = useState(selected);
  

  const onClick = () => {
    setSelected(!selected);
    clickEvent(index);
  };

  return (
    <div id={(selected ? 'selected-item' : '')} className="item" onClick={onClick}>
      <div className="item-left">
        <img src={image} alt="" />
      </div>
      <div className="item-right">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ComboItem;