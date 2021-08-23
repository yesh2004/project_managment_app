import React,{useEffect} from 'react'
import axios from 'axios'
const Index=()=>{
	useEffect(()=>{
		axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/logout/',
                    
                    
                    
                    withCredentials: true
                    
                }).then(response => {
                    console.log(response)
                      
                      localStorage.removeItem('access_token')
                        
                }).catch(err=>console.log(err))
	},[])
	return(
		<h1>Index page</h1>
		)
}
export default Index