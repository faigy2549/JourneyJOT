import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import store from './store';
import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import { Toast } from 'primereact/toast';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app-container">
          <MenuBar />
          <div className="content-container">
            <AppRoutes />
          </div>
          <Footer />
          <Toast />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
