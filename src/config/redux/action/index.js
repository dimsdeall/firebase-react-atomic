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

export const addDataAPI = (data) => {
    return () => {
        database.ref('/notes/' + data.user.uid).push({
            title: data.title,
            content: data.content,
            date: data.date
        })
    }
}

export const getDataFirebase = (userId, dispatch) => {
    return () => {
        return new Promise((resolve) => {
            const starCountRef = database.ref('notes/' + userId)
            starCountRef.on('value', function (snapshot) {
                //Supaya berurutan id [untuk lazy load]
                const data = [];
                Object.keys(snapshot.val()).map(key => {
                    return data.push({
                        id: key,
                        data: snapshot.val()[key]
                    })
                })

                dispatch({ type: 'CHANGE_NOTE', value: data })
                resolve(data);
            })
        })
    }
}

export const updateDataFirebase = (userId, postId, data) => {
    return () => {
        return new Promise((resolve, reject) => {
            const updateRef = database.ref(`notes/${userId}/${postId}`)
            updateRef.set({
                title: data.title,
                content: data.content,
                date: data.date
            }, (err) => {
                if (err) {
                    reject(false)
                }else{
                    resolve(true)
                }
            })
            
        })
    }
}

export const deleteDataFirebase =(userId, postId) =>{
    return () => {
        return new Promise((resolve, reject) => {
            const deleteRef = database.ref(`notes/${userId}/${postId}`)
            deleteRef.remove()
            .then(res => {
                resolve(true)
            })
            .catch(err => {
                reject(false)
            })
        })
    }
}