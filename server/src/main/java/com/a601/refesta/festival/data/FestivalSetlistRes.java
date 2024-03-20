package com.a601.refesta.festival.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class FestivalSetlistRes {

    private List<ArtistInfo> artistInfoList;

    private List<SongInfo> songInfoList;

    @Getter
    @AllArgsConstructor
    public class ArtistInfo {

        private int id;

        private String pictureUrl;

        private String name;
    }

    @Getter
    @AllArgsConstructor
    public class SongInfo {

        private String title;

        private String audioUrl;

        private String imageUrl;

        private String singer;
    }
}
