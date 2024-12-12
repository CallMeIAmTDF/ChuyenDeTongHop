package com.huce.edu_v2.dto.response.level;


import com.huce.edu_v2.entity.Level;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LevelResponse {
	int lid;
	String lname;
	String limage;
	long numTopics;
	long numWords;
	float progress;
	public LevelResponse(Object[] res){
		Level l = (Level) res[0];
		this.lid = l.getLid();
		this.limage = l.getLimage();
		this.lname = l.getLname();
		this.numTopics = (long) res[2];
		this.numWords = (long) res[3];
		this.progress = (float) res[1];
	}
}
