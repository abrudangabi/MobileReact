import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
  } from 'react-native';
import { connect } from 'react-redux';
import { login, setUserId, getDishes } from '../../actions/actions';
import LoginRequest from '../../requests/LoginRequest';
import GetDishesRequest from '../../requests/GetDishesRequest';

class LoginComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showTooltipWithInvalidCredentials: false,
            username: null,
            password: null,
        }
        this.login = this.login.bind(this);
    }

    render(){
        return(
            <View>
                <Text>{'Carte de retete'}</Text>
                <Text>Username:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({username:text})}
                    value={this.state.username}
                />
                <Text>Password:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({password:text})}
                    value={this.state.password}
                />
                <Button
                    style={styles.button}
                    onPress={this.login}
                    title={"Login"}
                />
                {
                    this.state.showTooltipWithInvalidCredentials ?
                        <Text>Incorrect credentials</Text> :
                        <Text></Text>
                }
            </View>
        );
    }

    login() {
        new LoginRequest(
            this.state.username,
            this.state.password,
            (token, userId) => {
                this.setState(()=>{
                    this.props.dispatch(login(token));
                    this.props.dispatch(setUserId(userId));
                    new GetDishesRequest((dishes) => {
                        this.props.dispatch(getDishes(dishes));
                    },userId)
                    .send();
                });
                },
            () => {
                this.setState({showTooltipWithInvalidCredentials: true});
            }
        ).send();
    }
}

const mapStateToProps = state => ({
    security: state.security
});

const styles = StyleSheet.create({
    input: {
        height: 40,
        width:200,
        borderColor: 'blue',
        borderWidth: 1
    },
    button: {
      padding: 15,
      backgroundColor: 'black',
    },
  });

export default connect(mapStateToProps,null)(LoginComponent);