import React, {FC, useEffect, useState} from "react";
import {InputNumber} from "../InputNumber/InputNumber";
import {Button} from "../Button/Button";
import styles from './Settings.module.css'

type SettingsPropsType = {
    start: number
    end: number
    changeStart: (value: number) => void
    changeEnd: (value: number) => void
    set: () => void
    setWaitSettings: (mode: boolean) => void
    setError: (error: string | null) => void
    error: string | null
    constructError: (start: number, end: number) => void
}

export const Settings: FC<SettingsPropsType> = ({
                                                    start,
                                                    end,
                                                    set,
                                                    changeStart,
                                                    changeEnd,
                                                    setWaitSettings,
                                                    setError,
                                                    error,
                                                    constructError,
                                                }) => {

    const [disableSetButton, setDisableSetButton] = useState(true)

    const onChangeStart = (value: string) => {
        // changeStart(JSON.parse(value))
        changeStart(+value)
        constructError(JSON.parse(value), end)
        if (JSON.parse(value) >= 0 && JSON.parse(value) < end) {
            setWaitSettings(true)
            setDisableSetButton(false)
        }


    }

    const onChangeEnd = (value: string) => {
        changeEnd(JSON.parse(value))
        constructError(start, JSON.parse(value))
        if (JSON.parse(value) > start) {
            setWaitSettings(true)
            setDisableSetButton(false)
        }

    }

    const setHandler = () => {
        set()
        setWaitSettings(false)
        setDisableSetButton(true)
    }


    return (
        <div className={styles.settings}>
            <div className={styles.inputsBlock}>
                <div className={styles.inputsTitles}>
                    <span>start value:</span>
                    <span>max value:</span>
                </div>
                <div className={styles.inputs}>
                    <InputNumber value={start} onChange={onChangeStart} error={error?.includes("wrong start")}/>
                    <InputNumber value={end} onChange={onChangeEnd} error={error?.includes("wrong max")}/>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button title={"set"} disabled={error !== null || disableSetButton} onClick={setHandler}/>
            </div>

        </div>
    )
}