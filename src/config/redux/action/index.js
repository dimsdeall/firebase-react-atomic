import firebase, { database } from '../../firebase'


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

export const LoginAPI = (data, dispatch) => {
    return () => {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // console.log('Success');
                    const dataUser = {
                        email: userCredential.user.email,
                        uid: userCredential.user.uid,
                        emailVerified: userCredential.user.emailVerified,
                        refreshToken: userCredential.user.refreshToken
                    }

                    dispatch({ type: 'CHANGE_LOADING', value: false })
                    dispatch({ type: 'CHANGE_ISLOGIN', value: true })
                    dispatch({ type: 'CHANGE_USER', value: dataUser })
                    resolve(dataUser)
                })
                .catch((error) => {
                    console.log(error);
                    dispatch({ type: 'CHANGE_LOADING', value: false })
                    dispatch({ type: 'CHANGE_ISLOGIN', value: false })
                    reject(false)

                })
        })
    }
}

export const addDataAPI = (data, dispatch) => {
    return () => {
        database.ref('/notes/' + data.user.uid).push({
            title: data.title,
            content: data.content,
            date: data.date
        })
    }
}