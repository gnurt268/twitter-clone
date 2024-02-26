package com.gnxrt.service;

import java.util.List;

import com.gnxrt.exception.TwitException;
import com.gnxrt.exception.UserException;
import com.gnxrt.model.Twit;
import com.gnxrt.model.User;
import com.gnxrt.request.TwitReplyReques;

public interface TwitService {
	
	public Twit createTwit(Twit req,User user) throws UserException;
	public List<Twit> findAllTwit();
	public Twit retwit(Long twitId, User user) throws UserException, TwitException;
	public Twit findById(Long twitId) throws TwitException;
	
	public void deleteTwitById(Long twitId,Long userId) throws TwitException,UserException;
	
	public Twit removeFromRetwit(Long twitId,User user) throws TwitException,UserException;
	
	public Twit createdReply(TwitReplyReques req,User user) throws TwitException; 
	
	public List<Twit> getUserTwit(User user);
	
	public List<Twit> findByLikesContainsUser(User user);
}
