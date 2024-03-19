package com.a601.refesta.festival.controller;

import com.a601.refesta.common.response.SuccessResponse;
import com.a601.refesta.festival.data.FestivalDetailRes;
import com.a601.refesta.festival.data.FestivalInfoRes;
import com.a601.refesta.festival.data.FestivalReviewRes;
import com.a601.refesta.festival.service.FestivalService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("festivals")
@RequiredArgsConstructor
public class FestivalController {

    private final FestivalService festivalService;

    @GetMapping("/{festival_id}")
    public SuccessResponse<FestivalInfoRes> getFestivalInfo(@PathVariable(name = "festival_id") int festivalId) {
        return new SuccessResponse<>(festivalService.getFestivalInfo(festivalId));
    }

    @GetMapping("/{festival_id}/info")
    public SuccessResponse<FestivalDetailRes> getFestivalDetail(@PathVariable(name = "festival_id") int festivalId) {
        return new SuccessResponse<>(festivalService.getFestivalDetail(festivalId));
    }

    @GetMapping("/{festival_id}/reviews")
    public SuccessResponse<List<FestivalReviewRes>> getFestivalReviews(@PathVariable(name = "festival_id") int festivalId) {
        return new SuccessResponse<>(festivalService.getFestivalReview(festivalId));
    }

    @PatchMapping
    public SuccessResponse<Void> editFestivalLike(HttpServletRequest request, @RequestBody List<Integer> festivalIdList) {
        //JWT 코드 추가 필요
        festivalService.updateFestivalLike("", festivalIdList);
        return new SuccessResponse<>(null);
    }
}
