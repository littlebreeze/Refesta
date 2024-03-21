package com.a601.refesta.recommendation.controller;

import com.a601.refesta.common.jwt.TokenProvider;
import com.a601.refesta.common.response.SuccessResponse;
import com.a601.refesta.recommendation.data.ArtistRecommendationRes;
import com.a601.refesta.recommendation.data.EntireFestivalInfoRes;
import com.a601.refesta.recommendation.data.FestivalRecommendationRes;
import com.a601.refesta.recommendation.service.RecommendationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final TokenProvider tokenProvider;

    @GetMapping("/festivals")
    public SuccessResponse<FestivalRecommendationRes> getFestivalRecommendation(HttpServletRequest request) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        return new SuccessResponse<>(recommendationService.getFestivalRecommendation(memberId));
    }

    @GetMapping("/artists")
    public SuccessResponse<ArtistRecommendationRes> getArtistRecommendation(HttpServletRequest request,
                                                                            @RequestParam(name = "page") int pageNo) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        return new SuccessResponse<>(recommendationService.getArtistRecommendation(memberId, pageNo));
    }

    @GetMapping("/scheduled-festivals")
    public SuccessResponse<List<EntireFestivalInfoRes>> getEntireScheduledFestival(HttpServletRequest request) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        return new SuccessResponse<>(recommendationService.getEntireScheduledFestival(memberId));
    }

    @GetMapping("/ended-festivals")
    public SuccessResponse<List<EntireFestivalInfoRes>> getEntireEndedFestival(HttpServletRequest request) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        return new SuccessResponse<>(recommendationService.getEntireEndedFestival(memberId));
    }
}
