import React, { useState, createContext, useContext } from 'react'
import { gql, useQuery } from '@apollo/client'

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

import './styles.css'


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { InputAdornment, Input } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TelegramIcon from '@material-ui/icons/Telegram';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { FaRegComment } from 'react-icons/fa';
import Picker from 'emoji-picker-react';
import { Fragment } from 'react';
import CloseIcon from '@material-ui/icons/Close';




const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
    },
    root: {
        marginLeft: '30%',
        width: '40%',
        height: '20%',
    },
    media: {
        height: '250px',
        width: '250px',
        marginLeft: '25%'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        width: '5vh',
        height: '5vh',
        borderRadius: '50%',
    },
    commentAvatar: {
        width: '5vh',
        height: '5vh',
        borderRadius: '50%',
    },
}));





const allUserPost = gql`
query{
    userPosts{
        id
        name
        avatar
        posts{
            id
            picture
            content
            user {
                id
                name
                avatar
            }
        }
    }
}
`
const LOGGED_IN_USER = gql`
    query {
        loggedInUser {
            id
            name
            avatar
            posts {
            id
            picture
            content
            comments {
                id
                content
                user {
                id
                name
                avatar
                }
            }
            }
        }
    }
`

function ViewImageDetails({ post, handleClose }) {
    const [like, setLike] = useState(false)
    const [emojiPicker, setEmojiPicker] = useState(false)
    const [initialText, setInitialText] = useState('');
    const [comment, setComment] = useState([])
    const [viewAllComment, setViewAllComment] = useState(false)



    const classes = useStyles();

    // const cancelButton = useContext(handleCloseContext());

    const onEmojiClick = (event, emojiObject) => {
        setInitialText(initialText + emojiObject.emoji);
    };

    const ToggleViewComment = () => {
        setViewAllComment(!viewAllComment)
    }

    // const CommentAdded = () => {
    //     setComment([...comment, { name: name, text: initialText, picture: profilePicture }])
    //     setInitialText('')
    // };

    const TextChange = (e) => {
        setInitialText(e.target.value);
    };

    const Heart = () => {
        setLike(!like)
    }
    const Emoji = () => {
        setEmojiPicker(!emojiPicker)
    }
    console.log({ post })
    return (
        <div className={classes.container}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <img src={`/ images / ${post.user.avatar}`} className={classes.avatar} alt='Saad' />
                    }
                    action={
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                        >
                            <span onClick={handleClose}>x</span>

                            {/* <MoreVertIcon /> */}
                        </IconButton>
                        // <Menu>
                        //     <MenuItem>
                        //     Exit
                        //     </MenuItem>
                        // </Menu>

                    }
                    title={post.user.name}
                />
                <CardMedia
                    className={classes.media}
                    image={`/ images / ${post.picture} `}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.content}</Typography>
                </CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <CardActions disableSpacing>
                        <IconButton onClick={Heart} style={like ? { color: 'red' } : { color: '' }} aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="comment">
                            <FaRegComment />
                        </IconButton>
                        <IconButton aria-label="share">
                            <TelegramIcon />
                        </IconButton>
                    </CardActions>

                    <CardActions disableSpacing>


                        <IconButton aria-label="share">

                            <BookmarkBorderIcon />
                        </IconButton>

                    </CardActions>

                </div>
                {!viewAllComment
                    && comment.length > 2 ? <span onClick={ToggleViewComment}>{` View all ${comment.length} comments`}</span>
                    : null
                }
                {viewAllComment && <span onClick={ToggleViewComment}>Hide Comments</span>}
                {comment
                    .filter((_, i) => !viewAllComment ? i < 2 : _)
                    .map((com, ind) => (
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }} key={ind}>
                            <img alt="avatar" className={classes.commentAvatar} src={com.picture} />
                            <div style={{ flexDirection: 'row', textAlign: 'initial' }}>
                                <div> {com.name}</div>
                                <div> {com.text}</div>
                            </div>
                        </div>
                    ))
                }

                <hr />


                <Input
                    id="input-with-icon-adornment"
                    onChange={TextChange}
                    value={initialText}
                    style={{ width: "95%" }}
                    endAdornment={
                        initialText === '' ? <InputAdornment position="end">
                            <button disabled style={{
                                color: 'blue', backgroundColor: 'Transparent',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                                cursor: 'pointer',
                                overflow: 'hidden'
                            }} >Post</button>
                        </InputAdornment> : <InputAdornment position="end">
                                <button style={{
                                    color: 'blue', backgroundColor: 'Transparent',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    cursor: 'pointer',
                                    overflow: 'hidden'
                                }} >Post</button>
                            </InputAdornment>
                    }
                    startAdornment={

                        <InputAdornment position="start">

                            <button style={{
                                color: 'black', backgroundColor: 'Transparent',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                                cursor: 'pointer',
                                overflow: 'hidden'
                            }} >  <EmojiEmotionsIcon onClick={Emoji} /> </button>
                        </InputAdornment>

                    }
                />

                {emojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : null}

            </Card>
        </div>
    );
}


export default function Posts() {
    console.log('Posts1 component')

    const { data, loading, error } = useQuery(LOGGED_IN_USER, { fetchPolicy: 'no-cache' })

    //MODAL
    const [open, setOpen] = React.useState(false);
    const [post, setPost] = React.useState(null);

    const handleOpen = (post) => {
        setOpen(true);
        setPost(post)
    }
    const handleClose = () => {
        setOpen(false);
        setPost(null)
    };

    if (loading || !data) return <h1>Loading...</h1>

    // const handleCloseContext = createContext(handleClose)

    return (
        <Grid container spacing={1} className="Posts">
            {data.posts.map((post, i) => {
                console.log(post)
                return (
                    <Grid item key={i}>
                        <img alt="picture" src={`/ images / ${post.picture} `} className="pictures" onClick={() => handleOpen(post)} />
                    </Grid>
                )
            })}
            <Modal onEscapeKeyDown open={open}
                onClose={handleClose}>
                <ViewImageDetails post={post} handleClose={handleClose} />
            </Modal>
            {/* {Object.keys(data).map((keys,index)=> {
                console.log(data[keys].posts)
            })} */}
        </Grid >
    )
}