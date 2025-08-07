import React from 'react'
import imgContact from '/contact-img.svg'
import './Contact.css'

const Contact = () => {
    return (
        <div className='section-contacts'>
            <h1>Contact:</h1>
            <div className='contact-content'>
                <div className="contact-group">
                    <form>
                        <div className="contact-info">
                            <input className='contact-input' type="text" placeholder='Full Name' />
                            <input className='contact-input' type="text" placeholder='Email' />
                            <input className='contact-input' type="text" placeholder='Number' />
                            <textarea className='contact-textarea' name="" placeholder='Descrpitions' id=""></textarea>
                        </div>
                        <button>Send</button>
                    </form>
                    <div className='contact-img'><img src={imgContact} alt="" /></div>
                </div>
            </div>
        </div>
    )
}

export default Contact