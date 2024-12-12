package com.huce.edu_v2.dto.response.upload;

import lombok.*;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UploadFileResponse {
    private List<String> fileName;
    private Instant uploadedAt;
}
