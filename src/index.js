import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import firebase from 'firebase';
import * as authActions from './module/auth/actions'
import { push } from 'connected-react-router'

/**
 * connected-react-router를 사용하기 위해서 history를 직접 만들어야 한다.
 * history.push기능을 redux에서 바로 사용하기 위해 추가
 */
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router'

// module/index.js -> 다음과 같이 index.js는 생략 가능
import { configureStore } from './module'

const history = createBrowserHistory();

// Redux store 생성
const store = configureStore(history);

// Firebase 환경 변수
const firebaseConfig = {
    apiKey: "AIzaSyC4ZMBQJwvscqJOUPPe2SmIiCV-VByXuT4",
    authDomain: "moim-11081.firebaseapp.com",
    databaseURL: "https://moim-11081.firebaseio.com",
    projectId: "moim-11081",
    storageBucket: "moim-11081.appspot.com",
    messagingSenderId: "375605734625",
    appId: "1:375605734625:web:1e84609c7fe37a5d"
};
// Firebase 초기화
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
    store.dispatch(authActions.updateUser(user));
    if(user){
        store.dispatch(push('/'))
    }else{
        store.dispatch(push('/sign-in'))
    }
})

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
