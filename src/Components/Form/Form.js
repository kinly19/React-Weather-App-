import { FiSearch } from 'react-icons/fi';
// import { IconContext } from 'react-icons/lib';
import './Form.scss'

const Form = ({ handleSubmit, error, inputValue, setInputValue, }) => {
    return (
        <div className="form">
            <form className="form__content" onSubmit={handleSubmit}>
                <input
                    className="form__input"
                    type="sumbit"
                    placeholder={error ? 'Location Unknown...' : 'Enter City/Zip/Postal Code'}
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="form__btn">
                    <span className="form__icon">
                        {/* <IconContext.Provider value={{ color: 'blue' }}> */} {/* if we wanted to style all icons the same we can use reacts IconContext.provider to do so */}
                        <FiSearch className='form__icon' />
                        {/* </IconContext.Provider> */}
                    </span>
                </button>
            </form>

            {error && ( //only show if there are any errors
                <div className="form__errorContent">
                    <p className="form__errorText">{error}</p>
                </div>
            )}

        </div>
    )
}

export default Form;