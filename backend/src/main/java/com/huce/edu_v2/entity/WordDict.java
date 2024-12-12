package com.huce.edu_v2.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class WordDict {
	private String word;
	private String type;
	private String mean;
	private String pronun;

	@Override
	public String toString() {
		String res = """
					Từ: %s,
					Từ loại: %s,
					Nghĩa: %s,
					Phiên âm: %s
				""";
		res = String.format(res, word, type, splitMean(mean), pronun);
		return res;
	}



	String splitMean(String mean){
		String regex = "//\\s*(.*?)\\s*//";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(mean);
		if (matcher.find()) {
			return matcher.group(1);
		}
		return "";
	}
}
