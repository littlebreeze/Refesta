package com.a601.refesta.member.data;

import com.a601.refesta.artist.domain.Artist;
import com.a601.refesta.festival.data.FestivalSetlistRes;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ArtistRecommendationRes {

    private List<ArtistInfo> artistInfoList;

    @AllArgsConstructor
    public static class ArtistInfo {

        private int id;

        private String name;

        private String pictureUrl;
    }
}
