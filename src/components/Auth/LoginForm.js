import { View, Text, StyleSheet,Button, TextInput } from 'react-native'
import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userDetails, user } from '../../utils/userDB';
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {

    const [error, setError] = useState("");
    const {login} = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
            setError('')
            const {username, password} = formValue;
            if(username !== user.username || password !== user.password){
                setError('El usuario o la contraseña no son correcto')
            }else{
                login(userDetails);
            }
        }
    })
    
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput 
        placeholder='Nombre de Usuario'
        style={styles.input}
        autoCapitalize='none'
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue('username', text)}
      />
      <TextInput 
        placeholder='Contraseña'
        style={styles.input}
        autoCapitalize='none'
        secureTextEntry= {true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue('password', text)}
      />
      <Button title='Ingresar'
        onPress={formik.handleSubmit}
        style={styles.btnLogin}
      />
      <Text
        style={styles.error}
      >{formik.errors.username}</Text>
      <Text
        style={styles.error}
      >{formik.errors.password}</Text>
      <Text
        style={styles.error}
      >{error}</Text>
    </View>
  )
}

function initialValues(){
    return {
        username: "",
        password: ""
    }
}

function validationSchema(){
    return{
        username: Yup.string().required("El Usuario es Obligatorio"),
        password: Yup.string().required("La Contraseña es Obligatoria")
    }
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20
  },
    title: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 50,
        marginBottom: 15
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    error:{
        textAlign: "center",
        color: "#f00",
        marginTop: 20
    },
    btnLogin:{      
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    }
});