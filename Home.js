import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  NetInfo,
  View,
  Image,
  FlatList,
  Linking,
  RefreshControl,
  BackHandler,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Dimensions,
} from 'react-native';
import store from 'react-native-simple-store';
import Carousel from 'react-native-banner-carousel';
import ImageCarousel from 'react-native-image-carousel';
import { withNavigationFocus } from 'react-navigation';

const GLOBAL = require('./Global');
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FloatingAction } from 'react-native-floating-action';
const actions = [{
    text: 'Customer Support',
    icon: require('./supports.png'),
    color: '#e41582',
    name: 'bt_accessibility',
    position: 2
  }, {
    text: 'Request a Consumable',
    color: '#e41582',
    icon: require('./send.png'),
    name: 'bt_language',
    position: 1
  }];

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 2 )
const BannerWidth =  width ;
const BannerHeight = 220;
const equalHeight =  (height -190)



const images = [
    "http://139.59.76.223/test_apis/image/img1.jpg",
    "http://139.59.76.223/test_apis/image/img1.jpg",
    "http://139.59.76.223/test_apis/image/img1.jpg"
];

var lll= [];
 class Home extends Component {
   renderPage(image, index) {
          return (

              <View style={styles.carousel}
              key={index}>
              <TouchableOpacity onPress ={()=> this.getProductDetails(index)}>
                  <Image style={styles.carousel}

                  source={{ uri: image }}/>
  </TouchableOpacity>
              </View>
          );
      }

     getProductDetails=(index)=>{
//alert(index)
var k = lll[index]
//alert(JSON.stringify(k))
    var m =k.linkID
    //alert(s)
    if(m==0){
      alert('Product Not Found')
     }
     else{
      GLOBAL.productid =m;
      this.props.navigation.navigate('Detail');
     }
    }

  constructor(props) {
    super(props)
    this.state = {
      moviesList: [],
      eventLists :[],
      brandLists: [],
      refreshing: false,
      moviesLists: []
    }
  }

  _keyExtractor = (item, index) => item.inductry_id;
   _keyExtractors = (item, index) => item.id;
    _keyExtractorss = (item, index) => item.id;




  renderRowItem1 = (itemData) => {
    return (

<View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,marginTop: 5,marginLeft:5,marginRight:5,marginBottom:5,borderBottomLeftRadius:6,borderBottomRightRadius:6,borderColor:'#f7f7f7',borderWidth:2,width : equalWidth-10, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>

        <Image
          style={{width: equalWidth - 30, alignSelf:'center',height: 85,resizeMode:'contain',margin:6 }}
          source={{ uri: itemData.item.image }}
        />

          <Text style={{ color: 'black', fontSize: 13,textAlign:'center',alignSelf:'center', marginTop:-13 }}>Upcoming Event!</Text>

         <View style = {{marginTop :5,flexDirection: 'row'}}>

       <Image style={{ marginLeft :5 , height:15,width:15, resizeMode:'contain'}}
                             source={require('./eventd.png')} />

        <Text  style={{fontSize: 12, color: '#7e7e7e' ,marginLeft: 10, height:18}}>
        {itemData.item.date_event}
        </Text>
       </View>

        <View style = {{marginTop : 5,flexDirection: 'row'}}>

       <Image style={{ marginLeft :5 ,marginTop :4 ,height:15,width:15,resizeMode:'contain'}}
                             source={require('./eventl.png')} />

        <Text  style={{width:equalWidth-45,fontSize: 12, color: '#7e7e7e' ,marginLeft:10,marginRight:5,height:50}}>
        {itemData.item.address}</Text>
       </View>

        <View style = {{marginTop : 5,flexDirection: 'row',}}>

       <Image style={{ marginLeft :5 ,height:15,width:15, resizeMode:'contain'}}
                             source={require('./eventa.png')} />
        <Text  style={{fontSize: 12, color: '#7e7e7e' ,marginLeft: 10, height:20}}>
         {itemData.item.hall_name}
        </Text>

       </View>

      </View>

    )
  }
  getDetal = (res) => {
      alert(JSON.stringify(res))

  GLOBAL.category = res
  this.props.navigation.navigate('Category')
    // this.props.navigation.navigate('Category', {
    //   moviesList: res})
  }

  renderRowItem = (itemData) => {
    return (
              <TouchableOpacity onPress={() => {

                GLOBAL.industry_name = itemData.item.inductry_name,
                GLOBAL.industry =  itemData.item.inductry_id,
                this.getDetal(itemData.item)
                ;
                  }} >

<View style={{backgroundColor:'white',color :'white',flexDirection:'column',marginBottom:5, marginTop:5,marginLeft:2.25, marginRight:5  ,borderRadius :6,width : equalWidth- 11, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>

   <View style={{flexDirection:'column'}}>
           <Image
          style={{  height: 148, resizeMode:'contain'}}
          source={{ uri: itemData.item.image }}
        />
          <Text style={{ color: '#e41582', fontSize: 10 ,margin:5,textAlign:'center', fontWeight:'bold' }}>{itemData.item.inductry_name}</Text>
  </View>
      </View>
      </TouchableOpacity>



    )
  }


  renderRowItem2 = (itemData) => {
    return (
   <View style={{ width: equalWidth - 20, height: 50, margin: 5 ,flex:1,flexDirection: 'column', borderWidth: 1.0,
    borderBottomWidth: 1,
    // borderLeftColor: '#008000',
    borderLeftWidth: 1,
    backgroundColor: 'white',
    // borderColor: '#DCDCDC',
    // borderRadius: 10,
    cornerRadius :20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopColor: '#f7f7f7',
    borderBottomColor: '#f7f7f7',
    borderLeftColor: '#f7f7f7',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRightColor: '#f7f7f7'}}>
        <Image
          style={{ width: equalWidth - 32, height: 35,margin : 6, position: 'absolute'}}
          source={{ uri: itemData.item.image }}
        />

      </View>




    )
  }
  _renderRightButton = () => {
        return(
            <TouchableOpacity onPress={() => this._handleIconTouch() } >
               <Text> hi </Text>
            </TouchableOpacity>
        );
    };

    _handleIconTouch = () => {
        console.log('Touched!');
    }


getOFF =(responseJson)=>{

alert(JSON.stringify(responseJson.banner))


  var my = [];
       {responseJson.banner.map((message) =>
        my.push(message.banner_image)

        )
      }
      lll = responseJson.banner
        this.setState({ moviesLists: responseJson.industry_array1 })
        this.setState({ moviesList: my })
        this.setState({eventLists:responseJson.event})
        this.setState({brandLists:responseJson.brand1})
        GLOBAL.info_number =  responseJson.info_number
        GLOBAL.info_email =  responseJson.info_email
//       alert(JSON.stringify(responseJson))

}

  componentWillMount() {

  store.get('brandsim') .then((res) => this.getOFF(res) )
      var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{
     GLOBAL.userid = e;
    })


     var value =  AsyncStorage.getItem('image');
    value.then((e)=>{
      GLOBAL.profile = e;
    })



     var value =  AsyncStorage.getItem('name');
    value.then((e)=>{

      GLOBAL.name = e;

    })


     var value =  AsyncStorage.getItem('email');
    value.then((e)=>{

      GLOBAL.email = e;
    })


     var value =  AsyncStorage.getItem('mobile');
    value.then((e)=>{

      GLOBAL.mobile = e;
    })


  this.getMoviesFromApiAsync()
  this.getMoviesFromApiAsync1()

    //        this.props.navigation.addListener('willFocus',this._handleStateChange);

  }
  _onRefresh = () => {
      this.setState({refreshing: true});
      fetchData().then(() => {
        this.setState({refreshing: false});
      });
    }
  _handleStateChange = state => {
   //alert('hoho')

       NetInfo.getConnectionInfo().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){
store.get('brandsim') .then((res) => this.getOFF(res) )

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
    this.getMoviesFromApiAsync1()

 };

   componentWillUnmount() {
  //  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

handleBackButton = () => {
    if (this.props.isFocused) {
      Alert.alert(
        'Confirm Exit',
        'Are you sure you want to exit?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => BackHandler.exitApp()
          }
        ],
        {
          cancelable: false
        }
      );
      return true;
    }
  };


  render() {

    return (
    <View style={{flex:1, backgroundColor:'#f2f2f2'}}>
    <KeyboardAwareScrollView style={{backgroundColor:'#f2f2f2'}}>
    <RefreshControl
           refreshing={this.state.refreshing}
           onRefresh={this._onRefresh}
         />
     <View style={styles.container}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}>
                    {this.state.moviesList.map((image, index) => this.renderPage(image, index))}
                </Carousel>

                <View>
        <FlatList style={{backgroundColor:'#f2f2f2', marginTop:2, marginLeft:5, marginRight:5}}
          data={this.state.moviesLists}
          numColumns={2}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />



{this.state.eventLists.length==0 &&(<Text></Text>)}

{this.state.eventLists.length!=0 &&(<View style={{flexDirection:'column'}}>
        <Text style = {{margin :10,   fontSize: 18,
    fontWeight: 'bold'}} >
          Events & Expositions
          </Text>

          <FlatList style = {{width:window.width,}}
          data={this.state.eventLists}
            keyExtractor={this._keyExtractorss}
          horizontal={true}
         renderItem={this.renderRowItem1}
        />

        </View>
)}





          </View>
            </View>



                  <Text></Text>

     </KeyboardAwareScrollView>
           <FloatingAction style={{position:'absolute'}}
           color  = "#e41582"
            position='right'
                   actions={actions}
                   onPressItem={
                     (position) => {

                       if (position == 'bt_accessibility'){
                          this.props.navigation.navigate('Suppourt')
                       }else{
                           this.props.navigation.navigate('SendEnquiry')
                       }

                     }
                   }
                 />
</View>
    );
  }

