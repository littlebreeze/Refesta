package com.a601.refesta.member.domain.join;

import com.a601.refesta.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FestivalRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false, length = 16000)
    private String festivalRecommended;
}
