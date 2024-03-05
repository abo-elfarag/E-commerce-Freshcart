import React from 'react'
import Styles from './LoaderPage.module.css'
import { FallingLines } from 'react-loader-spinner'

export default function LoaderPage() {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <FallingLines
                    color="#4fa94d"
                    width="100"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                />
            </div>
        </>
    )
}
