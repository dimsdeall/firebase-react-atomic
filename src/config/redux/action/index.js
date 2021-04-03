import firebase from '../../firebase'


export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: 'CHANGE_USER', value: 'Dimsdeall' })
    }, 2000);
}

export const registerAPI = (data, dispatch) => {
    // dispatch

    return () => {

        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                console.log('got data ', userCredential);
                dispatch({ type: 'CHANGE_LOADING', value: false })

            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: 'CHANGE_LOADING', value: false })

            })

    }
}