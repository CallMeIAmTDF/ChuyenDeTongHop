package com.huce.edu_v2.dto.response.pageable;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Meta {
    int page;
    int pageSize;
    int pages;
    long total;
}