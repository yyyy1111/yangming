//依赖插件引入
import React from 'react';
import ReactDom from 'react-dom';
// import Hello from './component/Hello/Hello';
import{Appcontainer} from 'react-hot-loader'
import {Provider} from 'react-redux';
import store from './redux/store';
import {BrowserRouter as Router } from 'react-router-dom';
import App from 'components/App/App';
//路由引入
// import getRouter from 'router/router';
/**初始化 */
renderWithHotReload(App);
/**热更新 */
if(module.hot){
    module.hot.accept('components/App/App',()=>{
        const NextApp = require('components/App/App').default;
        renderWithHotReload(NextApp);
    })
}
function renderWithHotReload(RootElement){
    ReactDom.render(
        <Appcontainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </Appcontainer>,
        document.getElementById('app')
    );
}