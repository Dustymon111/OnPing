import React, { Fragment } from 'react'
import Header from '../components/Header'

export default function Layout ({children,title}){
    return(
        <Fragment>
            <Header title={title}/>
            <div>
                {children}
            </div>
        </Fragment>
    )

}