package com.huce.edu_v2.dto.response.game;

import com.huce.edu_v2.util.constant.GameEnum;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@Builder
@RequiredArgsConstructor
public class RoomResponse {
	String roomId;
	GameEnum message;
	String uid;
	Object data;
}
