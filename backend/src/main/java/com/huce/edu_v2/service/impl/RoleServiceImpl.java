package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.repository.RoleRepository;
import com.huce.edu_v2.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleServiceImpl implements RoleService {
    RoleRepository roleRepository;

    @Override
    public boolean existByName(String name) {
        return this.roleRepository.existsByName(name);
    }
}
