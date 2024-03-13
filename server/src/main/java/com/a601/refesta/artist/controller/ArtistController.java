package com.a601.refesta.artist.controller;

import com.a601.refesta.artist.data.ArtistInfoRes;
import com.a601.refesta.artist.service.ArtistService;
import com.a601.refesta.common.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("artists")
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    @GetMapping("/{artist_id}")
    public SuccessResponse<ArtistInfoRes> getArtistInfo(@PathVariable Integer artistId) {
        return new SuccessResponse<>(artistService.getArtistInfo(artistId));
    }
}
