import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin
