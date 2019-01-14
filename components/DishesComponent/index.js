import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    TextInput
  } from 'react-native';
import { connect } from 'react-redux';
import { addDish, getDishes, updateDish, removeDish } from '../../actions/actions';
import {logout} from '../../actions/actions';
import LogoutRequest from '../../requests/LogoutRequest';
import DishView from '../DishView';
import GetDishesRequest from '../../requests/GetDishesRequest';
import AddDishRequest from '../../requests/AddDishRequest';
import SyncDishesRequest from '../../requests/SyncDishesRequest';

class DishesComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showAdd: false,
            newName: null,
            newDescription: null,
            newVenue: null,

        };

        this.logout = this.logout.bind(this);
    }

    render(){
        return(
            <View>
                {
                    !this.state.showAdd ?
                    (
                        <View>
                            {this.renderDishes()}
                        <Button
                            onPress={()=>{this.setState({showAdd:true})}}
                            title={'Adauga reteta'}
                        />
                        </View>
                    ) :
                    (
                        <View style={{backgroundColor:'green', padding:10, width:200}}>
                            <Text>{'Nume'}</Text>
                            <TextInput
                                onChangeText={(text)=>{this.setState({newName:text})}}
                                value={this.state.newName}
                            />
                            <Text>{'Descriere'}</Text>
                            <TextInput
                                onChangeText={(text)=>{this.setState({newDescription:text})}}
                                value={this.state.newDescription}
                            />
                            <Text>{'Locatie'}</Text>
                            <TextInput
                                onChangeText={(text)=>{this.setState({newVenue:text})}}
                                value={this.state.newVenue}
                            />
                            <Button
                                onPress={this.onNewDishAdded}
                                title={'Adauga reteta noua'}
                            />
                        </View>
                    )
                    
                }
                <Button
                    style={{width: 50, padding: 20}}
                    onPress={this.logout}
                    title={"Log out"}
                />
            </View>
        );
    }

    renderDishes() {
        console.log(this.props.dishes);
        const dishes = [];
        if(this.props.dishes !== undefined){
            for(let i=0;i<this.props.dishes.length;i++){
                dishes.push(
                    <DishView
                        key={i}
                        // userId={this.props.security.userId}
                        dishId={this.props.dishes[i].id}
                        name={this.props.dishes[i].name}
                        description={this.props.dishes[i].description}
                        venue={this.props.dishes[i].venue}

                        updateDishInStore={(dish)=>{this.setState(()=>{
                            this.props.onUpdateDish(dish);
                            setTimeout(()=>{
                                this.syncDishes();
                            }, 400);
                        })}}
                        removeDishFromStore={(dishId)=>{this.setState(()=>{
                            this.props.onRemoveDish(dishId);
                            setTimeout(()=>{
                                this.syncDishes();
                            }, 400);
                        })}}
                        syncDishes={this.syncDishes}
                    />
                );
            }
        }
        return dishes;
    }

    syncDishes = () => {
        new SyncDishesRequest(
            this.props.security.userId,
            this.props.dishes,
            ()=>{
                new GetDishesRequest((dishes)=>{
                    this.props.onGetDishes(dishes);
                }).send();
            },
            ()=>{
                // nothing atm
            }
        ).send();
    }

    onNewDishAdded = () => {
        const dish = {
            id: new Date().getUTCMilliseconds(),
            name: this.state.newName,
            description: this.state.newDescription,
            venue: this.state.newVenue
        }

        const onSuccessfullDishAdded = () => {
            new GetDishesRequest((dishes)=>{
                this.props.onGetDishes(dishes);
            },this.props.security.userId).send();
            this.setState({showAdd:false});
        }

        const onFailedDishAdded = () => {
            new GetDishesRequest((dishes)=>{
                this.props.onGetDishes(dishes);
            },this.props.security.userId).send();
            this.setState({showAdd:false});
        }

        this.setState({showAdd:false},()=>{this.props.onAddDish(dish);});
        setTimeout(() => {
            this.syncDishes();
        }, 400);
    }

    logout() {
        new LogoutRequest(
            () => {
                this.props.onLogout();
                this.props.forceUpdateParent();
            }, this.props.security.token,
        ).send();
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddDish: dish => {
            dispatch(addDish(dish));
        },
        onGetDishes: dishes => {
            dispatch(getDishes(dishes));
        },
        onRemoveDish: dishId => {
            dispatch(removeDish(dishId));
        },
        onUpdateDish: dish => {
            dispatch(updateDish(dish));
        },
        onLogout: () => {
            dispatch(logout());
        }
    };
};

const mapStateToProps = state => ({
    dishes: state.dishes,
    security: state.security,
});

export default connect(mapStateToProps,mapDispatchToProps)(DishesComponent);