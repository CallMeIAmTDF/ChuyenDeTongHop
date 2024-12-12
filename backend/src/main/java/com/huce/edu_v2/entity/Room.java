package com.huce.edu_v2.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
public class Room {
	String roomId;
	String player1Id;
	String player2Id;
	List<String> winners;
	Map<String, String> wordsList;
	List<String> roomWords;
}
