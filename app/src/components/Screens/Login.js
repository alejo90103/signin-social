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
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  LoginButton, AccessToken, LoginManager, GraphRequest,
  GraphRequestManager } from 'react-native-fbsdk';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const splash = require('../../assets/images/havana3.jpg');
import theme from '../../constants/Theme';

const Login = () => {
  const [name, setName] = useState('Ian Fuentes');
  const [email, setEmail] = useState('iankamisama@gmail.com');
  const [password, setPassword] = useState('123123');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1024041775367-5d2r8tklu0r5r09bgkphv777vbs2gnil.apps.googleusercontent.com',
      iosClientId: '1024041775367-nkvsk7fn1eulcgavgeubfdppr6kcg18c.apps.googleusercontent.com',
      offlineAccess: false,
    });
    console.log('hola');
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

  function handleChangeTextName (name) {
    setName(name);
    if (!name) {
      setNameError(true);
    } else if (nameError) {
      setNameError(false);
    }
  }

  function handleChangeTextEmail(email) {
    setEmail(email);
    if (!email) {
      setEmailError(true);
    } else if (emailError) {
      setEmailError(false);
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
    if (!name) {
      setNameError(true);
    }
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!nameError && !emailError && !passwordError) {
      Alert.alert('Login');
      // LOGINSERVICE
    }
  }

  return (
    <ImageBackground source={splash} style={styles.image}>
      <Container style={styles.container}>
        <Header transparent/>
        <Grid style={styles.content}>
          <Row size={1} style={{ alignSelf: 'center'}}>
            <Text style={{ alignSelf: 'center', fontSize: 60, fontWeight: "bold", color: theme.COLORS.WHITE}}>tEncontré</Text>
          </Row>
          <Row size={4} >
            <Col style={{ alignSelf: 'center' }}>
              <Form >
                <Item floatingLabel last style={nameError && styles.itemError}>
                  <Label style={nameError ? styles.textError : styles.text}>Nombre</Label>
                  <Input style={styles.input} value={name} onChangeText={handleChangeTextName} />
                </Item>
                <Item floatingLabel last style={emailError && styles.itemError}>
                  <Label style={emailError ? styles.textError : styles.text}>Correo</Label>
                  <Input style={styles.input} value={email} onChangeText={handleChangeTextEmail} />
                </Item>
                <Item floatingLabel last style={passwordError && styles.itemError}>
                  <Label style={passwordError ? styles.textError : styles.text}>Contraseña</Label>
                  <Input style={styles.input} secureTextEntry value={password} onChangeText={handleChangeTextPassword} />
                </Item>
                <Button block style={styles.button} onPress={handleLogin}>
                  <Text style={{ fontWeight: "bold", color: theme.COLORS.GRAY }}>REGISTRARTE</Text>
                </Button>
              </Form>
              <Row style={{ height: 40, marginTop: 10 }}>
                <Col></Col>
                <Col></Col>
                <Col style={styles.col}>
                  <Button transparent onPress={handleFacebookLogin}>
                    <Icon name='facebook' size={30} color="#FFF" />
                  </Button>
                </Col>
                <Col style={styles.col}>
                  <Button transparent onPress={handleGoogleSignIn}>
                    <Icon name='google' size={30} color="#FFF" />
                  </Button>
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BLURGRAY,
  },
  content: {
    marginLeft: 20,
    marginRight: 20
  },
  col: {
    alignItems: 'center',
    // backgroundColor: theme.COLORS.RED
  },
  form: {
    // marginTop: 100,
  },
  image: {
    flex: 1,
    backgroundColor: theme.COLORS.DARKGRAY,
    resizeMode: "cover",
    justifyContent: "center"
  },
  itemError: {
    borderBottomColor: theme.COLORS.RED
  },
  input: {
    height: 70,
    color: theme.COLORS.GRAY
  },
  text: {
    color: theme.COLORS.GRAY,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 60
  },
  textError: {
    color: theme.COLORS.RED,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 60
  },
  button: {
    marginTop: 30,
    backgroundColor: theme.COLORS.LIGHTBLACK
  },
  facebook: {
    // marginRight: 5,
    backgroundColor: 'transparent'
  },
  google: {
    // marginLeft: 5,
    borderWidth: 0,
    backgroundColor: 'transparent'
  }
});

export default Login;
