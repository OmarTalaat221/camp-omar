import React, { Fragment,useEffect} from 'react';
import {useDispatch } from 'react-redux'
import {GET_ALL_EMAILS} from '../../../redux/actionType'
import Email from './email'

const EmailDefault = (props) =>  {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({ type: GET_ALL_EMAILS});
    },[dispatch]);

    return (
        <Fragment>
            <Email/>
        </Fragment>
    );
}

export default EmailDefault;