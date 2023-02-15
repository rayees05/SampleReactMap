import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  storeData,
  setlat,
  setlon,
  settimes,
  setshowmarker,
  setAlldata,
} from '../redux/Action';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const LocationList = ({navigation}) => {
  const dispatch = useDispatch();
  const {locationText, allData} = useSelector(state => state.res_no);
  const [show, setShow] = useState(1);
  const backtoMap = (lat, lon) => {
    dispatch(setlat(lat));
    dispatch(setlon(lon));
    dispatch(setshowmarker(true));
    navigation.navigate('MapViewPage');
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      {allData &&
        allData.map((item, key) => {
          return (
            <View key={key} style={style.listingStyle}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text>
                    Place :{' '}
                    {locationText ? locationText : 'No loaction available'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                  }}
                  onPress={() => backtoMap(item.latitude, item.longitude)}>
                  <Text style={{paddingRight: 5}}>Go to map</Text>
                  <FontAwesome name="angle-right" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
    </View>
  );
};

const style = StyleSheet.create({
  listingStyle: {
    // backgroundColor: 'grey',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    borderRadius: 10,
    elevation: 8,
    width: '90%',
    height: 100,
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});

export default LocationList;
