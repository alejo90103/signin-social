/**
 * @format
 */

import { AppRegistry} from 'react-native';
import App from './src/App';
import Login from './src/components/Screens/Login';
import {name as appName} from './src/app.json';

AppRegistry.registerComponent(appName, () => Login);
