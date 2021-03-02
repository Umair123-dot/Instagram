import React, { createContext, useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const USER = gql`
query{
    data: loggedInUser{
        name
        email
        phone
        avatar
    }
}
`

const { Provider, Consumer } = createContext()

export const withAuthContext = Component => props => (
    <Consumer>{value => <Component {...value} {...props} />}</Consumer>
)

export default function AuthProvider({ children }) {
    const [state, setState] = useState({})
    const [refetchUser, { loading }] = useLazyQuery(USER, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ data }) => {
            setState(prev => ({ ...prev, user: { ...data } }))
        },
        onError: ({ message }) => {
            console.log(message);
        }
    });
    useEffect(() => {
        refetchUser();
    }, [])
    return (
        <Provider value={{
            ...state,
            refetchUser,
            userDataLoading: loading,
            setState,
        }}>
            {children}
        </Provider>
    )
}