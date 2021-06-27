import {React,useContext,useEffect,useState} from "react"
import useStyles from './styles'
import {TextField,Page,Button,Typography,Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { postContext } from "../../store"

const Form = ()=>{
    
    const postCtx = useContext(postContext) 
    const currentId = postCtx.currentID
    const setCurrentId = postCtx.setCurrentId
    
    const classes = useStyles()
    const [postData,setPostData] = useState({
        "creator":'',
        "title": '',
        "message":'',
        tags:'',
        selectedFile:''
    })

    
    const postCtxData = postCtx.posts

    useEffect(()=>{
        // console.log("hi");
        const post = postCtxData.filter(data=>data._id===currentId)
        if(post.length===0) return
        setPostData({
            "creator":post[0].creator,
            "title": post[0].title,
            "message":post[0].message,
            tags:post[0].tags,
            selectedFile:post[0].selectedFile})
    },[currentId,postCtxData])
        

    const submitHandler = async (event)=>{
        event.preventDefault()
        if(currentId){
            await postCtx.updatePost(currentId,postData)
        }else{
            await postCtx.addPost(postData)
            await postCtx.fetchData()
        }
        
        clear()
          
    }

    const clear = ()=>{
        setCurrentId(null)
        setPostData({
            "creator":'',
            "title": '',
            "message":'',
            tags:'',
            selectedFile:''
        })
    }

   
    
    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={submitHandler}>
                <Typography variant="h6">{!currentId?"Creating Memories":"Editing Memories"}</Typography>
                <TextField name="creator" variant="outlined" label="creator" fullWidth value={postData.creator}
                    onChange={event=>{
                        setPostData(prevState=>{
                            const new_state= {...prevState,creator:event.target.value}
                            return new_state
                        })
                    }} />
                    <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title}
                        onChange={event=>{
                            setPostData(prevState=>{
                                const new_state= {...prevState,title:event.target.value}
                                return new_state
                            })
                    }} />
                    <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message}
                        onChange={event=>{
                            setPostData(prevState=>{
                                const new_state= {...prevState,message:event.target.value}
                                return new_state
                            })
                    }} />
                    <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags}
                        onChange={event=>{
                            setPostData(prevState=>{
                                const new_state= {...prevState,tags: event.target.value}
                                return new_state
                            })
                    }} />                    
                    <div className="classes.fileInput">
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                        />
                    
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

                    </div>

            </form>
        </Paper>
    )
}

export default Form