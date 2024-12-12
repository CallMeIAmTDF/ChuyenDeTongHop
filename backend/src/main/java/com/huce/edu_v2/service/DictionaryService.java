package com.huce.edu_v2.service;

import com.huce.edu_v2.entity.WordDict;

import java.util.List;


public interface DictionaryService {
	List<WordDict> searchWordInDict(String word);
	WordDict traslate(String word);
}
