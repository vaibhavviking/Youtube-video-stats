import auth from '@react-native-firebase/auth'
import React,{useContext,useState,useEffect} from 'react';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);

    function createUser(email,password){
        return auth().createUserWithEmailAndPassword(email,password);
    }

    function logOut(){
        return auth().signOut();
    }

    function logIn(email,password){
        return auth().signInWithEmailAndPassword(email,password);
    }

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    },[])

    const value = {
        currentUser,
        createUser,
        logOut,
        logIn
    }
    
    return (
        <AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider>
    )
}
