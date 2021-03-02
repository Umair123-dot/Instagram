import React, { useState } from 'react';
import profilePicture from '../../images/fruit.jpg';
import Car from '../../images/child.jpg';
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
import {gql, useQuery} from '@apollo/client';




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



const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        width: '98%',
    },
    root: {
        width: '100%'
    },
    media: {
        height: 0,
        paddingTop: '90%',
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
        width: '8vh',
        height: '8vh',
        borderRadius: '50%',
    },
    commentAvatar: {
        width: '5vh',
        height: '5vh',
        borderRadius: '50%',
        marginLeft: '5%',
        marginRight: '4%',
    },
    title: {
        display: 'flex',
        justifyContent: 'flex-start'
    }
}));

function HomePosts({post,handleClose }) {
    const [like, setLike] = useState(false)
    const [emojiPicker, setEmojiPicker] = useState(false)
    const [initialText, setInitialText] = useState('');
    const [comment, setComment] = useState([])
    const [viewAllComment, setViewAllComment] = useState(false)

    const name = 'Muhammad Saad Ali';
    const classes = useStyles();

    const onEmojiClick = (event, emojiObject) => {
        setInitialText(initialText + emojiObject.emoji);
    };

    const ToggleViewComment = () => {
        setViewAllComment(!viewAllComment)
    }
    

    const CommentAdded = () => {
        setComment([...comment, { name: name, text: initialText, picture: profilePicture }])
        setInitialText('')
    };
   
    const TextChange = (e) => {
        setInitialText(e.target.value);
    };

    const Heart = () => {
        setLike(!like)
    }
    const Emoji = () => {
        setEmojiPicker(!emojiPicker)
    }
    const {loading,data} =useQuery(allUserPost);
    if(loading) return <h1>Loading</h1>
   
    return (
        <div className={classes.container}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <img src={Car} className={classes.avatar} alt='Saad' />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={<p className={classes.title}>Muhammad Saad Ali</p>}
                    subheader={<span className={classes.title}>Ferrari World</span>}
                />
                <CardMedia
                    className={classes.media}
                    image={profilePicture}
                    title="Car"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Ferrari World Abu Dhabi is a mostly indoors amusement park on Yas Island in Abu Dhabi, United Arab Emirates. It is the first Ferrari-branded theme park and has the record for the largest space frame structure ever built. Formula Rossa, the world's fastest roller coaster, is also located here
        </Typography>
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
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }} key={ind}>
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
                            <button disabled onClick={CommentAdded} style={{
                                color: 'blue', backgroundColor: 'Transparent',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                                cursor: 'pointer',
                                overflow: 'hidden'
                            }} >Post</button>
                        </InputAdornment> : <InputAdornment position="end">
                                <button onClick={CommentAdded} style={{
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

export default HomePosts