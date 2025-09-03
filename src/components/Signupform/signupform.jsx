import "./signupform.css"

export default function SignupForm() {
    return (
        <div className="form-box">
            <h1>Join UniLink</h1>
            <p>Create your account to get started</p>
            <form className="form">
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="checkbox" />
                <button>Sign up</button>
            </form>
        </div>
    );
}
