import {api} from "../../config/api";
import { GET_ALL_TWEETS_FAILURE, GET_ALL_TWEETS_REQUEST, GET_USERS_TWEET_REQUEST, GET_USERS_TWEET_SUCCESS, USER_LIKE_TWEET_SUCCESS, USER_LIKE_TWEET_REQUEST, USER_LIKE_TWEET_FAILURE, LIKE_TWEET_REQUEST, LIKE_TWEET_SUCCESS, LIKE_TWEET_FAILURE, FIND_TWEET_REQUEST, FIND_TWEET_SUCCESS, FIND_TWEET_FAILURE, REPLY_TWEET_REQUEST, REPLY_TWEET_SUCCESS, REPLY_TWEET_FAILURE,FIND_TWEET_BY_ID_SUCCESS,FIND_TWEET_BY_ID_FAILURE, TWEET_CREATE_SUCCESS, TWEET_CREATE_FAILURE, TWEET_CREATE_REQUEST, TWEET_DELETE_SUCCESS, TWEET_DELETE_FAILURE, TWEET_DELETE_REQUEST, RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,GET_USERS_TWEET_FAILURE,GET_ALL_TWEETS_SUCCESS } from "./ActionType";

export const getAllTweets=()=>async(dispatch)=> {
    try {
        const {data}=await api.get("/api/twits/");
        console.log("get all twits: ", data)
        dispatch({type:GET_ALL_TWEETS_SUCCESS, payload:data})
        
    } catch (error) {
        console.log("catch error - ", error)
        dispatch({type:GET_ALL_TWEETS_FAILURE, payload:error.message})
    }
}

export const getUsersTweet=(userId)=>async(dispatch)=> {
    try {
        const {data}=await api.get(`/api/twits/user/${userId}`);
        console.log("get user twits: ", data)
        dispatch({type:GET_USERS_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error - ", error)
        dispatch({type:GET_USERS_TWEET_FAILURE, payload:error.message})
    }
}

export const findTwitsByLikeContaineUser=(userId)=>async(dispatch)=> {
    try {
        const {data}=await api.get(`/api/twits/user/${userId}/likes`);
        console.log("user like twits: ", data)
        dispatch({type:USER_LIKE_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error - ", error)
        dispatch({type:USER_LIKE_TWEET_FAILURE, payload:error.message})
    }
}

export const findTwitsById=(twitId)=>async(dispatch)=> {
    try {
        const {data}=await api.get(`/api/twits/${twitId}`);
        console.log("find twits by Id: ", data)
        dispatch({type:FIND_TWEET_BY_ID_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error - ", error)
        dispatch({type:FIND_TWEET_BY_ID_FAILURE, payload:error.message})
    }
}

export const createTweet=(tweetData)=>async(dispatch)=> {
    try {
        const {data}=await api.post(`/api/twits/create`, tweetData);
        console.log("created tweet: ", data)
        dispatch({type:TWEET_CREATE_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error - ", error)
        dispatch({type:TWEET_CREATE_FAILURE, payload:error.message})
    }
}

export const createTweetReply=(tweetData)=>async(dispatch)=> {
    try {
        const {data}=await api.post(`/api/twits/reply`, tweetData);
        console.log("replied tweet: ", data)
        dispatch({type:REPLY_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error - ", error)
        dispatch({type:REPLY_TWEET_FAILURE, payload:error.message})
    }
}

export const createReTweet=(twitId)=>async(dispatch)=> {
    try {
        const {data}=await api.put(`/api/twits/${twitId}/retwit`);
        console.log("Retweet: ", data)
        dispatch({type:RETWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error - ", error)
        dispatch({type:RETWEET_FAILURE, payload:error.message})
    }
}

export const likeTweet=(twitId)=>async(dispatch)=> {
    try {
        
        const {data}=await api.post(`/api/${twitId}/likes`);
        console.log("like tweet: ", data)
        dispatch({type:LIKE_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log(twitId)
        console.log("catch error - ", error)
        dispatch({type:LIKE_TWEET_FAILURE, payload:error.message})
    }
}

export const deleteTweet=(twitId)=>async(dispatch)=> {
    try {
        const {data}=await api.post(`/api/tweet/${twitId}`);
        console.log("deleted tweet: ", data)
        dispatch({type:TWEET_DELETE_SUCCESS, payload:twitId})
    } catch (error) {
        console.log("catch error - ", error)
        dispatch({type:TWEET_DELETE_FAILURE, payload:error.message})
    }
}