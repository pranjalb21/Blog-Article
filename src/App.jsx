import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Loading from "./components/loading/Loading";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                userData ? dispatch(login({ userData })) : dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, []);
    return (
        <>
            {loading && <Loading />}
            <Header />
            <Footer />
        </>
    );
}

export default App;
