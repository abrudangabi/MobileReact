import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import DishesComponent from './components/DishesComponent';
import LoginComponent from './components/LoginComponent';

class MainApp extends React.Component {
    render() {
        console.log(this.props.security.token)
      return (
        <View style={styles.container}>
          {
            this.props.security.token ?
              <DishesComponent forceUpdateParent={()=>{this.forceUpdate()}}/> :
              <LoginComponent forceUpdateParent={()=>{this.forceUpdate()}}/>
          }
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const mapStateToProps = state => ({
    security: state.security
  });  

export default connect(mapStateToProps,null)(MainApp);