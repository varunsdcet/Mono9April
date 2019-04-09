import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  WebView,
  NetInfo,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import store from 'react-native-simple-store';
import PropTypes from 'prop-types';
import Button from 'react-native-button';
import MaterialTabs from 'react-native-material-tabs';
import Carousel from 'react-native-banner-carousel';
import ImageCarousel from 'react-native-image-carousel';

const GLOBAL = require('./Global');
import HTML from 'react-native-render-html';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');
const BannerWidth =  width ;
const BannerHeight = 200;


const images = [
    "http://139.59.76.223/test_apis/image/img1.jpg",
    "http://139.59.76.223/test_apis/image/img2.jpg",
    "http://139.59.76.223/test_apis/image/img3.jpg",
    "http://139.59.76.223/test_apis/image/img4.jpg",
];


const equalWidth =  (width -20 )

 class Detail extends Component {
 renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }

 static navigationOptions =({navigation})=> ({
          title: 'Product Details',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 18,
            width:200
          },
      });



  setTab = selectedTab => {
    this.setState({ selectedTab :selectedTab})

  }

  constructor(props) {
    super(props)
    this.state = {
      name : '',
      subtitle :'',
      broucher :'',
      selectedTab :0,
      myItem :[],
      htmlArray :[],
      reviews:'',
      moviesList: []
    }
  }

  _keyExtractor = (item, index) => item.id;

  renderRowItem = (itemData) => {
    return (


      <View style={{  flexDirection: 'row',flex : 1, backgroundColor:'white',height: 150,borderRadius:20,  width : equalWidth ,margin : 10}}>


      <Image
          style={{ width: 100, height : 130,marginTop :10,marginLeft :10 }}
          source={{ uri: itemData.item.image }}



        />

     <View style={{ flex: 1, alignSelf: 'auto' }}>
          <Text style={{ fontSize: 20, margin: 6 }}>{itemData.item.date}</Text>
          <Text style={{  margin: 15 }}>{itemData.item.title}</Text>
          <Text style={{  margin: 15 }}>{itemData.item.title}</Text>
        </View>






      </View>

    )
  }

getOFF =(responseJson)=>{

     GLOBAL.review = responseJson.reviews
     alert(JSON.stringify( GLOBAL.review))
      this.setState({ moviesList: responseJson.images})
      this.setState({ name: responseJson.product_name})
      this.setState({ subtitle: responseJson.product_caption})
      this.setState({ htmlArray: responseJson.receive_array_with_data})
       this.setState({ myItem: responseJson.receive_array})
       this.setState({ broucher: responseJson.broucher})
       this.setState({reviews:responseJson.receive_array_with_data[4]})


}

  _handleStateChange = state => {
   //alert('hoho')
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){
   var so = 'de' + GLOBAL.productid
 this.getOFF(GLOBAL.description)

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

  componentWillMount() {


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
     this.props.navigation.addListener('willFocus',this._handleStateChange);


    // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    // NetInfo.isConnected.fetch().done(
    //   (isConnected) => { this.setState({ status: isConnected }); }
    // );
}
componentWillUnmount() {
//    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
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

    return (

   <KeyboardAwareScrollView style={styles.containers}>
       <View style={styles.container}>

           <ImageCarousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {this.state.moviesList.map((image, index) => this.renderPage(image, index))}
                </ImageCarousel>


         <Text style = {{marginLeft : 10 ,marginTop : 10,fontSize :20,color :'#000000', marginRight:10}} >
          {this.state.name}

         </Text>

                  <Text style = {{marginLeft : 10 ,marginTop : 2,fontSize :13,color :'#7e7e7e', marginRight:10}} >
          {this.state.subtitle}

         </Text>

         <View style={{marginTop :10,height: 40}} >
          <ScrollView
        horizontal={true}

        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        >
      <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  Linking.openURL(this.state.broucher)}>
         Download Brochure
        </Button>


          <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  this.props.navigation.navigate('Request')}>
        Request a Quote
        </Button>

            <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  this.props.navigation.navigate('Review')}>
          Write a Review
        </Button>

            <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  this.props.navigation.navigate('ViewReview')}>
        Reviews
        </Button>


      </ScrollView>
        </View>

      <View style = {{width : window.width ,height :45,}}>
        <MaterialTabs
          items= {this.state.myItem}
          selectedIndex={this.state.selectedTab}
          onChange={this.setTab}
          barColor="#ffffff"
          scrollable = {true}
          indicatorColor="#e41582"
          activeTextColor="#e41582"
          inactiveTextColor = "#3eacff"
        />
       </View>


  <ScrollView style={{ flex: 1 ,marginLeft : 6,marginTop : 1, marginRight:6 }}>
{this.state.htmlArray.length==0 &&(<Text></Text>)}
{this.state.htmlArray.length!=0 && (
      <HTML html={this.state.htmlArray[this.state.selectedTab]} imagesMaxWidth={Dimensions.get('window').width} />

  )}
            </ScrollView>





       </View>

        </KeyboardAwareScrollView>


    );
  }




  getMoviesFromApiAsync = () => {
       this.showLoading();

      const url = GLOBAL.BASE_URL +  GLOBAL.product_description

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    product_id: GLOBAL.productid,

  }),
}).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == true){
        var so = 'de' + GLOBAL.productid
        store.update(so,responseJson)

      this.setState({ moviesList: responseJson.images})
      this.setState({ name: responseJson.product_name})
      this.setState({ subtitle: responseJson.product_caption})
      this.setState({ htmlArray: responseJson.receive_array_with_data})
       this.setState({ myItem: responseJson.receive_array})
       this.setState({ broucher: responseJson.broucher})
       this.setState({reviews:responseJson.receive_array_with_data[4]})
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


export default Detail;
