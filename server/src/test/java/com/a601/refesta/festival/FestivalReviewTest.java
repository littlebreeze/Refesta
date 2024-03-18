package com.a601.refesta.festival;

import com.a601.refesta.common.config.QueryDSLConfig;
import com.a601.refesta.festival.data.FestivalReviewRes;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.festival.service.FestivalService;
import com.a601.refesta.member.domain.Member;
import com.a601.refesta.member.repository.MemberRepository;
import com.a601.refesta.member.service.MemberService;
import com.a601.refesta.review.domain.Review;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;

import static com.a601.refesta.member.domain.QMember.member;
import static com.a601.refesta.review.domain.QReview.review;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
public class FestivalReviewTest {


}
