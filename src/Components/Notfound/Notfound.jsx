import React from 'react'
import Styles from './Notfound.module.css'
import NotfoundImg from '../../imgs/error.svg'

export default function Notfound() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center py-5">
                <img src={NotfoundImg} alt="" className=''/>
            </div>
        </>
    )
}
