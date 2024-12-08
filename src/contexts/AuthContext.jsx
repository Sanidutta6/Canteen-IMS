"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = async (email, password) => {
        // This is a mock login. In a real app, you'd call an API here.
        if (email === 'manager@example.com' && password === 'password') {
            const user = { id: '1', name: 'Manager', role: 'manager' }
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
        } else if (email === 'staff@example.com' && password === 'password') {
            const user = { id: '2', name: 'Staff', role: 'staff' }
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            throw new Error('Invalid credentials')
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}