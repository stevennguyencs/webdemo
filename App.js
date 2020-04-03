import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('https://us-central1-socialape-952bb.cloudfunctions.net/getDrinks', { mode: 'cors'})
      .then(response => response.json())
      .then(json => {
        this.setState({data: json});
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    const {data, isLoading} = this.state;
    return (
      <View style={{flex: 1,
        flexDirection: 'column'}}>
        <Text style={{flex: 1, fontSize: 40, marginTop: 30, textAlign: 'center'}}>Đắk Mil Coffee</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View style={{flex: 1, marginLeft: 15}}>
                <Image
                  style={{width: 180, height: 180}}
                  source={{uri: item.URL}}
                />
                <Text>
                  {item.Name} {item.Price}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}
