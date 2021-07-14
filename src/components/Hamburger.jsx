import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

// images
import dallas from '../images/dallas.webp'
import austin from '../images/austin.webp'
import newyork from '../images/newyork.webp'
import beijing from '../images/beijing.webp'
import sanfrancisco from '../images/sanfrancisco.webp'

// city-image data
const cities = [
    { name: 'Dallas', image: dallas },
    { name: 'Austin', image: austin },
    { name: 'New York', image: newyork },
    { name: 'Sanfrancisco', image: sanfrancisco },
    { name: 'Beijing', image: beijing },
]

const Hamburger = ({ state }) => {

    // # References
    let menu = useRef(null)
    let revealMenu = useRef(null)
    let revealMenuBackground = useRef(null)
    let cityBackground = useRef(null)
    let line1 = useRef(null)
    let line2 = useRef(null)
    let line3 = useRef(null)
    let info = useRef(null)


    useEffect(() => {

        //If clicked, open menu : close menu
        if (!state.clicked) {

            gsap.to([revealMenu, revealMenuBackground], {
                duration: 0.8,
                height: 0,
                ease: "power3.inOut",
                stagger: {
                    amount: 0.07
                }
            })

            gsap.to(menu, {
                duration: 1,
                css: { display: 'none' }
            })

        } else {
            gsap.to(menu, {
                duration: 0,
                css: { display: 'block' }
            })
            gsap.to([revealMenu, revealMenuBackground], {
                duration: 0,
                opacity: 1,
                height: '100%'
            })
            staggerReveal(revealMenuBackground, revealMenu)
            fadeInUp(info)
            staggerText(line1, line2, line3)
        }

    }, [state])

    // # Menu and BG
    const staggerReveal = (node1, node2) => {
        gsap.from([node1, node2], {
            duration: 0.8,
            height: 0,
            transformOrigin: 'right top',
            skewY: 2,
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        })
    }

    // # Menu text
    const staggerText = (node1, node2, node3) => {
        gsap.from([node1, node2, node3], {
            duration: 0.8,
            y: 100,
            delay: 0.1,
            ease: 'power3.inOut',
            stagger: {
                amount: 0.3
            }
        })
    }

    // # Content text
    const fadeInUp = (node) => {
        gsap.from(node, {
            y: 60,
            duration: 1,
            delay: 0.2,
            opacity: 0,
            ease: 'power3.inOut'
        })
    }

    // # Handle cities
    const handleCity = (city) => {
        gsap.to(cityBackground, {
            duration: 0,
            background: `url(${city}) center center`
        })
        gsap.to(cityBackground, {
            duration: .4,
            opacity: 1,
            ease: "power3.inOut"
        })
        gsap.from(cityBackground, {
            duration: .4,
            skewY: 2,
            transformOrigin: 'right top'
        })
    }

    const handleCityReturn = () => {
        gsap.to(cityBackground, {
            duration: 0.4,
            opacity: 0
        })
    }

    // # Menu text hover
    const handleHover = (e) => {
        gsap.to(e.target, {
            duration: 0.3,
            y: 3,
            skewX: 4,
            ease: "power3.inOut"
        })
    }

    const handleHoverExit = (e) => {
        gsap.to(e.target, {
            duration: 0.3,
            y: -3,
            skewX: 0,
            ease: "power3.inOut"
        })
    }

    return (
        <div ref={el => (menu = el)} className="hamburger-menu">
            <div ref={el => (revealMenuBackground = el)} className="menu-secondary-background-color"></div>
            <div ref={el => (revealMenu = el)} className="menu-layer">
                <div ref={el => (cityBackground = el)} className="menu-city-background">

                </div>
                <div className="container">
                    <div className="wrapper">
                        <div className="menu-links">
                            <nav>
                                <ul>
                                    <li>
                                        <Link
                                            onMouseEnter={e => handleHover(e)}
                                            onMouseOut={(e) => handleHoverExit(e)}
                                            ref={el => (line1 = el)}
                                            to="/opportunities"
                                        >Opportunities
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onMouseEnter={e => handleHover(e)}
                                            onMouseOut={(e) => handleHoverExit(e)}
                                            ref={el => (line2 = el)}
                                            to="/solutions"
                                        >Solutions
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onMouseEnter={e => handleHover(e)}
                                            onMouseOut={(e) => handleHoverExit(e)}
                                            ref={el => (line3 = el)}
                                            to="/contact-us"
                                        >Contact-us
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            <div ref={el => (info = el)} className="info">
                                <h3>Our promise</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum id natus provident ab cumque aliquam voluptatem fugit veniam rem aliquid.</p>
                            </div>
                            <div className="locations">
                                Locations:
                                {
                                    cities.map((item, index) => (
                                        <span
                                            key={index}
                                            onMouseEnter={() => handleCity(item.image)}
                                            onMouseOut={handleCityReturn}
                                        >
                                            {item.name}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hamburger
