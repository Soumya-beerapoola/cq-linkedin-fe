import React from "react";
import axios from 'axios';
import { NodeServer } from "./config";
import linkedInLoginImage from './linkedin-login-images/Retina/Sign-In-Small---Default.png';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }


    getCodeFromWindowURL = url => {
        const popupWindowURL = new URL(url);
        return popupWindowURL.searchParams.get("code");
    };

    componentDidMount() {
        if (window.opener && window.opener !== window) {
            debugger;
            const code = this.getCodeFromWindowURL(window.location.href);
            window.opener.postMessage({ 'type': 'code', 'code': code }, '*')
            window.close();
        }
    }

    render() {
        return (
            <div>
                <div>Inside home ....</div>
            </div>
        )
    }
}