package com.a601.refesta.artist.data;

import com.a601.refesta.festival.domain.Festival;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Getter
@Builder
@AllArgsConstructor
public class ArtistInfoRes {

    @NonNull
    private String name;

    @NonNull
    private String profileUrl;

    @NonNull
    private String[] genre;

    @NonNull
    private Festival[] performances;
}
