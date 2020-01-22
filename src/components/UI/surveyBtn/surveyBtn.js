import React from 'react';
import classes from "./surveyBtn.module.css"
const surveyBtn = (props) => {
    return (
        <button className={[classes.SurveyBtn, classes[props.btnType]].join(' ')}>{props.children}</button>
    )
}

export default surveyBtn;