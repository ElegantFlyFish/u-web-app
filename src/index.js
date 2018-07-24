import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

if(module.hot){
    ReactDOM.render(<div>xxxxxx</div>, document.getElementById('app'));
}
