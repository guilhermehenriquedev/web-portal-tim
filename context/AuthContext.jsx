import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies'


export const AuthContext = createContext({})

export default function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const { isAuth } = props;

    isAuth(!!user);

    useEffect(() => {
        const { '@telesul.token': token } = parseCookies();

        if (token) {
            recoverUserInformation(token);

        }
    }, [])

    async function logoutUser() {

        destroyCookie(null, '@telesul.token');
        setUser(null);
        isAuth(false);

        router.push("/");

    }

    async function signIn({ email, password }) {

        const req = await fetch("/api/auth/sign-in", {
            method: "POST",
            body: JSON.stringify({ email, password })
        })

        if (req.status == 200) {

            const res = await req.json();

            const { token, user } = res.data;

            setCookie(undefined, '@telesul.token', token, {
                maxAge: 60 * 60 * 1, // 1 hour
            })

            //headers['Authorization'] = token

            setUser(user);

            router.push("/acessos/alterar-propriedades");

        } else {
            return req.statusText

        }

    } 

    async function recoverUserInformation(token) {
        

        
        const req = await fetch("/api/auth/recoverUser", {
            method: "POST",
            body: JSON.stringify(localStorage.getItem('@telesul:user_properties'))
        })

        const res = await req.json();

        setUser(res.data.user);
        console.log('recover user...: ', res.data.user)
    }

    return (
        <AuthContext.Provider value={{ user, signIn, logoutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}