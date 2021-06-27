import React, { useEffect,useState } from 'react'
import axios from 'axios'

const initalValue = {
    posts:[],
    addPost: ()=>{},
    updatePost:()=>{},
    currentID:null,
    setCurrentId:()=>{},
    deletePost:()=>{},
    fetchData: ()=>{},
    likePost: ()=>{}
    
}

export const postContext = React.createContext(initalValue)


const PostContext = (props)=>{
    const [currentId,setCurrentId] = useState(null)
    const [data,setData] = useState([])

    const getPosts =  async ()=>{
        try{
            const response = await axios.get('https://mermoriesapp.herokuapp.com/posts')
            setData(response.data)
        }catch(error){
            return error
        } 
    }
    
    useEffect(()=>{
        getPosts().catch(error=>console.log("hii",error))
    },[currentId])

    


    const addData = async (data)=>{
        try{
            const response = await axios.post("https://mermoriesapp.herokuapp.com/posts/",{
                "creator":data.creator,
                "title":data.title,
                "message":data.message,
                "tags":data.tags,
                "selectedFile":data.selectedFile
            })

            return response
            
        }catch(error){
            console.log(error)
        }

    }

    const updatePost = async (id,data)=>{
        const url = "https://mermoriesapp.herokuapp.com/posts/"+id
        try{
            const response = await axios.patch(url,data)
            return response
        }
        catch(error){
            console.log(error.message);
        }
        
    }

    const deletePost = async (id)=>{
        const url = "https://mermoriesapp.herokuapp.com/posts/"+id
        try{
            const response = await axios.delete(url,data)
            return response
        }
        catch(error){
            console.log(error);
        }
    }


    const likePost = async (id)=>{
        const url = "https://mermoriesapp.herokuapp.com/posts/"+id+"/likePost"
        try{
            const response = await axios.patch(url)
            return response
        }
        catch(error){
            console.log(error.message);
        }
    }



    return(
        <postContext.Provider value={{posts:data,addPost:addData,updatePost:updatePost,currentID:currentId,setCurrentId:setCurrentId,deletePost:deletePost,fetchData:getPosts,likePost:likePost}}>
            {props.children}
        </postContext.Provider>
    )
}

export default PostContext