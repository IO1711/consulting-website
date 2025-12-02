import { useState } from "react";

export default function useFetch(baseUrl){
    const [loading, setLoading] = useState(false);


    const get = (url) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url)
            .then(response => response.json())
            .then(data => {
                if(!data){
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false);
                resolve(data);
            })
            .catch(e => {
                setLoading(false);
                reject(e);
            });
        });
    }


    const post = (url, body) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                ...{
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify(body)
                }
            })
            .then(response => response.json())
            .then(data => {
                if(!data){
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false);
                resolve(data);
            })
            .catch(e => {
                setLoading(false);
                reject(e);
            });
        })
    }

    return {get, post, loading};
}