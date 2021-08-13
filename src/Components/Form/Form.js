import './Form.scss'

const Form = ({ handleSubmit, error, inputValue, setInputValue, }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {!error && (
                    <div><h2>Enter Location</h2></div>
                )}

                <label>City/Zip/Postal code </label>
                <input
                    type="sumbit"
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button>click</button>
                {error && ( //only show if there are any errors
                    <div>
                        {<h2>Location unknown please try again</h2>}
                        <p>{error}</p>
                    </div>
                )}
            </form>
        </div>

    )
}

export default Form;