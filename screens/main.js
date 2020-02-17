import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Button,
  Keyboard,
  Alert,
  TouchableWithoutFeedback
} from "react-native";
import { SearchBar } from "react-native-elements";
import axios from "axios";
import moment from "moment";
import User from "../components/user";
import GenderPicker from "../components/gender";
import AgeFilter from "../components/age";

export default function Home() {
  const [data, setData] = useState([]);
  const [arrayholder, setArrayholder] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("both");
  const [age, setAge] = useState({
    from: "0",
    to: "99"
  });

  const fetchData = async () => {
    try {
      let url =
        "https://gorest.co.in/public-api/users?_format=json&access-token=mfISGBtQFUv8mbG3nCqK3aJm93Be7k0nfr73";
      return await axios.get(url);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then(({ data }) => {
        setLoading(false);
        setData(data.result);
        setArrayholder(data.result);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const setSearchFilter = text => {
    if (text.length > 2) {
      const newData = arrayholder.filter(item => {
        const itemData = `${item.first_name.toUpperCase()} ${item.last_name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setTimeout(() => {
        setData(newData);
      }, 400);
    } else {
      setData(arrayholder);
    }
    setSearch(text);
  };

  const genderFilter = gender => {
    if (gender !== "both") {
      const newData = arrayholder.filter(item => item.gender === gender);
      setTimeout(() => {
        setData(newData);
      }, 400);
    } else {
      setData(arrayholder);
    }

    setGender(gender);
  };

  const ageFilter = (text, index) => {
    if (text !== "") {
      const newData = arrayholder.filter(item => {
        const dob = moment().diff(item.dob, "years");
        if (index === "from") {
          return dob >= text && dob <= age.to;
        }
        return dob <= text && dob >= age.from;
      });
      setTimeout(() => {
        setData(newData);
      }, 400);
    } else {
      setData(arrayholder);
    }

    if (index === "from") {
      setAge({
        from: text,
        to: age.to
      });
    } else {
      setAge({
        from: age.from,
        to: text
      });
    }
  };

  const handleReset = () => {
    setGender("both");
    setData(arrayholder);
    setSearch("");
    setAge({
      from: "0",
      to: "99"
    });
  };

  const invitation = id => {
    Alert.alert(
      "Приглашение",
      `Вы действительно хотите пригласить на свидание пользователя с id = ${id}?`,
      [
        {
          text: "Нет",
          style: "cancel"
        },
        {
          text: "Да",
          style: "destructive",
          onPress: () => {
            {
              const newData = arrayholder.filter(item => item.id !== id);
              setArrayholder(newData);
              setData(newData);
            }
            {
              Alert.alert(
                "Приглашение отправлено",
                ""[
                  {
                    text: "Ок",
                    style: "cancel"
                  }
                ]
              );
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const ItemSeparatorComponent = <View style={styles.listSeparator} />;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.filters}>
          <View style={styles.userFilters}>
            <AgeFilter age={age} ageFilterFunction={ageFilter} />
            <GenderPicker gender={gender} genderFilterFunction={genderFilter} />
          </View>
          <Button color="red" title={"Reset"} onPress={handleReset} />
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <User item={item} invitation={invitation} />
          )}
          ListHeaderComponent={
            <SearchBar
              placeholder="Найдите свою пару"
              lightTheme
              round
              onChangeText={text => setSearchFilter(text)}
              value={search}
            />
          }
          //   ListFooterComponent={() => (
          //     <ActivityIndicator size="large" color="#0000ff" />
          //   )}
          ItemSeparatorComponent={() => ItemSeparatorComponent}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  filters: {
    flexDirection: "column"
  },
  userFilters: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  listSeparator: {
    height: 1,
    backgroundColor: "#CED0CE"
  }
});
