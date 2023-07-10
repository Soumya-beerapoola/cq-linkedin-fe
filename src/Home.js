import React, { useEffect } from "react";
import axios from 'axios';
import { NodeServer } from "./config";
import linkedInLoginImage from './linkedin-login-images/Retina/Sign-In-Small---Default.png';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()

    const getCodeFromWindowURL = url => {
        const popupWindowURL = new URL(url);
        return popupWindowURL.searchParams.get("code");
    };

    useEffect(() => {
        const code = getCodeFromWindowURL(window.location.href);
        navigate('/', { state: { code } })
        // window.opener.postMessage({ 'type': 'code', 'code': code }, '*')
    }, [])

    return (
        <div>
            <div>Inside home ....</div>
        </div>
    )
}

export default Home;

