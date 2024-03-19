package com.a601.refesta.artist.controller;

import com.a601.refesta.artist.service.ArtistService;
import com.a601.refesta.common.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("artists")
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    public SuccessResponse<Void> editArtistLike(String memberId, List<Integer> artistIdList) {
        //JWT 코드 추가 필요
        artistService.updateArtistLike(memberId, artistIdList);
        return new SuccessResponse<>(null);
    }
}
