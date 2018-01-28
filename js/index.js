import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

(function (OC, window, $) {  
  $(document).ready(function () {
    ReactDOM.render(
      <App OC={OC}/>,
      document.getElementById('react-app')
    );
  });
})(OC, window, jQuery);






