package com.gnxrt.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gnxrt.exception.TwitException;
import com.gnxrt.exception.UserException;
import com.gnxrt.model.Twit;
import com.gnxrt.model.User;
import com.gnxrt.repository.TwitRepository;
import com.gnxrt.request.TwitReplyReques;

@Service
public class TwitServiceImplementation implements TwitService {
	
	@Autowired
	private TwitRepository twitRepository;
	
	@Override
	public Twit createTwit(Twit req, User user) throws UserException {
		
		Twit twit=new Twit();
		twit.setContent(req.getContent());
		twit.setCreatedAt(LocalDateTime.now());
		twit.setImage(req.getImage());
		twit.setUser(user);
		twit.setReply(false);
		twit.setTwit(true);
		twit.setVideo(req.getVideo());
		
		return twitRepository.save(twit);
	}

	@Override
	public List<Twit> findAllTwit() {
		
		return twitRepository.findAllByIsTwitTrueOrderByCreatedAtDesc();
	}

	@Override
	public Twit retwit(Long twitId, User user) throws UserException, TwitException {
		Twit twit=findById(twitId);
		if (twit.getRetwitUser().contains(user)) {
			twit.getRetwitUser().remove(user);
		} else {
			twit.getRetwitUser().add(user);
		}
		return twitRepository.save(twit);
	}

	@Override
	public Twit findById(Long twitId) throws TwitException {
		Twit twit=twitRepository.findById(twitId)
				.orElseThrow(()->new TwitException("Twit not found with id"+twitId));
		return twit;
	}

	@Override
	public void deleteTwitById(Long twitId, Long userId) throws TwitException, UserException {
		
		Twit twit=findById(twitId);
		
		if(!userId.equals(twit.getUser().getId())) {
			throw new UserException("You cant delete another user's twit");
		} 
		
		twitRepository.deleteById(twit.getId());;
		
		
	}

	@Override
	public Twit removeFromRetwit(Long twitId, User user) throws TwitException, UserException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Twit createdReply(TwitReplyReques req, User user) throws TwitException {
		
		Twit replyFor=findById(req.getTwitId());
		
		Twit twit=new Twit();
		twit.setContent(req.getContent());
		twit.setCreatedAt(LocalDateTime.now());
		twit.setImage(req.getImage());
		twit.setUser(user);
		twit.setReply(true);
		twit.setTwit(false);
		twit.setReplyFor(replyFor);
		
		Twit saveReply=twitRepository.save(twit);
		
		//twit.getReplyTwits().add(saveReply);
		replyFor.getReplyTwits().add(saveReply);
		twitRepository.save(replyFor);
		return replyFor;
		
	}

	@Override
	public List<Twit> getUserTwit(User user) {
		// TODO Auto-generated method stub
		return twitRepository.findByRetwitUserContainsOrUser_IdAndIsTwitTrueOrderByCreatedAtDesc(user, user.getId());
	}

	@Override
	public List<Twit> findByLikesContainsUser(User user) {
		
		return twitRepository.findByLikesUser_id(user.getId());
	}

}
