import React from 'react'

import ErrorIndicator from '../error-indicator'

export default class ErrorCatch extends React.Component
{
    state = {
        existError: false
    };
    componentDidCatch()
    {
        this.setState({existError: true});
    }
    render()
    {
        if(this.state.existError)
            return <ErrorIndicator />;
            
        return this.props.children;
    }
};
