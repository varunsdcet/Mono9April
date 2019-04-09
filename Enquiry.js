import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
    ActivityIndicator,
  NetInfo,
  AsyncStorage
} from 'react-native'; 
import store from 'react-native-simple-store';

const GLOBAL = require('./Global');



const { width, height } = Dimensions.get('window');

const equalWidth =  (width -20 ) 

 class Enquiry extends Component {

static navigationOptions = {
          title: 'My Enquiry',
          headerTintColor: '#ffffff',
          headerStyle: {

            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:150
          },
      };
  constructor(props) {
    super(props)
    this.state = {
      loading :'',
      status :'',
      userid :'',
      moviesList: []
    }
  }

  _keyExtractor = (item, index) => item.id;

  renderRowItem = (itemData) => {
    return (
      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0, flexDirection: 'row',flex : 1, backgroundColor:'white',height: 150,borderRadius:20,  width : equalWidth ,margin : 10}}>

        
      <Image
          style={{ width: 100, height : 130,marginTop :10,marginLeft :10 }}
          source={{ uri: itemData.item.image }}

        

        />

     <View style={{ flex: 1, alignSelf: 'auto' }}>
          <Text style={{ fontSize: 20, marginTop: 6 ,marginLeft :6 }}>{itemData.item.added_on}</Text>
          <Text style={{  marginLeft: 6 ,marginTop :3 }}>{itemData.item.product_name}</Text>
          <Text style={{  marginLeft: 6 ,marginTop :3}}>{itemData.item.description}</Text>
        </View>



      
    
   
      </View>
    )
  }

  componentWillMount() {
       var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{
     this.setState({userid:e})
    })
        this.props.navigation.addListener('willFocus',this._handleStateChange);
 
    {this.getMoviesFromApiAsync()}
  }
  showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    componentDidMount() {
        var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{
      
     this.setState({userid:e})
    }) 
        this.props.navigation.addListener('willFocus',this._handleStateChange);

    // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    // NetInfo.isConnected.fetch().done(
    //   (isConnected) => { this.setState({ status: isConnected }); }
    // );
}
componentWillUnmount() {
    //NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}

handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')

        }else {
         
        }
        console.log(`is connected: ${this.state.status}`);
}

  render() {
  
    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

       size="large" color="#e41582" />
        </View>
      )
    }
    return (
      <View style={styles.container1}>
        <FlatList style= {{backgroundColor:'#f7f7f7'}}
          data={this.state.moviesList}
          numColumns={1}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />
      </View>
    );
  }

  getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))
       this.setState({ moviesList: responseJson.enquiry}) 

}

  _handleStateChange = state => {
   //alert('hoho')
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){

  store.get('myenquiry') .then((res) => this.getOFF(res) )

  }

});

function handleFirstConnectivityChange(isConnected) {
 // alert('Then, is ' + (isConnected ? 'online' : 'offline'));
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}
NetInfo.isConnected.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);

   this.getMoviesFromApiAsync()
 };


  getMoviesFromApiAsync = () => {
   this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.list_enquiry
     
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id:  GLOBAL.userid
    
  }),
}).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == true){
        store.update('myenquiry',responseJson)

       this.setState({ moviesList: responseJson.enquiry}) 
      }
       this.hideLoading();
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
    });

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    flexDirection: 'column'
  }
});
export default Enquiry;