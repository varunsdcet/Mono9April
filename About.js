import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,NetInfo,
  ScrollView,
  FlatList,
  Dimensions,
    WebView, ActivityIndicator,
} from 'react-native';

const GLOBAL = require('./Global');



const { width, height } = Dimensions.get('window');

const equalWidth =  (width -20 )

 class About extends Component {

static navigationOptions = {
          title: 'About Us',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:100

          },
      };
  constructor(props) {
    super(props)
    this.state = {
      loading:'',
      about:'',
    }
  }

   showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );
}
componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}

handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')

        }else {

        }
        console.log(`is connected: ${this.state.status}`);
}

  componentWillMount() {

      this.getMoviesFromApiAsync()

  }

getMoviesFromApiAsync =()=>{
       this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.monotech_data

      fetch(url, {
  method: 'GET',
  
}).then((response) => response.json())
    .then((responseJson) => {

//  alert(JSON.stringify(responseJson.about))
  this.setState({about: responseJson.about})
       this.hideLoading();
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
    });


  }




  render() {     if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

       size="large" color="#e41582" />
        </View>
      )
    }

    return (
      <View style={{flexDirection:'column',}}>
      <ScrollView>
      <Image style={{width:150, height:100, alignSelf:'center',resizeMode:'contain', margin:10}}
      source={require('./logins.png')}/>
    <Text style ={{fontSize:15,lineHeight: 25, margin:10 }}>{this.state.about}</Text>    
        </ScrollView>
      </View>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column'
  }
});
export default About;