import React, {FC, useState} from "react";
import {Button} from "../Button/Button";
import styles from './Counter.module.css'

type CounterPropsType = {
    start: number
    end: number
    count: number
    waitSettings: boolean
    inc: () => void
    reset: () => void
    error: string | null
}

export const Counter: FC<CounterPropsType> = ({
                                                  start,
                                                  end,
                                                  count,
                                                  inc,
                                                  reset,
                                                  waitSettings,
                                                  error
                                              }) => {

    const displayValue = waitSettings ? "enter values and press set"
        : count
    return (
        <div className={styles.counter}>
            <div className={styles.display}>
                <div className={styles.displayTitle}>{error || displayValue}</div>
            </div>
            <div className={styles.buttons}>
                <Button title={"inc"} disabled={count === end || waitSettings || error !== null} onClick={inc}/>
                <Button title={"reset"} disabled={count === start || waitSettings || error !== null} onClick={reset}/>
            </div>
        </div>
    )
}