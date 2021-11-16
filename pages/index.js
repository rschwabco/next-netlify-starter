import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useEffect, useState } from 'react'
import netlifyAuth from '../netlifyAuth.js'


export default function Home() {
    let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
    let [user, setUser] = useState(null)

    let login = () => {
        netlifyAuth.authenticate((user) => {
            console.log("USER", user)
            setLoggedIn(!!user)
            setUser(user)
            netlifyAuth.closeModal()
        })
    }

    let logout = () => {
        netlifyAuth.signout(() => {
            setLoggedIn(false)
            setUser(null)
        })
    }

    useEffect(() => {
        netlifyAuth.initialize((user) => {
            console.log("USER effect", user)
            setLoggedIn(!!user)
        })
    }, [loggedIn])

    console.log("user", user)

    return (

        <div className="container">
            <Head>
                <title>Next.js Starter!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header title="Welcome to my app!" />
                <p className="description">
                    {loggedIn ? (
                        <div>
                            You are logged in!
                            {user && <>Welcome {user?.user_metadata.full_name}!</>}
                            <button onClick={logout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button onClick={login}>
                            Log in here.
                        </button>
                    )}
                </p>
            </main>

            <Footer />
        </div>
    )
}
