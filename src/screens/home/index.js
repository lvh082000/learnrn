import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {resetAuth} from '../../store/authSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {RoutesName} from '../../navigation';
import {deleteWorkAsyncThunk} from '../../store/authSlice';
import {getWorkAsyncThunk} from '../../store/authSlice';
import {useShallowEqualSelector} from '../../store/selector';
import {unwrapResult} from '@reduxjs/toolkit';

export default function HomeScreen() {
  const {works} = useShallowEqualSelector(state => ({
    works: state.me.works,
  }));
  // console.log(works);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleDeleteWork = async id => {
    const actionResult = await dispatch(deleteWorkAsyncThunk(id));
    // console.log(id);

    const unwrapResultData = unwrapResult(actionResult);
    console.log(unwrapResultData);

    if (unwrapResultData.status === 200) {
      Alert.alert('dellete success');
    }
  };

  const handleLogout = () => {
    dispatch(resetAuth());
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Login'}],
      }),
    );
  };

  useEffect(() => {
    dispatch(getWorkAsyncThunk());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Home</Text>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => {
            navigation.navigate(RoutesName.Work);
          }}>
          <AntDesign name="plus" style={{color: 'red', fontSize: 24}} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.touchableOpacity} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>

      <ScrollView>
        {works.map((work, index) => (
          <View style={styles.listContainer} key={index}>
            <View>
              <Text style={styles.itemTitle}>{work.title}</Text>
              {/* work :element -> call data co trong element */}
              <Text style={styles.itemDescriber}>{work.describe}</Text>
            </View>
            <View>
              <TouchableOpacity>
                <AntDesign name="edit" style={{color: 'red', fontSize: 24}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteWork(work._id)}>
                <AntDesign name="delete" style={{color: 'red', fontSize: 24}} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
