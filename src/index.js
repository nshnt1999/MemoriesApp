import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import PostContext from './store'
import './index.css'


ReactDOM.render(
    
    <PostContext>
        <App/>
    </PostContext>,
    document.getElementById('root'))

