package com.a601.refesta.artist.service;

import com.a601.refesta.artist.data.ArtistInfoRes;
import com.a601.refesta.artist.domain.Artist;
import com.a601.refesta.artist.repository.ArtistRepository;
import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.domain.Festival;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepository artistRepository;

    public ArtistInfoRes getArtistInfo(int artistId) {
        Artist artist = getArtist(artistId);

        //장르

        //참여행사

        ArtistInfoRes artistInfo = ArtistInfoRes.builder()
                .name(artist.getName())
                .profileUrl(artist.getProfileUrl())
                .build();
    }

    //공통 메서드
    public Artist getArtist(int artistId) {
        return artistRepository.findById(artistId)
                .orElseThrow(() -> new CustomException(ErrorCode.Artist_NOT_FOUND_ERROR));
    }
}
