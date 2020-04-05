import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Alert } from "react-native";
import { 
  Header,
  Container,
  Content,
  Form,
  Item, 
  Input,
  Label,
  Button,
  Text,
  // Icon,
  Grid,
  Col,
  Row
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  LoginButton, AccessToken, LoginManager, GraphRequest,
  GraphRequestManager } from 'react-native-fbsdk';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const splash = require('../../assets/images/splash.png');
import theme from '../../constants/Theme';

const Login = () => {
  const [username, setUsername] = useState('iankamisama@gmail.com');
  const [password, setPassword] = useState('123123');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1024041775367-vjm149g9uq9t3dt67rejsh51un8op5k3.apps.googleusercontent.com',
      iosClientId: '1024041775367-nkvsk7fn1eulcgavgeubfdppr6kcg18c.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, [GoogleSignin]);

  async function handleGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user);
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', error.toString());
      }
    }
  }

  async function handleFacebookLogin() {
    await LoginManager
      .logInWithPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          Alert.alert('Ocurrio un error', 'Cancelaste iniciar sesión');
        } else {
          FBGraphRequest('id, email, picture.type(large)', FBLoginCallback);
        }
      })
      .catch((err) => console.log(err));
  }

  async function FBGraphRequest(fields, callback) {
    const accessData = await AccessToken.getCurrentAccessToken();  // Create a graph request asking for user information
    const infoRequest = new GraphRequest('/me', {
      accessToken: accessData.accessToken,
      parameters: {
        fields: {
          string: fields
        }
      }
    }, callback);
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  async function FBLoginCallback(error, result) {
    if (error) {
      console.log(error);
    } else {
      // Retrieve and save user details in state. In our case with 
      // Redux and custom action saveUser
      console.log(result);
    }
  }

  function handleChangeTextUsername (username) {
    setUsername(username);
    if (!username) {
      setUsernameError(true);
    } else if (usernameError) {
      setUsernameError(false);
    }
  }

  function handleChangeTextPassword(password) {
    setPassword(password);
    if (!password) {
      setPasswordError(true);
    } else if (passwordError) {
      setPasswordError(false);
    }
  }

  function handleLogin() {
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!usernameError && !passwordError) {
      Alert.alert('Login');
      // LOGINSERVICE
    }
  }

  return (
    <Container>
      <ImageBackground source={splash} style={styles.image}>
        <Header transparent/>
        <Content style={styles.content}>
          <Grid>
            <Row>
              <Col style={styles.col}>
                <Button block style={styles.facebook} onPress={handleFacebookLogin}>
                  <Icon name='facebook' size={20} color="#FFF" />
                  <Text style={{ fontWeight: "bold" }}>FACEBOOK</Text>
                </Button>
              </Col>
              <Col style={styles.col}>
                <Button block style={styles.google} onPress={handleGoogleSignIn}>
                  <Icon name='google' size={20} color="#FFF" />
                  <Text style={{ fontWeight: "bold"}}>GOOGLE</Text>
                </Button>
              </Col>
            </Row>
            <Row style={styles.form}>
              <Col>
                <Form>
                  <Item floatingLabel last style={usernameError && styles.itemError}>
                    <Label style={usernameError ? styles.textError : styles.text}>Usuario</Label>
                    <Input style={styles.input} value={username} onChangeText={handleChangeTextUsername} />
                  </Item>
                  <Item floatingLabel last style={passwordError && styles.itemError}>
                    <Label style={passwordError ? styles.textError : styles.text}>Contraseña</Label>
                    <Input style={styles.input} secureTextEntry value={password} onChangeText={handleChangeTextPassword} />
                  </Item>
                  <Button block style={styles.button} onPress={handleLogin}>
                    <Text style={{ fontWeight: "bold" }}>ENTRAR</Text>
                  </Button>
                </Form>
              </Col>
            </Row>
          </Grid>
        </Content>
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    
    marginLeft: 20,
    marginRight: 20
  },
  col: {
    alignItems: 'center',
    backgroundColor: theme.COLORS.BUTTON_ERROR
  },
  form: {
    marginTop: 100,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  itemError: {
    borderBottomColor: theme.COLORS.ERROR
  },
  input: {
    height: 70,
    color: theme.COLORS.INPUT
  },
  text: {
    color: theme.COLORS.INPUT,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 60
  },
  textError: {
    color: theme.COLORS.ERROR,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 60
  },
  button: {
    marginTop: 30,
    backgroundColor: theme.COLORS.BUTTON_COLOR
  },
  facebook: {
    marginRight: 5,
    backgroundColor: theme.COLORS.FACEBOOK
  },
  google: {
    marginLeft: 5,
    backgroundColor: theme.COLORS.GOOGLE
  }
});

export default Login;
