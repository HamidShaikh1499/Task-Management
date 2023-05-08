import Routers from './router';
import Toastify from './component/toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import utils from './common/utils';
import constants from './common/constants';
import { setToken, setTokenAndUser } from './reducer/slice/user';
import ApiService, { ApiUrls } from './service/ApiService';
import Loader from './component/Loader';

function App() {
  const { isLoading, token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getTokenFromStorage();
  }, []);

  useEffect(() => {
    if (token && !user) {
      getUserInfo(token);
    }
  }, [token]);

  const getTokenFromStorage = () => {
    const storedToken = utils.getItemFromStorage(constants.storageKey.tokenKey);
    dispatch(setToken({ token: storedToken }));
  }

  const getUserInfo = async (token) => {
    const { data } = await ApiService.get(ApiUrls.user);
    if (data) {
      dispatch(setTokenAndUser({ user: data, token }));
    } else {
      dispatch(setToken({ token: null }));
    }
  }

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Routers />
      <Toastify />
    </>
  );
}

export default App;
