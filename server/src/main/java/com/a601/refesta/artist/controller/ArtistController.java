package com.a601.refesta.artist.controller;

import com.a601.refesta.artist.data.ArtistInfoRes;
import com.a601.refesta.artist.service.ArtistService;
import com.a601.refesta.common.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("artists")
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    @GetMapping("/{artist_id}")
    public SuccessResponse<ArtistInfoRes> getArtistInfo(@PathVariable(name = "artist_id") int artistId) {
        return new SuccessResponse<>(artistService.getArtistInfo(artistId));
    }

    @PatchMapping
    public SuccessResponse<Void> editArtistLike(String memberId, @RequestBody List<Integer> artistIdList) {
        //JWT 코드 추가 필요
        artistService.updateArtistLike(memberId, artistIdList);
        return new SuccessResponse<>(null);
    }
}
