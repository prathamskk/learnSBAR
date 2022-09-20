import { useState, useEffect, useMemo } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useTable } from 'react-table'
import FileDownload from "js-file-download";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getUsers = async () => {
    //         try {
    //             const response = await axiosPrivate.get('/users', {
    //                 signal: controller.signal,
    //                 responseType: "blob"
    //             });
    //             FileDownload(response.data, "test.csv")

    //             // console.log(response.data);
    //             isMounted && setUsers(response.data);
    //         } catch (err) {
    //             console.error(err);
    //             navigate('/login', { state: { from: location }, replace: true });
    //         }
    //     }

    //     getUsers();

    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     }
    // }, [])

    const download =  async (e) => {
        e.preventDefault()
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.get('/users', {
                signal: controller.signal,
                responseType: "blob"
            });
            FileDownload(response.data, "products.csv")

            // console.log(response.data);
            // isMounted && setUsers(response.data);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }

    }

    return (
        <article>
            <h2>Products List</h2>
            <button onClick={(e) => download(e)}>Download Excel</button>
        </article>


    )

}



// const Users = () => {
//     const [users, setUsers] = useState();
//     const axiosPrivate = useAxiosPrivate();
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         let isMounted = true;
//         const controller = new AbortController();

//         const getUsers = async () => {
//             try {
//                 const response = await axiosPrivate.get('/users', {
//                     signal: controller.signal
//                 });
//                 console.log(response.data);
//                 isMounted && setUsers(response.data);
//             } catch (err) {
//                 console.error(err);
//                 navigate('/login', { state: { from: location }, replace: true });
//             }
//         }

//         getUsers();

//         return () => {
//             isMounted = false;
//             controller.abort();
//         }
//     }, [])

//     return (
//         <article>
//             <h2>Users List</h2>
//             {users?.length
//                 ? (
//                     <ul>
//                         {users.map((user, i) => <li key={i}>{user?.username}</li>)}
//                     </ul>
//                 ) : <p>No users to display</p>
//             }
//         </article>
//     );
// };

export default Users;
