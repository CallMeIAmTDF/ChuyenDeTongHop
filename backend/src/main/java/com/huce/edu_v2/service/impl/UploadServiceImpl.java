package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.advice.exception.StorageException;
import com.huce.edu_v2.dto.response.upload.UploadFileResponse;
import com.huce.edu_v2.service.UploadService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UploadServiceImpl implements UploadService {
    @Value("${app.upload-file.base-uri}")
    @NonFinal
    String baseURI;

    @Override
    public void createDirectory(String folder) throws URISyntaxException {
        // create folder upload
        File tmpDirUpload = new File(Paths.get(new URI(baseURI)).toString());
        if (!tmpDirUpload.isDirectory()){
            try {
                Files.createDirectory(tmpDirUpload.toPath());
                System.out.println(">>> CREATE NEW DIRECTORY SUCCESSFUL, PATH = " + tmpDirUpload.toPath());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        URI uri = new URI(folder);
        Path path = Paths.get(uri);
        File tmpDir = new File(path.toString());
        if (!tmpDir.isDirectory()) {
            try {
                Files.createDirectory(tmpDir.toPath());
                System.out.println(">>> CREATE NEW DIRECTORY SUCCESSFUL, PATH = " + tmpDir.toPath());
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println(">>> SKIP MAKING DIRECTORY, ALREADY EXISTS");
        }
    }

    @Override
    public void validTypeImage(MultipartFile file) throws StorageException {
        // valid input file
        if (file == null || file.isEmpty()) {
            throw new StorageException("File is empty. Please upload a file.");
        }

        String fileName = file.getOriginalFilename();
        List<String> allowedExtensions = Arrays.asList("jpg", "jpeg", "png");
        boolean isValid = allowedExtensions.stream().anyMatch(item -> fileName.toLowerCase().endsWith(item));
        if (!isValid) {
            throw new StorageException("Invalid file extension. only allows " + allowedExtensions);
        }
    }

    @SneakyThrows
    @Override
    public UploadFileResponse storeImage(MultipartFile file, String folder) {

        validTypeImage(file);
        // store file
        List<String> uploadFile = Collections.singletonList(this.save(file, folder));

        return UploadFileResponse.builder()
                .fileName(uploadFile)
                .uploadedAt(Instant.now())
                .build();
    }

    //    @Override
    private String save(MultipartFile file, String folder) throws URISyntaxException, IOException {
        // create a directory if not exist
        this.createDirectory(baseURI + folder);

        // replaceWhiteSpace in filename
        String replaceOriginalFilename = Objects.requireNonNull(file.getOriginalFilename()).replace(" ", "-");
        // create unique filename
        String finalName = System.currentTimeMillis() + "-" + replaceOriginalFilename;

        URI uri = new URI(baseURI + folder + "/" + finalName);
        Path path = Paths.get(uri);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, path,
                    StandardCopyOption.REPLACE_EXISTING);
        }
        return String.format("/%s/%s", folder, finalName);
    }

    @Override
    public long getFileLength(String fileName, String folder) throws URISyntaxException {
        URI uri = new URI(baseURI + folder + "/" + fileName);
        Path path = Paths.get(uri);

        File tmpDir = new File(path.toString());

        // file không tồn tại, hoặc file là 1 director => return 0
        if (!tmpDir.exists() || tmpDir.isDirectory())
            return 0;
        return tmpDir.length();
    }

    @Override
    public InputStreamResource getResource(String fileName, String folder)
            throws URISyntaxException, FileNotFoundException {
        URI uri = new URI(baseURI + folder + "/" + fileName);
        Path path = Paths.get(uri);

        File file = new File(path.toString());
        return new InputStreamResource(new FileInputStream(file));
    }
}
