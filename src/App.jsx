import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Loading } from "./components/index";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const authStat = useSelector((state) => state.auth);

    useEffect(() => {
        console.log(authStat);
        authService
            .getCurrentUser()
            .then((userData) => {
                console.log(userData);
                userData ? dispatch(login({ userData })) : dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, []);
    return (
        <div className="h-screen w-full flex flex-col">
            {loading && <Loading />}
            <Header />
            <Footer />
        </div>
    );
}

export default App;
