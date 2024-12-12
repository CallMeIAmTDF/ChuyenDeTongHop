package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.dto.response.game.RoomResponse;
import com.huce.edu_v2.dto.response.game.UserResponse;
import com.huce.edu_v2.entity.Room;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.entity.Word;
import com.huce.edu_v2.repository.WordRepository;
import com.huce.edu_v2.service.GameService;
import com.huce.edu_v2.service.UserPointsService;
import com.huce.edu_v2.service.UserService;
import com.huce.edu_v2.util.constant.GameEnum;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {
	final WordRepository wordRepository;
	final UserService userService;
	final UserPointsService userPointsService;
	static Map<String, Room> rooms = new HashMap<>();
	static List<String> queue = new ArrayList<>();
	static Map<String, String> words = new HashMap<>();

	@PostConstruct
	private void initializeWords() {
		words = wordRepository.findAll()
				.stream()
				.limit(100)
				.collect(Collectors.toMap(
						Word::getWord,
						Word::getMeaning,
						(existing, replacement) -> existing,
						HashMap::new
				));
	}

	@Override
	public Boolean isCorrectAnswer(String roomId, String vie, String en) {
		Room room = rooms.get(roomId);
		if (room == null) return false;
		return room.getWordsList().get(en).equals(vie);
	}

	@Override
	public List<Room> getRoomByUid(String uid) {
		return rooms.values().stream().filter(room ->
				uid.equals(room.getPlayer1Id()) || uid.equals(room.getPlayer2Id())).toList();
	}

	@Override
	public List<String> getRoomWords(String roomId) {
		Room room = rooms.get(roomId);
		if (room == null) return null;
		Map<String, String> top8words = get8RandomWords();
		List<String> roomWords = new ArrayList<>(top8words.values().stream().toList());

		room.setWordsList(top8words);
		roomWords.add(top8words.keySet().stream().toList().get((int) (Math.random() * 8)));
		room.setRoomWords(roomWords);

		return roomWords;
	}

	@Override
	public Map<String, Map<String, Long>> removeRoom(String roomId) {
		Map<String, Map<String, Long>> result = winnerCounter(roomId);
		rooms.remove(roomId);
		return result;
	}

	@Override
	public Map<String, Map<String, Long>> winnerCounter(String roomId) {
		Room room = rooms.get(roomId);
		if(room == null) return null;
		Map<String, Long> counter = new HashMap<>();
		Map<String, Map<String, Long>> result = new HashMap<>();
		counter.put("YOU", room.getWinners().stream().filter(w -> w.equals(room.getPlayer1Id())).count());
		counter.put("COMPETITOR", room.getWinners().stream().filter(w -> w.equals(room.getPlayer2Id())).count());
		result.put(room.getPlayer1Id(), new HashMap<>(counter));

		counter.put("YOU", counter.put("COMPETITOR", counter.get("YOU")));
		result.put(room.getPlayer2Id(), counter);
		return result;
	}

	@Override
	public RoomResponse handleJoinGame(String uid) {
		List<Room> roomByUid = getRoomByUid(uid);

		//chưa vào room nào
		if (roomByUid.isEmpty()) {

			//chưa có ai chờ
			if (queue.isEmpty()) {
				queue.add(uid);
				String roomId = UUID.randomUUID().toString();
				rooms.put(roomId, new Room(roomId, uid, "", new ArrayList<>(), new HashMap<>(), new ArrayList<>()));
				return new RoomResponse(roomId, GameEnum.JOIN_ROOM_SUCCESSFULLY, uid, null);
			}

			//có đối thủ chờ
			Room room = getRoomByUid(queue.get(0)).get(0);
			room.setPlayer2Id(uid);
			List<String> roomWords = getRoomWords(room.getRoomId());
			queue.clear(); //xóa queue
			return new RoomResponse(room.getRoomId(), GameEnum.JOIN_ROOM_SUCCESSFULLY, uid, roomWords);
		}
		//đã trong room, trả về phòng hiện tại
		return new RoomResponse(roomByUid.get(0).getRoomId(), GameEnum.USER_IN_OTHER_ROOM, uid, roomByUid.get(0).getRoomWords());
	}

	@Override
	public RoomResponse handleSubmit(String roomId, String vie, String en, String uid) {
		Room room = rooms.get(roomId);
		if (room != null) {
			Boolean isCorrect = isCorrectAnswer(roomId, vie, en);
			String winId = "";
			if (isCorrect) winId = uid;
			else {
				if (uid.equals(room.getPlayer1Id())) {
					winId = room.getPlayer2Id();
				} else {
					winId = room.getPlayer1Id();
				}
			}
			room.getWinners().add(winId);
			if (room.getWinners().size() >= 15) {
				long u1Count = room.getWinners().stream().filter(w -> w.equals(room.getPlayer1Id())).count();
				long u2Count = room.getWinners().size() - u1Count;
				// 1 câu đúng được 3 point. 1 câu sai - 3 point
				long point = (u1Count - u2Count) * 3;
				userPointsService.updateUserPoint(room.getPlayer1Id(), point);
				userPointsService.updateUserPoint(room.getPlayer2Id(), -point);
				return new RoomResponse(roomId, GameEnum.END, "", removeRoom(roomId));
			}
			getRoomWords(roomId);
			return new RoomResponse(roomId, GameEnum.CONTINUE, "", rooms.get(roomId).getRoomWords());
		}
		return new RoomResponse(roomId, GameEnum.ROOM_NOT_EXISTS, "", null);
	}

	@Override
	public Map<String, String> get8RandomWords() {
		return words.entrySet()
				.stream()
				.collect(Collectors.collectingAndThen(
						Collectors.toList(),
						list -> {
							Collections.shuffle(list);
							return list.stream()
									.limit(8)
									.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
						}
				));
	}

	@Override
	public Map<String, Map<String, UserResponse>> getPlayerInfo(String roomId) {
		Room room = rooms.get(roomId);
		if(room == null) return null;
		Map<String, UserResponse> info = new HashMap<>();
		Map<String, Map<String, UserResponse>> result = new HashMap<>();

		info.put("YOU", toUserResponse(userService.fetchUserById(room.getPlayer1Id()), userPointsService.getUserPoint(room.getPlayer1Id())));
		info.put("COMPETITOR", null);
		result.put(room.getPlayer1Id(), new HashMap<>(info));
		if(!room.getPlayer2Id().isEmpty()){
			info.put("COMPETITOR", toUserResponse(userService.fetchUserById(room.getPlayer2Id()), userPointsService.getUserPoint(room.getPlayer2Id())));
			result.put(room.getPlayer1Id(), new HashMap<>(info));

			info.put("YOU", info.put("COMPETITOR", info.get("YOU")));
			result.put(room.getPlayer2Id(), new HashMap<>(info));
		}
		return result;
	}

	@Override
	public boolean quit(String roomId, String uid){
		Room room = rooms.get(roomId);
		if(room != null){
			if(room.getPlayer1Id().equals(uid) && room.getPlayer2Id().isEmpty()){
				rooms.remove(roomId);
				queue.remove(uid);
				return true;
			}
		}
		return false;
	}

	UserResponse toUserResponse(User user, Integer point){
		return new UserResponse(user.getName(), user.getImage() == null ? "https://ui-avatars.com/api/?background=random&format=png&name="+user.getName() : user.getImage(), point);
	}
}
