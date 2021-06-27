import React, { useContext } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles'
import { postContext } from '../../../store';

const Post = ({post})=>{
    const classes = useStyles()
    const postCtx = useContext(postContext)

    const setCurrentId = postCtx.setCurrentId

    const editHandler = ()=>{ 
        setCurrentId(post._id)
    }

    const likeActionHandler = async ()=>{
        await postCtx.likePost(post._id)
        await postCtx.fetchData()
    }

    const deleteActionHandler = async ()=>{

        await postCtx.deletePost(post._id)
        await postCtx.fetchData()

    }


    return(
        <Card  
        
        
        
        className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick={editHandler}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={likeActionHandler}><ThumbUpAltIcon fontSize="small" /> &nbsp; Like &nbsp; {post.likeCount} </Button>
                <Button size="small" color="primary" onClick={deleteActionHandler}><DeleteIcon fontSize="small" /> Delete</Button>
            </CardActions>
        </Card>
    )
}

export default Post