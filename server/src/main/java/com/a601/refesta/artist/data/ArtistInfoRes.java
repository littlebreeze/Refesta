package com.a601.refesta.artist.data;

import com.a601.refesta.festival.domain.Festival;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ArtistInfoRes {

    private String name;

    private String pictureUrl;

    private boolean isLiked;

    private List<String> genreList;

    private List<Performance> performanceList;

    @Getter
    @AllArgsConstructor
    public class Performance {

        private int id;

        private String name;

        private String posterUrl;
    }

    public void setGenreAndPerformance(List<String> genreList, List<Performance> performanceList) {
        this.genreList = genreList;
        this.performanceList = performanceList;
    }
}
