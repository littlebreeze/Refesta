package com.a601.refesta.artist.controller;

import com.a601.refesta.artist.data.ArtistInfoRes;
import com.a601.refesta.artist.service.ArtistService;
import com.a601.refesta.common.jwt.TokenProvider;
import com.a601.refesta.common.response.SuccessResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("artists")
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;
    private final TokenProvider tokenProvider;

    @GetMapping("/{artist_id}")
    public SuccessResponse<ArtistInfoRes> getArtistInfo(@PathVariable(name = "artist_id") int artistId) {
        return new SuccessResponse<>(artistService.getArtistInfo(artistId));
    }

    @PatchMapping
    public SuccessResponse<HttpStatus> editArtistLike(HttpServletRequest request, @RequestBody List<Integer> artistIdList) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        artistService.updateArtistLike(memberId, artistIdList);
        return new SuccessResponse<>(HttpStatus.OK);
    }
}