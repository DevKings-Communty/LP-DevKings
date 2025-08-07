import React from 'react'
import aboutImg from '/about-img.svg'
import './About.css'

const About = () => {
  return (
    <div className='about'>
      <div className='about-svg'>
        <svg className='about-shape' viewBox="0 0 1440 117" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M751 103.5L783 79.4999L795 71.9999L803 67.9999L809 66L814 64.4999L1440 0H0L619 63.5L627 65L633.5 67L642.5 71L650 75.5L656.5 80L687.5 103C702.128 112.883 708.977 116.471 720 116C732.162 114.885 738.909 112.104 751 103.5Z" fill="#F0F8FF" />
        </svg>
        <svg className='arrow-down' width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="70" height="70" rx="35" fill="#0C0C0C" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M35.0001 8.75C36.611 8.75 37.9167 10.0559 37.9167 11.6667V51.2919L53.3544 35.8543C54.4933 34.7153 56.3402 34.7153 57.4791 35.8543C58.6181 36.9933 58.6181 38.8401 57.4791 39.979L37.0625 60.3957C35.9235 61.5347 34.0767 61.5347 32.9377 60.3957L12.521 39.979C11.382 38.8401 11.382 36.9933 12.521 35.8543C13.6601 34.7153 15.5068 34.7153 16.6458 35.8543L32.0834 51.2919V11.6667C32.0834 10.0559 33.3892 8.75 35.0001 8.75Z" fill="#F0F8FF" />
        </svg>
      </div>
      <div className="about-us">
        <div className='about-text'>
          <h1>About Us:</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          <div className='about-btn'>
            <a href="" className='about-video'>Show Video</a>
            <a href="/courses" className='about-visite'>visite courses</a>
          </div>
        </div>
        <div className='about-img'>
          <img src={aboutImg} alt="" />
        </div>
      </div>
    </div>
  )
}

export default About