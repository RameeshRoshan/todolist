import React from 'react';
import Header from './components/Header';
import Content from  './components/Content'; 
import './App.scss';

const App=()=>{
    return(
        <React.Fragment>
            <Header/>
            <Content/>
        </React.Fragment>
    )
}

export default App;