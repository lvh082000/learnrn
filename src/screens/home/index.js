import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {navigate} from '../../navigation/root-navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getWidth, moderateScale} from '../../config';
import {getWorks, createWork, deleteWork, updateWork} from '../../api/work-api';

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
  const navigation = useNavigation();
  const router = useRoute();

  // data cua api can
  const [title, setTitle] = React.useState('');
  const [describe, setDescride] = React.useState('');

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
    const res = await createWork({
      title: title, //param truyen vao
      describe: describe,
    });
    console.log(res);
    if (res.status === 200) {
      alert('success');
    }
  };

  const getData = async () => {
    const file = await getWorks();
    setWorks(file.data);
    // console.log(file);
  };

  useEffect(() => {
    getData();
  }, [works]);

  // params : truyen prop qua function (co the de ten gi cung duoc)
  // params duoc truyen trong () la khai bao bien
  const handleDeleteWork = async params => {
    const res = await deleteWork({title: params});
  };

  const handleUpdateWork = async params => {
    const res = await updateWork({title: params});
  };

  return (
    <View style={styles.container}>
      {/* <Text>Home screen</Text> */}
      {/* <Text>User: {email}</Text> */}
      {/* <Text>Password: {password}</Text> */}
      {/* <Button title="go back to login" onPress={navigateLogin} /> */}
      {/* <Button title="go to account" onPress={navigateAccount} /> */}

      <TextInput
        style={styles.input}
        onChangeText={value => {
          setTitle(value);
        }}
        placeholder="Title"
        value={title}
      />

      <TextInput
        style={styles.input1}
        onChangeText={value => {
          setDescride(value);
        }}
        placeholder="Describe"
        value={describe}
      />

      <TouchableOpacity style={styles.touchableOpacity} onPress={handleSubmit}>
        <Text style={styles.text}>Create</Text>
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
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUpdateWork(work.title)}>
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
