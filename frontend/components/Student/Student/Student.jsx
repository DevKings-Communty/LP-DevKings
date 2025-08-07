import './Student.css'

const Student = ({ benefit }) => {
    // console.log(benefit)
    return (
        <div className='student-card'>
            <div className="student-cover">
                <h3 className='student-card-title'>{benefit.title}</h3>
                <p className='student-card-text'>{benefit.description}</p>
            </div>
        </div>
    )
}

export default Student