import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,NetInfo,FlatList,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import store from 'react-native-simple-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar';
import { Rating, AirbnbRating } from 'react-native-ratings';

import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
 class ViewReview extends Component<Props> {



static navigationOptions = {
          title: 'Reviews',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:200
          },
      };





  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      name: '',
      email: '',
       message: '',
       status :'' ,
       loading : '',
       userid : '',
       reviews:[],
    }
}
  _keyExtractor = (item, index) => item.productID;

  renderRowItem = (itemData) => {

   //product
//   alert(itemData.item.name)
    return (
      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    justifyContent: 'space-between',
    shadowRadius: 0.5,flexDirection:'column',
    shadowOpacity: 0.5, backgroundColor:'white',  width : window.width-20 ,marginLeft : 10,marginRight:10,marginTop:10, marginBottom:1, elevation:1}}>

     <Text style={{fontSize:15,margin:10}}>{itemData.item.name}</Text>
     <Text style={{fontSize:15,marginLeft:10, marginRight:10, marginBottom:10}}>Comment:- {itemData.item.review}</Text>
     <View style={{flexDirection:'row',alignSelf:'center',}}>
     <Text style={{fontSize:15,}}>Ratings:-</Text>

    <Text style={{fontSize:15,marginLeft:10,marginRight:10, marginBottom:10}}>{itemData.item.rating}/5</Text>
</View>
</View>



    )
  }

showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }

getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))

       this.setState({reviews : responseJson})

}

  _handleStateChange = state => {
   //alert('hoho')
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){

 this.getOFF(GLOBAL.review)

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

   this.getReviews()
 };


componentWillMount(){
//  alert(GLOBAL.productid)
 this.props.navigation.addListener('willFocus',this._handleStateChange);

  this.getReviews()
}

   getReviews= () =>{
      this.showLoading();
      const url = GLOBAL.BASE_URL +  GLOBAL.product_review_list
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    product_id: GLOBAL.productid


  }),
}).then((response) => response.json())
    .then((responseJson) => {


       this.hideLoading()
       if (responseJson.status == true) {

      //  var so = 'lre'+GLOBAL.productid
      //  store.update(so,responseJson)

       this.setState({reviews : responseJson.reviews})
  //     alert(JSON.stringify(this.state.reviews[0].name))



       }

    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
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



    <KeyboardAwareScrollView style={styles.container2}
    keyboardShouldPersistTaps='always'>

          <FlatList style= {{backgroundColor:'#f2f2f2',flexGrow:0, marginBottom:90}}
          data={this.state.reviews}
          numColumns={1}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />



     </KeyboardAwareScrollView>
    );
  }
}
export default ViewReview;
