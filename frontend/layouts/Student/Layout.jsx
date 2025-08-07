import React from 'react'
import Header from '../../components/Student/Header/Header'
import Footer from '../../components/Student/Footer/Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout