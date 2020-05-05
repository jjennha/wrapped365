import React from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "../../config_dev";
import {
    useHistory,
    useLocation
} from "react-router-dom";

import "./Login.css";


const auth = {
    authenticate(cb) {
        window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
        )}&response_type=token&show_dialog=true`;
        setTimeout(cb, 100);
    },
    signout(cb) {
        setTimeout(cb, 100);
    }
};

export default function Login() {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    function authenticate() {
        auth.authenticate(() => {
            history.replace(from);
        });
    };

    return (
        <div className="init">
            {(
                <a
                    className="btn"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                        "%20"
                    )}&response_type=token&show_dialog=true`}
                    onClick={authenticate}
                >
                    Login to Spotify
                </a>
            )}
        </div>
    );
}