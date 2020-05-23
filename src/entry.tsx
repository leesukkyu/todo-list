import React from 'react';

import ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';

import RootStore from '@Store/RootStore';

import moment from 'moment';

import 'moment/locale/ko';

import App from './App';

moment.locale('ko');

ReactDOM.render(
  <Provider {...RootStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
