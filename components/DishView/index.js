import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    TextInput
  } from 'react-native';
import DeleteDishRequest from '../../requests/DeleteDishRequest';
import UpdateDishRequest from '../../requests/UpdateDishRequest';

export default class DishView extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showUpdate: false,
            newName: null,
            newDescription: null,
            newVenue: null,
        }

        this.delete = this.delete.bind(this);
    }

    render() {
        return(
            <View style={{backgroundColor:'green', padding:10, width:200}}>
                {
                    !this.state.showUpdate ? (
                        <View>
                            <Text>{'Nume: '} {this.props.name}</Text>
                            <Text>{'Descriere: '} {this.props.description}</Text>
                            <Text>{'Locatie: '} {this.props.venue}</Text>
                            <Button
                                onPress={this.delete}
                                title={'Delete'}
                            />
                            <Button
                                onPress={()=>{this.setState({showUpdate:true})}}
                                title={'Update'}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text>{'Nume'}</Text>
                            <TextInput
                                onChangeText={(text)=>{this.setState({newName:text})}}
                                value={this.state.newName !== null ? this.state.newName : this.props.name}
                            />
                            <Text>{'Descriere'}</Text>
                            <TextInput
                                onChangeText={(text)=>{this.setState({newDescription:text})}}
                                value={this.state.newDescription !== null ? this.state.newDescription : this.props.description}
                            />
                            <Text>{'Locatie'}</Text>
                            <TextInput
                                onChangeText={(text)=>{this.setState({newVenue:text})}}
                                value={this.state.newVenue !== null ? this.state.newVenue : this.props.venue}
                            />
                            <Button
                                onPress={this.onUpdateDish}
                                title={'Fa update'}
                            />
                        </View>
                    )
                }
            </View>
        );
    }

    onUpdateDish = () => {
        const dish = {
            id: this.props.dishId,
            name: this.state.newName,
            description: this.state.newDescription,
            venue: this.props.venue,
        };

        this.setState({showUpdate:false},()=>{this.props.updateDishInStore(dish);});
    }

    delete() {
        this.props.removeDishFromStore(this.props.dishId);
    }
}