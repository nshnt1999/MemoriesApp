import React, { useContext } from "react"
import useStyles from './styles'
import {Grid,CircularProgress} from '@material-ui/core'
import { postContext } from "../../store"
import Post from './Post/Post'


const Posts = ()=>{
    const classes = useStyles()
    const postCtx = useContext(postContext)
    const setCurrentId = postCtx.setCurrentId
    const len = postCtx.posts.length
    return(
        !len?<CircularProgress/>:(
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {postCtx.posts.map(post=>{return(
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post  post={post}></Post>
                    </Grid>)
                })}

            </Grid>
        ))
}

export default Posts