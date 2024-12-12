package com.huce.edu_v2.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.huce.edu_v2.entity.WordDict;
import com.huce.edu_v2.service.DictionaryService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
@Service
public class DictionaryServiceImpl implements DictionaryService {
	private static List<WordDict> dictionaryData;

	@PostConstruct
	private void loadData() {
		Gson gson = new Gson();
		try (Reader reader = new FileReader("src/main/resources/assets/jsons/dictionary.json")) {
			Type listType = new TypeToken<List<WordDict>>() {}.getType();
			dictionaryData = gson.fromJson(reader, listType);
		} catch (IOException e) {
			e.printStackTrace();
			dictionaryData = Collections.emptyList();
		}
	}
	@Override
	public List<WordDict> searchWordInDict(String word) {
		return dictionaryData
				.stream()
				.filter(d -> d.getWord().toLowerCase().startsWith(word.toLowerCase()))
				.sorted(Comparator.comparingInt(w -> w.getWord().length()))
				.limit(10)
				.toList();
	}

	@Override
	public WordDict traslate(String word) {
		return dictionaryData
				.stream()
				.filter(w -> w.getWord().equalsIgnoreCase(word))
				.findFirst()
				.orElse(null);
	}
}
