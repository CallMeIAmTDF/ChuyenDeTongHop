package com.huce.edu_v2.service;

import com.huce.edu_v2.dto.request.user.CreateUserRequest;
import com.huce.edu_v2.dto.request.auth.PasswordCreationRequest;
import com.huce.edu_v2.dto.request.user.UpdateUserRequest;
import com.huce.edu_v2.dto.response.pageable.ResultPaginationDTO;
import com.huce.edu_v2.dto.response.user.UserResponse;
import com.huce.edu_v2.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Map;

public interface UserService {
    /**
     * @param email - Input email
     * @return boolean indicating if the email already exited or not
     */
    boolean isEmailExistAndActive(String email);

    /**
     * @param id - Input UserId
     * @return User Object on a given userId
     */
    User fetchUserById(String id);

    /**
     * @return UserResponse Object - Info currentUser
     */
    UserResponse fetchMyInfo();

    /**
     * @param request - password
     */
    void createPassword(PasswordCreationRequest request);

    /**
     * @param email - Input email
     * @return User Object on a given email
     */
    User fetchUserByEmail(String email);

    /**
     * @param id - Input UserId
     * @return User Details based on a given data updated to database
     */
    UserResponse fetchResUserDtoById(String id) ;

    /**
     * @param spec - filter
     * @param pageable - page, size, sort(field,asc(desc))
     * @return ResultPaginationDTO based on a given spec and pageable
     */
    ResultPaginationDTO fetchAllUser(Specification<User> spec, Pageable pageable);

    /**
     * @param newUser - Input CreateUserRequest Object
     * @return User Details based on a given data saved to database
     */
    UserResponse handleCreateUser(CreateUserRequest newUser);

    /**
     * @param id - Input UserId
     * @param updateUserRequest - Input UpdateUserRequest Object
     * @return User Details based on a given data updated to database
     */
    UserResponse handleUpdateUser(String id, UpdateUserRequest updateUserRequest);

    /**
     * @param id - Input UserId
     * @return boolean indicating if the delete of User details is successful or not
     */
    boolean handleDeleteUser(String id);

    /**
     * @param email - Input is the email want to retrieve password
     * @return boolean indicating is sending a password reset request acceptable?
     */
    Boolean forgotPassword(String email);

    void setAvatar(String id, String avatar);

    Map<String, Integer> getOtherData();
}
