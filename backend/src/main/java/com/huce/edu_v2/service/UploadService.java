package com.huce.edu_v2.service;

import com.huce.edu_v2.advice.exception.StorageException;
import com.huce.edu_v2.dto.response.upload.UploadFileResponse;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.net.URISyntaxException;

public interface UploadService {

    void createDirectory(String folder) throws URISyntaxException;

    void validTypeImage(MultipartFile file) throws StorageException;


    UploadFileResponse storeImage(MultipartFile file, String folder);

    long getFileLength(String fileName, String folder) throws URISyntaxException;

    InputStreamResource getResource(String fileName, String folder) throws URISyntaxException, FileNotFoundException;
}
