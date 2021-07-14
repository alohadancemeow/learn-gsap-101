import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Hamburger from './Hamburger'

const Header = ({ history }) => {

    // # States
    const [state, setState] = useState({
        initial: false,
        clicked: null,
        menuName: 'Menu'
    })
    console.log(state);

    const [disabled, setDisabled] = useState(false)


    // # Menu
    const handleMenu = () => {

        if (state.initial === false) return setState({
            initial: null,
            clicked: true,
            menuName: 'Close'
        })

        state.clicked
            ? setState({
                ...state,
                clicked: !state.clicked,
                menuName: 'Menu'
            })
            : setState({
                ...state,
                clicked: !state.clicked,
                menuName: 'Close'
            })
    }

    // # Determine if our menu button should be disabled.
    // const disableMenu = () => {
    //     setDisabled(!disabled)
    //     setTimeout(() => {
    //         setDisabled(false)
    //     }, 1200)
    // }


    // # Effect for page changes
    useEffect(() => {
        history.listen(() => {
            setState({
                ...state,
                clicked: false,
                menuName: 'Menu'
            })
        })
    }, [])

    return (
        <header>
            <div className="container">
                <div className="wrapper">
                    <div className="inner-header">
                        <div className="logo">
                            <Link to="/">HAMBRG.</Link>
                        </div>
                        <div className="menu">
                            <button disabled={disabled} onClick={handleMenu}>
                                {state.menuName}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Hamburger state={state} />
        </header>
    )
}

export default withRouter(Header)
