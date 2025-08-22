import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
            method: "GET",
            headers: {
                Authorization: token
            }
        })
        .then(res => res.json())
        .then(data => {
            setMessage(data.message || "Welcome to the private route.");
        })
        .catch(err => {
            console.error("Error fetching private content:", err);
            navigate("/login");
        });
    }, []);

    return (
        <div className="container mt-5">
            <h2>Private Page</h2>
            <p>{message}</p>
        </div>
    );
};

export default Private;
