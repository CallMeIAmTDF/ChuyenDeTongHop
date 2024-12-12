package com.huce.edu_v2.service;

public interface RoleService {
    /**
     * @param name - Role name
     * @return boolean indicating if the name already exited or not
     */
    boolean existByName(String name);
}
