package com.huce.edu_v2.controller;

import com.huce.edu_v2.dto.response.game.RoomResponse;
import com.huce.edu_v2.dto.response.game.UserResponse;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.service.GameService;
import com.huce.edu_v2.service.UserPointsService;
import com.huce.edu_v2.service.UserService;
import com.huce.edu_v2.util.SecurityUtil;
import com.huce.edu_v2.util.constant.GameEnum;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.List;

@RestController
@RequestMapping("/game")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GameController {
	final SimpMessagingTemplate simpMessagingTemplate;
	final GameService gameService;
	final SecurityUtil securityUtil;
	final UserService userService;
	final UserPointsService userPointsService;

	@GetMapping("/join")
	public Map<String, String> joinGame() {
		User user = userService.fetchUserByEmail(securityUtil.getCurrentUserLogin().orElse(null));

		RoomResponse joinResponse = gameService.handleJoinGame(user.getId());
		ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
		executor.schedule(() -> {
			RoomResponse roomResponse = RoomResponse.builder()
					.roomId(joinResponse.getRoomId())
					.message(GameEnum.ROOM_MESSAGE)
					.data(user.getName() + " ĐÃ THAM GIA!!!")
					.uid(joinResponse.getUid())
					.build();

			simpMessagingTemplate.convertAndSend("/topic/game/" + joinResponse.getRoomId(), roomResponse);

			gameService.getPlayerInfo(joinResponse.getRoomId()).forEach((key, value) -> simpMessagingTemplate.convertAndSend("/topic/game/" + joinResponse.getRoomId() + "/" + key,
					RoomResponse.builder().roomId(joinResponse.getRoomId()).message(GameEnum.PLAYER_INFO).uid("").data(value).build()));

			if (joinResponse.getData() != null) {
				roomResponse.setMessage(GameEnum.WORDS_OF_GAME);
				roomResponse.setData(joinResponse.getData());

				//USER tham gia lại phòng
				if (joinResponse.getMessage().equals(GameEnum.USER_IN_OTHER_ROOM)) {
					simpMessagingTemplate.convertAndSend("/topic/game/" + joinResponse.getRoomId() + "/" + joinResponse.getUid(), roomResponse);
					sendCounterToUser(gameService.winnerCounter(joinResponse.getRoomId()), joinResponse.getRoomId(), GameEnum.COUNTER);
				} else {
					simpMessagingTemplate.convertAndSend("/topic/game/" + joinResponse.getRoomId(), roomResponse);
				}
			}

		}, 1500, TimeUnit.MILLISECONDS);
		executor.schedule(() -> {
			if(gameService.quit(joinResponse.getRoomId(), user.getId())){
				simpMessagingTemplate.convertAndSend(
						"/topic/game/" + joinResponse.getRoomId(),
						RoomResponse.builder()
								.uid(user.getId())
								.data("RỜI PHÒNG DO QUÁ LÂU KHÔNG CÓ NGƯỜI THAM GIA")
								.message(GameEnum.QUIT)
								.roomId(joinResponse.getRoomId())
								.build()
				);
			}
		}, 10*1000,TimeUnit.MILLISECONDS);
		executor.shutdown();
		//return roomId
		Map<String, String> res = new HashMap<>();
		res.put("roomId", joinResponse.getRoomId());
		return res;
	}

	@GetMapping("/submit")
	public void submit(@RequestParam String roomId,
					   @RequestParam String vie,
					   @RequestParam String en) {
		//check auth
		User user = userService.fetchUserByEmail(securityUtil.getCurrentUserLogin().orElse(null));

		RoomResponse gameResponse = gameService.handleSubmit(roomId, vie, en, user.getId());
		RoomResponse roomResponse = RoomResponse.builder().roomId(gameResponse.getRoomId()).message(GameEnum.WORDS_OF_GAME).uid("").data(gameResponse.getData()).build();

		if (gameResponse.getMessage().equals(GameEnum.CONTINUE)) {
			simpMessagingTemplate.convertAndSend("/topic/game/" + gameResponse.getRoomId(), roomResponse);

			sendCounterToUser(gameService.winnerCounter(roomId), gameResponse.getRoomId(), GameEnum.COUNTER);
		}
		if (gameResponse.getMessage().equals(GameEnum.END)) {
			roomResponse.setMessage(GameEnum.END);
			sendCounterToUser((Map<String, Map<String, Long>>) roomResponse.getData(), gameResponse.getRoomId(), GameEnum.END);
		}
	}

	@GetMapping("/leaderboard")
	public List<UserResponse> getLeaderBoard() {
		User user = userService.fetchUserByEmail(securityUtil.getCurrentUserLogin().orElse(null));
		Integer point = userPointsService.getUserPoint(user.getId());
		List<UserResponse> users = userPointsService.getTopUsers(5);
		users.add(new UserResponse(user.getName(), user.getImage() == null ? "https://ui-avatars.com/api/?background=random&format=png&name="+user.getName() : user.getImage(), point));
		return users;
	}

	@GetMapping("/quit")
	public void quit(@RequestParam String roomId){
		User user = userService.fetchUserByEmail(securityUtil.getCurrentUserLogin().orElse(null));
		gameService.quit(roomId, user.getId());
	}

	private void sendCounterToUser(Map<String, Map<String, Long>> counter, String roomid, GameEnum status) {
//		System.out.println(destinationRoom + counter.keySet().toArray()[0]);
		simpMessagingTemplate.convertAndSend("/topic/game/" + roomid + "/" + counter.keySet().toArray()[0], RoomResponse.builder().roomId(roomid).message(status).data(counter.values().toArray()[0]).uid("").build());
		simpMessagingTemplate.convertAndSend("/topic/game/" + roomid + "/" + counter.keySet().toArray()[1], RoomResponse.builder().roomId(roomid).message(status).data(counter.values().toArray()[1]).uid("").build());
	}
}
