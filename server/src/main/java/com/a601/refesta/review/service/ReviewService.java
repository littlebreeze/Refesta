package com.a601.refesta.review.service;

import com.a601.refesta.common.util.S3Util;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.member.repository.MemberRepository;
import com.a601.refesta.review.domain.Review;
import com.a601.refesta.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final FestivalRepository festivalRepository;
    private final MemberRepository memberRepository;
    private final S3Util s3Util;
    private final ReviewRepository reviewRepository;

    public void createReview(int memberId, int festivalId, String contents, MultipartFile file) {
        String type = "IMAGE";
        if (file.getContentType().startsWith("video")) {
            type = "VIDEO";
        }
        //S3 업로드
        Review review = Review.builder()
                         .festival(festivalRepository.findById(festivalId).orElseThrow())
                         .member(memberRepository.findById(memberId).orElseThrow())
                         .contents(contents)
                         .attachmentUrl(s3Util.uploadFile(file))
                         .mediaType(type)
                         .build();
        reviewRepository.save(review);

    }
}
