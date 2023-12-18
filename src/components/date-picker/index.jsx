import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import styles from './date-picker.module.scss'

export const RSPDatePicker=({callback, showPicker=false, ...restProps})=>{
    const onDateChange=(evnt)=>{
        let fromDate={};
        let toDate={};
        if(evnt){
            fromDate={
            yr:evnt[0].$y,
            m:evnt[0].$M+1,
            d:evnt[0].$D,
        };
        toDate={
            yr:evnt[1].$y,
            m:evnt[1].$M+1,
            d:evnt[1].$D,  
        }
    }
        callback({fromDate,toDate});
    }
    if(showPicker){
        return <AntdDatePicker.RangePicker onChange={onDateChange} className={styles.container} {...restProps}/>
    }
    return(
        <AntdDatePicker onChange={onDateChange} className={styles.container}/>
    )
}

