package com.huce.edu_v2.entity;

import com.huce.edu_v2.util.constant.GenderEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String name;

    String email;

    String password;

    String image;

    LocalDate dob;

    @Enumerated(EnumType.STRING)
    GenderEnum gender;

    String address;

    Boolean active;

    @Column(name = "mobile_number")
    String mobileNumber;

    @ManyToOne
    @JoinColumn(name = "role_id")
    Role role;
}
