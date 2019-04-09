import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  NetInfo,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import store from 'react-native-simple-store';
import HTML from 'react-native-render-html';
const GLOBAL = require('./Global');
const regex = /(<([^>]+)>)/ig;
import Button from 'react-native-button';
var arrayholder = [];
const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 )

 class Product extends Component {
static navigationOptions = ({navigation})=> ({
          title: GLOBAL.category_name,
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:250,
            marginRight:10
          },
      });

  constructor(props) {
    super(props)
    this.state = {
      status : '',
      industry_id : '',
      loading : '',
      productID : '',
       product : '',
       text:'',
       nodata:'',
      moviesList: []
    }
  }


resPress = (resId,resName,productID, url, product_name,res) => {
 alert(resName)
  if (resName == "1"){
    GLOBAL.main_id =  resId
  GLOBAL.model_product_name= product_name
    GLOBAL.share_product_name = product_name
  GLOBAL.share_url = url
    GLOBAL.productid = productID
    GLOBAL.model = res.product_avail
alert(JSON.stringify(GLOBAL.model))
  this.props.navigation.navigate('Model')
  } else {
  // alert(url)
//  alert(product_name)
GLOBAL.description = res
  GLOBAL.share_product_name = product_name
  GLOBAL.share_url = url
    GLOBAL.productid = productID
 this.props.navigation.navigate('Detail')
  }

  }

 bookmarks = (productID) => {

      const url = GLOBAL.BASE_URL +  GLOBAL.add_bookmark
        fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productID: productID,
    user_id :GLOBAL.userid,
  }),
}).then((response) => response.json())
    .then((responseJson) => {
    this.getMoviesFromApiAsync()


    })
    .catch((error) => {
      console.error(error);

    });


  }


clearSearch=()=>{
//this.setState({text:''})
this.props.navigation.replace('Product')
}

getMoviesFromApiAsync1 = () => {

}

  _keyExtractor = (item, index) => item.productID;

  renderRowItem = (itemData) => {

   //product

    return (


  <TouchableOpacity

    onPress={() => this.resPress(itemData.item.main_id, itemData.item.product,itemData.item.productID, itemData.item.url, itemData.item.product_name,itemData.item) } >

      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    justifyContent: 'center',
    shadowRadius: 0.5,
    shadowOpacity: 0.5,flex : 1, backgroundColor:'white',  width : equalWidth ,marginLeft : 10,marginRight:10,marginTop:10, marginBottom:1, elevation:1}}>

     <View style = {{flex : 1, flexDirection :'row'}}>

      <Image
          style={{ width: equalWidth, height : 150,margin :0,resizeMode:'contain' }}
          source={{ uri: itemData.item.image }}



        />

      <View style = {{flex : 1, width:100,marginLeft : - 25,marginTop : 20, height:100}}>
             <TouchableOpacity onPress={() => this.bookmarks(itemData.item.productID)} >

      <Image
          source={{ uri: itemData.item.favrouite_img }}
          style={{width:36,marginLeft : - 15,marginTop : 2, height:32, resizeMode:'contain'}}

          />

          </TouchableOpacity >

          </View>
       </View>

     <View style={{marginLeft : 0,width :equalWidth ,height :1,backgroundColor :'#f7f7f7' }}>

        </View>
          <View style={{flex : 1}}>
          <Text style={{ fontSize: 20, marginTop: 6 ,marginLeft :6, marginRight:6}}>{itemData.item.product_name}</Text>

          <ScrollView style={{ flex: 1 ,marginLeft : 6 ,marginTop :3 ,marginBottom :6 , marginRight:6}}>
                <HTML html={itemData.item.description} imagesMaxWidth={Dimensions.get('window').width} />
            </ScrollView>

        </View>
         </View>

    </TouchableOpacity>





    )
  }


   showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    componentDidMount() {
    // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
 this.props.navigation.addListener('willFocus',this._handleStateChange);

    // NetInfo.isConnected.fetch().done(
    //   (isConnected) => { this.setState({ status: isConnected }); }
    // );

}
componentWillUnmount() {
 //   NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}


getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))
       this.setState({ moviesList:   GLOBAL.product})
            this.arrayholder =   GLOBAL.product;

}

  _handleStateChange = state => {
   //alert('hoho')
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){
    var so= 'c'+GLOBAL.category
store.get(so) .then((res) => this.getOFF(GLOBAL.product) )

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


handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')

        }else {

        }
        console.log(`is connected: ${this.state.status}`);
}

  componentWillMount() {
      const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
     this.props.navigation.addListener('willFocus',this._handleStateChange);

      this.setState({industry_id: itemId})
      {this.getMoviesFromApiAsync()}


  }

SearchFilterFunction(text){
  const newData = this.arrayholder.filter(function(item){
         const itemData = item.product_name.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         moviesList: newData,
         text: text,
         nodata:'No found'
     })

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
      <View style={styles.container2}>
{this.state.moviesList.length==0 &&(<Text style={{fontSize:20, margin:10,alignSelf:'center'}}>No product available to display</Text>)}
{this.state.moviesList.length!=0 &&(
  <View style={{backgroundColor:'#f2f2f2'}}>
      <View style={{flexDirection:'row',borderBottomColor:'#e41582', borderBottomWidth:1}}>
       <Image style={{width:20, height:20, resizeMode:'contain', position:'absolute', left:10,top:12,}} source={require('./search.png')}/>

       <TextInput
       style={{marginLeft:10,marginRight:10, paddingLeft:25,paddingBottom:5,height: 40,}}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       multiline={false}
       underlineColorAndroid='transparent'
       placeholder="What are you looking for ?"
        />
<TouchableOpacity style={{width:20, height:20,position:'absolute', right:10, top:12}} onPress={()=>this.clearSearch()}>
        <Image style={{width:20, height:20, resizeMode:'contain', }} source={require('./cross.png')}/>
    </TouchableOpacity>
    </View>
        <FlatList style= {{backgroundColor:'#f2f2f2',flexGrow:0, marginBottom:90}}
          data={this.state.moviesList}
          numColumns={1}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />
  </View>
        )}
      </View>
    );
  }


  getMoviesFromApiAsync = () => {
       this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.derive_detail_category

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    category_id: GLOBAL.category,
    user_id :GLOBAL.userid,
  }),
}).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == true){
       var so = 'c' + GLOBAL.category
store.update(so,responseJson)

       this.setState({ moviesList: responseJson.derive_detail_category})
            this.arrayholder = responseJson.derive_detail_category;

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
export default Product;