getMoviesFromApiAsync1 = () => {
 const url = GLOBAL.BASE_URL +  'get_profile'
//      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: GLOBAL.userid,
  }),
}).then((response) => response.json())
    .then((responseJson) => {


  //     this.hideLoading()
       if (responseJson.status == true) {
//    alert(JSON.stringify(responseJson))
    store.update('get_profile',responseJson)
GLOBAL.userInfo =  responseJson
    // this.setState({name:responseJson.user_detail.name})
    // this.setState({gst:responseJson.user_detail.gst})
    // this.setState({businessemail:responseJson.user_detail.businessemail})
    // this.setState({businessaddress:responseJson.user_detail.businessaddress})
    // this.setState({business:responseJson.user_detail.organisation})
    // this.setState({mobile: responseJson.user_detail.mobile})
       }
    })
    .catch((error) => {
      console.error(error);
    //   this.hideLoading()
    });


  }


  getMoviesFromApiAsync = () => {
   const url = GLOBAL.BASE_URL +  GLOBAL.front_main
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {


store.update('front_main',responseJson)
        var my = [];
       {responseJson.banner1.map((message) =>
        my.push(message.banner_image)

        )
      }
      lll = responseJson.banner1
        this.setState({ moviesLists: responseJson.industry_array1 })
        this.setState({ moviesList: my })
        this.setState({eventLists:responseJson.events})
        this.setState({brandLists:responseJson.brand1})
        GLOBAL.info_number =  responseJson.info_number
        GLOBAL.info_email =  responseJson.info_email
        // this will update state to re-render ui
        this.getMoviesFromApiAsync1()
        return responseJson.movieList;
      })
      .catch((error) => {
        console.error(error);
      });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column'
  },
  carousel:{
   width: BannerWidth,
   height:BannerHeight,
   resizeMode:'stretch'
 },

 zoomImage:{
   width:BannerWidth,
   height:BannerHeight,

 }
});
export default withNavigationFocus(Home);
