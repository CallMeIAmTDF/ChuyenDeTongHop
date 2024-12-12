package com.huce.edu_v2.dto.response.pdf;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PdfFileInfo {
	private String fileName;
	private long fileSize;
	private String lastModified;
}
