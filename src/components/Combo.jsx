import React, { useState } from 'react';
import './styles/Combo.css'
import ComboItem from './ComboItem';
import images from '../img/images';
import { useNavigate } from 'react-router-dom';


const Combo = ({ text = "", itemSelectedEvent = null, startIndex =-1}) => {

    const [isOpen, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(startIndex);

    const cboImages = [images.angular, images.react, images.vuejs];
    const cboTexts = ["Angular", "React", "VueJS"];

    const itemClick = (index) => {
        if (!isOpen) {
            return
        }
        setSelectedIndex(index);
        if (itemSelectedEvent != null) {
            itemSelectedEvent(index);
        }

    }

    const onClick = () => {
        setOpen(!isOpen);
    }

    const focusLost = () => {
        setOpen(false);
    }

    const navigate = useNavigate();

    const handleSelect = (e) => {
        const query = e.target.value;
        if (query === "select") {
            return;
        }
        navigate(`/?query=${query}`);
    }

    const getHeader = () => {
        const i = selectedIndex;
        return <div className="header-container" onClick={onClick}>
            {getHeaderImage(i)}
            <div id='header-text' className={i>=0? 'header-text-with-img' : 'header-text-no-img'}>
                
                <p>{selectedIndex >= 0 ? cboTexts[selectedIndex] : text}</p>
            </div>
            <div className={'header-right '+(isOpen?'header-opened':'header-closed')}>
                <p>v</p>
            </div>

        </div>
    }

    const getHeaderImage = (i) => {
        if (i >= 0) {
            return <div className='header-left'><img src={cboImages[i]} /></div>
        }
    }

    const getItems = () => {
        const items = [];
        for (var i = 0; i < cboTexts.length; i++) {
            items.push(
                <ComboItem
                    key={i}
                    image={cboImages[i]}
                    text={cboTexts[i]}
                    index={i}
                    selected={selectedIndex == i}
                    clickEvent={itemClick}
                />
            );
        }
        return items;
    }

    return (

        <div className='container' onChange={handleSelect} onBlur={focusLost}>
            {getHeader()}
            <div className='popup' id={isOpen ? 'visible' : 'hidden'}>
                {getItems()}
            </div>

        </div>

    )
}

export default Combo;