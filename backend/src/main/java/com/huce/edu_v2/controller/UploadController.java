package com.huce.edu_v2.controller;

import com.huce.edu_v2.dto.ApiResponse;
import com.huce.edu_v2.dto.response.upload.UploadFileResponse;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.service.UploadService;
import com.huce.edu_v2.service.UserService;
import com.huce.edu_v2.util.SecurityUtil;
import com.huce.edu_v2.util.constant.NameFolders;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UploadController {
    UserService userService;
    UploadService uploadService;
    SecurityUtil securityUtil;


    @PostMapping("/avatar")
    public ApiResponse<UploadFileResponse> uploadAvatar(
            @RequestParam(name = "image") MultipartFile file
    ) {
        UploadFileResponse res = uploadService.storeImage(file, NameFolders.AVATAR);

        User user = userService.fetchUserByEmail(securityUtil.getCurrentUserLogin().orElse(null));

        userService.setAvatar(user.getId(), res.getFileName().get(0));

        return ApiResponse.<UploadFileResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Upload image avatar success")
                .data(res)
                .build();
    }

    @PostMapping("/level")
    public ApiResponse<UploadFileResponse> uploadImage(
            @RequestParam(name = "image") MultipartFile image
    ) {
        return ApiResponse.<UploadFileResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Upload image level success")
                .data(uploadService.storeImage(image, NameFolders.LEVEL))
                .build();
    }

    @PostMapping("/word")
    public ApiResponse<UploadFileResponse> uploadImageWord(
            @RequestParam(name = "image") MultipartFile image
    ) {
        return ApiResponse.<UploadFileResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Upload image level success")
                .data(uploadService.storeImage(image, NameFolders.WORD))
                .build();
    }
}
