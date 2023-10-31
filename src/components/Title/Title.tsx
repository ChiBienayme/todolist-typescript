import React from 'react'
import styles from './title.module.scss'

type TitleProps = {
    address: {
        street: string
    }
}

function Title(props: TitleProps) {
    console.log(props.address)

    return (
        <div>
            <h1 className={styles.title}> To do list typescript</h1>
        </div>
    )
}

function equal(prevProp: TitleProps, nextProp: TitleProps) {
    return prevProp.address.street === nextProp.address.street
}

export default React.memo(Title, equal)
