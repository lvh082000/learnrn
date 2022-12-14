import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {createWork, deleteWork, getWorks, updateWork} from '../../api/work-api';
import {moderateScale} from '../../config';
import {changeState, resetAuth} from '../../store/authSlice';
import {useShallowEqualSelector} from '../../store/selector';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f4f6',
    flex: 1,
    // justifyContent: 'center',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3DEE8',
    fontSize: moderateScale(16),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    color: '#4F4F4F',
    marginHorizontal: moderateScale(18),
    height: moderateScale(48),
    marginBottom: moderateScale(18),
    marginTop: moderateScale(20),
  },
  input1: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3DEE8',
    fontSize: moderateScale(16),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    color: '#4F4F4F',
    marginHorizontal: moderateScale(18),
    height: moderateScale(48),
  },
  taikhoan: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
  },
  touchableOpacity: {
    backgroundColor: '#025DD7',

    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(8),
    alignItems: 'center',
    height: moderateScale(48),
    justifyContent: 'center',
    marginHorizontal: moderateScale(18),
    marginTop: moderateScale(24),
  },
  text: {
    color: '#ffffff',
  },
  listContainer: {
    flexDirection: 'row',

    marginTop: moderateScale(20),
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    marginHorizontal: moderateScale(18),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  itemTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  itemDescriber: {
    fontSize: moderateScale(18),
    // fontWeight: 'bold',
  },
  delete: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
  },
  update: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    marginTop: moderateScale(5),
  },
});

export default function HomeScreen() {
  const {state_redux} = useShallowEqualSelector(state => ({
    state_redux: state.me.state_redux,
  }));
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const router = useRoute();

  // data cua api can
  const [idWord, setIdWork] = useState('');
  const [title, setTitle] = React.useState('');
  const [describe, setDescride] = React.useState('');
  const [isEdit, setIsEdit] = useState('');

  // bien de luu lai danh sach minh lam
  const [works, setWorks] = useState([]);

  // const {user1} = router.params;
  // const {email, password} = user1;

  // const navigateAccount = () => {
  //   navigation.navigate('Account', {
  //     emailAddress: email,
  //   });
  // };

  // const navigateLogin = () => {
  //   navigation.navigate('Login', {
  //     backLogin: 'tro ve man hinh login',
  //   });
  // };

  const handleSubmit = async () => {
    if (isEdit) {
      const res = await updateWork({
        id: idWord,
        title: title, //param truyen vao
        describe: describe,
      });

      if (res.status === 200) {
        alert('update success');
        setIsEdit(false);
        setTitle('');
        setDescride('');
      }
    } else {
      const res = await createWork({
        title: title, //param truyen vao
        describe: describe,
      });
      if (res.status === 200) {
        alert('create success');
        setTitle('');
        setDescride('');
      }
    }
  };

  const getData = async () => {
    const file = await getWorks();
    setWorks(file.data);
    // console.log(file);
  };

  useEffect(() => {
    getData();
  }, []);

  // params : truyen prop qua function (co the de ten gi cung duoc)
  // params duoc truyen trong () la khai bao bien
  const handleDeleteWork = async params => {
    await deleteWork({title: params});
  };

  const handleUpdateWork = item => {
    setIsEdit(true);
    setTitle(item.title);
    setDescride(item.describe);
    setIdWork(item._id);
  };

  const onChangeStateStore = () => {
    dispatch(changeState('sleep'));
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

  return (
    <View style={styles.container}>
      {/* <Text>Home screen</Text> */}
      {/* <Text>User: {email}</Text> */}
      {/* <Text>Password: {password}</Text> */}
      {/* <Button title="go back to login" onPress={navigateLogin} /> */}
      {/* <Button title="go to account" onPress={navigateAccount} /> */}

      <TouchableOpacity style={styles.touchableOpacity} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>

      {/* input title */}
      <TextInput
        style={styles.input}
        onChangeText={value => {
          setTitle(value);
        }}
        placeholder="Title"
        value={title}
      />

      {/* input describe */}
      <TextInput
        style={styles.input1}
        onChangeText={value => {
          setDescride(value);
        }}
        placeholder="Describe"
        value={describe}
      />

      <TouchableOpacity style={styles.touchableOpacity} onPress={handleSubmit}>
        <Text style={styles.text}>{isEdit ? 'Update' : 'Create'}</Text>
      </TouchableOpacity>

      <Text style={styles.itemDescriber}>{state_redux}</Text>

      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={onChangeStateStore}>
        <Text style={styles.text}>Dispatch</Text>
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
              <TouchableOpacity onPress={() => handleDeleteWork(work.title)}>
                <AntDesign name="edit" style={{color: 'red', fontSize: 24}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUpdateWork(work)}>
                <Entypo name="edit" style={{color: 'red', fontSize: 24}} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
