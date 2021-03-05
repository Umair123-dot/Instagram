import React, { useState } from 'react';
import { Button, Dialog, CardHeader, Card, InputAdornment, Grid, Input, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import profilePicture from '../../images/fruit.jpg';
import Kalam from '../../images/child.jpg';
import Mahodand from '../../images/fruit.jpg';
import Car from '../../images/fruit.jpg';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TelegramIcon from '@material-ui/icons/Telegram';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { FaRegComment } from 'react-icons/fa';
import Picker from 'emoji-picker-react';
import { gql, useQuery,useMutation} from '@apollo/client'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



const showComment = gql`
query {
  comments(postId:$postId) {
    post{
      
      user{
        name
        avatar
        
      }
      
    }
    content
  }
}


`;


//Query for read data 
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
const CREATE_COMMENT=gql`
mutation($postId:Int!,$content:String!){
  createComment(postId:$postId,content:$content){
     content
    
  }
}


`; 

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      height: 400
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 500,
      height: 500
    },
  },
  paperPicture: {
    width: '100%', height: '100%'
  },
  main: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    }
  },
  avatar: {
    width: '5vh',
    height: '5vh',
    borderRadius: '50%',

  },
  title: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '60%'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  subheader: {
    marginTop: '-5px',
    fontSize: '50%'
  },
  gap: {
    height: '60%',
  },
  commentAvatar: {

    width: '4vh',
    height: '4vh',
    borderRadius: '50%',
    marginLeft: '5%',
    marginRight: '4%',

  },
  pictures: {
    width: '92%',
    height: '44vh',
    flex: 1,
    margin: 'auto',
  },

}));

export default function CustomizedDialogs() {
  const styles = useStyles()
  const [comments, setComments] = useState([])
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false)
  const [emojiPicker, setEmojiPicker] = useState(false)
  const [initialText, setInitialText] = useState('');
  const [viewAllComment, setViewAllComment] = useState(false)
  const [showDetails, setShowDetails] = useState('')
  const { data: loggedInUserData, loading } = useQuery(LOGGED_IN_USER);
  const [createComment] =useMutation(CREATE_COMMENT)

  console.log({ loggedInUserData })
  const onEmojiClick = (event, emojiObject) => {
    setInitialText(initialText + emojiObject.emoji);
  };

  const ToggleViewComment = () => {
    setViewAllComment(!viewAllComment)
  }

  const CommentAdded = () => {
    // setComment([...comment, { name: name, text: initialText, picture: profilePicture }])
    // setInitialText('')
    // setEmojiPicker(false)
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


  const handleClickOpen = (e, comments) => {
    setOpen(true);
    setComments(comments || []);
    setShowDetails(e.target.src);
  };
  console.log({ comments })
  const handleClose = () => {
    setOpen(false);
    setShowDetails('');
    setComments([])
  };
  if (loading || !loggedInUserData) return <h1>Loading...</h1>


  return (
    <div>

      <Grid container spacing={4}>
        {/* {Array(8).fill(0).map((_, key) => <Grid item xs={4} onClick={handleClickOpen} key={key} > <img src={Kalam} alt="kalam" className={styles.pictures} /> </Grid>)} */}
        {
          loggedInUserData.loggedInUser?.posts.map((post, i) => {
            return (
              <Grid item xs={4} key={i}>
                <img onClick={(e) => handleClickOpen(e, post.comments)} src={`/images/${post.picture}`} alt="kalam" className={styles.pictures} />
                {post.comments?.map((comment, i) => {

                  console.log(comment)
                  return <h3 key={i}>comments...</h3>
                })}
              </Grid>
            )

          })
        }

      </Grid>
      <Dialog maxWidth="md" fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <div className={styles.main} >
          <div className={styles.paper} >
            <img alt="profile" src={showDetails} className={styles.paperPicture} />
          </div>
          <Card className={styles.card} >
            <CardHeader
              avatar={
                <img src={`/images/${loggedInUserData.loggedInUser.avatar}`} className={styles.avatar} alt='Saad' />
              }
              title={
                <div>
                  <p className={styles.title}>{loggedInUserData.loggedInUser.name}</p>
                  <p className={styles.subheader}>Ferrari World</p>
                </div>}
            // subheader={}
            />
            <div className={styles.gap}>


              {!emojiPicker && <div>
                {!viewAllComment

                  && comments.length > 5 ? <span onClick={ToggleViewComment} style={{ marginLeft: 20 }}>{` View all ${comments.length} comments`}</span>
                  : null
                }


                {viewAllComment && <span onClick={ToggleViewComment}>Hide Comments</span>}
                {comments
                  .filter((_, i) => !viewAllComment ? i < 5 : _)
                  .map((com, ind) => (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 7 }} key={ind}>
                      <img alt="avatar" className={styles.commentAvatar} src={`/images/${loggedInUserData.loggedInUser.avatar}`} />
                      <div style={{ flexDirection: 'row', textAlign: 'initial' }}>
                        <div style={{ fontSize: '60%' }}> {com.user.name}</div>
                        <div style={{ fontSize: '67%' }}>{com.content} </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              }
              {emojiPicker ? <Picker onEmojiClick={onEmojiClick} style={{ position: 'absolute' }} /> : null}


            </div>



            {!emojiPicker && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            }
            <div>
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
            </div>
          </Card>
        </div>
      </Dialog>
    </div>
  );
}