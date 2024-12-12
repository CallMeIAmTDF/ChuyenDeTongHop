package com.huce.edu_v2.service;

import com.huce.edu_v2.dto.response.game.RoomResponse;
import com.huce.edu_v2.dto.response.game.UserResponse;
import com.huce.edu_v2.entity.Room;

import java.util.List;
import java.util.Map;

public interface GameService {
	Map<String, String> get8RandomWords();
	List<String> getRoomWords(String roomId);
	List<Room> getRoomByUid(String uid);
	RoomResponse handleJoinGame(String uid);
	Boolean isCorrectAnswer(String roomId, String vie, String en);
	Map<String, Map<String, Long>> winnerCounter(String roomId);
	Map<String, Map<String, Long>> removeRoom(String roomId);
	RoomResponse handleSubmit(String roomId, String vie, String en, String uid);
	Map<String, Map<String, UserResponse>> getPlayerInfo(String roomId);
	boolean quit(String roomId, String uid);
}
