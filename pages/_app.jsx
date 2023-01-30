// import { Provider } from 'react-redux';       // Importing Provider
// import store from '../redux/store';           // Importing redux store
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    // <Provider store={store}>
      <div className="wrapper">
        <Component {...pageProps} />
      </div>
    // </Provider>
  );
}

export default MyApp;