import React from 'react';

const HelloDiv = ({name, height, ...props}) => {
    console.log(props);
    return (<div>
        <span>Hello, {name}! </span>
        {height && <span>My Height is {height}.</span>}
        {props.a && props.a}
    </div>
    )
};
export default HelloDiv;