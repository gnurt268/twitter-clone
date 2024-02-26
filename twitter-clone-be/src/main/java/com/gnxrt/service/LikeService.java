package com.gnxrt.service;

import java.util.List;

import com.gnxrt.exception.TwitException;
import com.gnxrt.exception.UserException;
import com.gnxrt.model.Like;
import com.gnxrt.model.User;


public interface LikeService {
	
	public Like likeTwit(Long twitId,User user) throws UserException,TwitException;
	
	public List<Like> getAllLikes(Long twitId) throws TwitException;
	
}
