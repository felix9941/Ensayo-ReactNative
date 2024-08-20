import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      padding: 10,
      backgroundColor: '#7dc782',
    },
    title: {
      fontSize: 40,
      color: 'black',
      marginTop: 10,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      color: 'black',
    },
    textDone: {
      fontSize: 16,
      color: 'red',
      textDecorationLine: "line-through",
    },
    whiteText: {
      fontSize: 16,
      color: '#FFF',
    },
    textInput: {
      borderColor: '#6f6f6f',
      borderWidth: 2,
      width: Dimensions.get('screen').width * 0.6,
      borderRadius: 15,
      paddingLeft: 15,
    },
    inputContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    addButton: {
      width: Dimensions.get('screen').width * 0.25,
      backgroundColor: '#1b75da',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    scrollContainer: {
      marginTop: 20,
    },
    itemContainer: {
      paddingVertical: 20,
      borderBottomColor: '#6f6f6f',
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    removeButton: {
      backgroundColor: "red",
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      borderRadius: 10,
    },
    cameraButton: {
      backgroundColor: '#008CBA',
      padding: 10,
      borderRadius: 5,
      marginLeft: 5,
    },
    image: {
      width: 100,
      height: 100,
      marginTop: 10,
    },
  });

  export default styles;