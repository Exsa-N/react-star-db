import React from 'react';
import {Redirect} from 'react-router-dom';

import mp3_file from '../../star_wars.mp3';

const SecretPage = ({isLoggedIn}) => {
    if(isLoggedIn)
        return (
            <div className="jumbotron text-center">
                <audio autoPlay><source src = {mp3_file} type="audio/mpeg"/></audio>
                <h3>This page full of secrets!!!</h3>
            </div>
        );

    return <Redirect to="/login" />;
}

export default SecretPage;
