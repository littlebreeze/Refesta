package com.a601.refesta.member.domain;

import com.a601.refesta.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(length = 500)
    private String token;

    @Column
    private Boolean isExpired;

    @Column
    private LocalDateTime expireDate;

    public boolean isValid(LocalDateTime now) {
        if (isExpired) return false;
        return expireDate.isAfter(now);
    }

    public void setExpired() {
        this.isExpired = true;
    }

}
