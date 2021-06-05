import React, { useEffect, useState } from 'react';
import axios from 'axios';

type UserType = {
    id: number,
    name: string,
    email: string,
    registration: string,
    startCourse: string,
    street: string,
    number: string,
    district: string,
    city: string,
}

const handleRoutes = (route: string) => {
    return `http://localhost:8080${route}`;
}

const User: React.FC = () => {

    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const baseUrlUser = handleRoutes('/students');
        axios.get(baseUrlUser)
            .then(response => {
                setUsers(u => u = response.data);
            });
    }, [setUsers]);

    if (!users) {
        console.log("não chegou")
    }
    return (
        <>
            {users.forEach(u => {
                console.log(u);
            })}
        </>
    )
}

export default User;