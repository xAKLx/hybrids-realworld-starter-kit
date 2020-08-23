import home from './home';
import app from './app';
import signIn from './signIn';
import settings from './settings';
import profile from './profile';
import { combineReducers } from 'redux';
import editor from '../../components/routeEditor/routeEditor.reducer';

export default combineReducers({
  app,
  home,
  signIn,
  settings,
  profile,
  editor,
});
